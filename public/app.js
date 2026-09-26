/**
 * myredirectchecker client.
 *
 * A check is a walk, one request after another, so the page opens an event
 * stream and draws each hop as it is followed — the chain grows on screen in
 * the order it happened. When the full report arrives it replaces the sketch
 * with every detail. Switching language repaints from the report in memory:
 * no second walk, and no second round of requests at somebody else's server.
 */
'use strict';

const byId = id => document.getElementById(id);
const DASH = '—';

/* ================================================================== *
 * Language
 * ================================================================== */

const I18N = window.I18N;
const RTL = new Set(window.RTL_LANGS || []);
const STORAGE_KEY = 'myredirectchecker-lang';

function detectLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && I18N[saved]) return saved;
  } catch { /* localStorage may be unavailable */ }

  const candidates = navigator.languages?.length ? navigator.languages : [navigator.language || 'en'];
  for (const raw of candidates) {
    const tag = String(raw).toLowerCase();
    if (I18N[tag]) return tag;
    const base = tag.split('-')[0];
    if (I18N[base]) return base;
  }
  return 'en';
}

let LANG = detectLang();

function t(key, vars) {
  const dict = I18N[LANG] || I18N.en;
  let value = dict[key] ?? I18N.en[key] ?? key;
  if (vars) for (const [name, replacement] of Object.entries(vars)) {
    value = value.split('{' + name + '}').join(replacement);
  }
  return value;
}

/** Translation for a dashed code such as "meta-refresh", or the code itself. */
function tCode(prefix, code) {
  if (!code && code !== 0) return undefined;
  const key = prefix + '_' + String(code).replace(/[-.]/g, '_');
  const dict = I18N[LANG] || I18N.en;
  return dict[key] ?? I18N.en[key] ?? String(code).replace(/-/g, ' ');
}

const locale = () => window.LANG_LOCALES?.[LANG] || LANG;
const number = value => Number(value).toLocaleString(locale());
const ms = value => (value === null || value === undefined ? DASH : `${number(value)} ${t('unit_ms')}`);

/* ================================================================== *
 * Rendering helpers
 * ================================================================== */

function esc(value) {
  return String(value ?? '').replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function set(id, value, state) {
  const node = byId(id);
  if (!node) return;
  const empty = value === undefined || value === null || value === '';
  node.className = 'v' + (empty ? ' muted' : state ? ' ' + state : '');
  node.textContent = empty ? DASH : String(value);
}

function setHtml(id, html, state) {
  const node = byId(id);
  if (!node) return;
  node.className = 'v' + (state ? ' ' + state : '');
  node.innerHTML = html || DASH;
}

function tag(text, kind) {
  const element = document.createElement('span');
  element.className = 'tag' + (kind ? ' ' + kind : '');
  element.textContent = text;
  return element;
}

function toast(message) {
  const element = byId('toast');
  element.textContent = message;
  element.classList.add('show');
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => element.classList.remove('show'), 1900);
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast(t('toast_copied'));
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(area);
    area.select();
    try { document.execCommand('copy'); toast(t('toast_copied')); }
    catch { toast(t('toast_copy_fail')); }
    area.remove();
  }
}

/** Percent-escapes turned back into the characters a person typed, for reading. */
function readable(text) {
  try { return decodeURI(text); } catch { return text; }
}

/**
 * A URL with the parts this hop changed marked. Read left to right whatever
 * the interface language, and never shortened: the part that differs is often
 * a single character at the end.
 */
function urlHtml(href, changes = [], hostDisplay) {
  let url;
  try { url = new URL(href); } catch { return esc(href); }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return esc(href);

  const changed = new Set(changes || []);
  const part = (text, key) => (text && changed.has(key) ? `<mark>${esc(text)}</mark>` : esc(text));
  const host = (hostDisplay || url.hostname) + (url.port ? ':' + url.port : '');
  const scheme = part(url.protocol + '//', 'scheme');

  return (url.protocol === 'http:' ? `<span class="scheme-http">${scheme}</span>` : scheme) +
    part(host, changed.has('port') ? 'port' : 'host') +
    part(readable(url.pathname), 'path') +
    part(readable(url.search), 'query') +
    part(readable(url.hash), 'fragment');
}

const statusClass = status => (status ? `s${String(status)[0]}` : 'err');

/* ================================================================== *
 * State
 * ================================================================== */

let REPORT = null;
let LAST_ERROR = null;
let TARGET = null;
let STREAM = null;
let LIVE = [];

const PROFILES = ['chrome', 'iphone', 'android', 'googlebot', 'yandexbot', 'bingbot', 'curl'];
const STAGES = ['follow', 'analyse'];
const EXAMPLES = ['developer.mozilla.org', 'http://github.com', 'sharapov.biz'];

/** The options that change what a check means, as they appear in a URL. */
function optionsQuery() {
  const query = new URLSearchParams();
  const ua = byId('search-ua').value;
  if (ua && ua !== 'chrome') query.set('ua', ua);
  if (!byId('search-cookies').checked) query.set('cookies', 'false');
  return query;
}

function applyOptions(search) {
  const query = new URLSearchParams(search);
  const ua = String(query.get('ua') || 'chrome').toLowerCase();
  byId('search-ua').value = PROFILES.includes(ua) ? ua : 'chrome';
  byId('search-cookies').checked = !['false', '0', 'no', 'off'].includes(String(query.get('cookies') || '').toLowerCase());
}

/* ================================================================== *
 * Running a check
 * ================================================================== */

function setProgress(stage, count) {
  const box = byId('progress');
  box.hidden = false;
  const index = Math.max(0, STAGES.indexOf(stage));
  /* The length of a chain is not known until it ends, so the bar creeps while
     hops arrive and jumps only when the last one is in. */
  const creep = stage === 'follow' ? Math.min(0.85, 0.15 + (count || 0) * 0.12) : 0.95;
  byId('progress-fill').style.width = Math.round(Math.max(creep, (index + 0.5) / STAGES.length) * 100) + '%';
  byId('progress-label').textContent = count
    ? `${tCode('stage', stage)} · ${t('progress_hops', { n: number(count) })}`
    : tCode('stage', stage);
}

function checking(on) {
  byId('btn-scan').disabled = on;
  byId('btn-rescan').disabled = on;
  if (!on) byId('progress').hidden = true;
}

function skeletons() {
  document.querySelectorAll('#report .v').forEach(node => {
    node.className = 'v skeleton';
    node.textContent = '';
  });
  byId('hops').innerHTML = '';
  byId('flag-list').innerHTML = '';
  byId('c-note').textContent = '';
  byId('raw-json').textContent = '…';
}

function streamUrl(input, { refresh }) {
  const query = optionsQuery();
  query.set('lang', LANG);
  if (refresh) query.set('refresh', '1');
  return { stream: `/api/stream/${encodeURIComponent(input)}?${query}`, api: `/api/${encodeURIComponent(input)}?${query}` };
}

function startCheck(input, { refresh = false } = {}) {
  if (!input) return;
  TARGET = input;
  REPORT = null;
  LAST_ERROR = null;
  LIVE = [];

  if (STREAM) { STREAM.close(); STREAM = null; }

  byId('empty').hidden = true;
  byId('report').hidden = false;
  byId('alerts').innerHTML = '';
  byId('search-url').value = input;
  byId('hero-url').textContent = readable(input);
  byId('hero-meta').innerHTML = '';
  byId('count-badge').className = 'grade-badge pending';
  byId('count-badge').textContent = '·';
  skeletons();
  checking(true);
  setProgress('follow', 0);
  updateSeoMeta();

  const urls = streamUrl(input, { refresh });
  const stream = new EventSource(urls.stream);
  STREAM = stream;
  let heard = false;

  const done = () => {
    stream.close();
    if (STREAM === stream) STREAM = null;
    checking(false);
    render();
  };

  stream.addEventListener('start', () => { heard = true; });

  stream.addEventListener('progress', event => {
    heard = true;
    try {
      const data = JSON.parse(event.data);
      if (data.hop) {
        LIVE.push(data.hop);
        byId('hops').appendChild(liveHopElement(data.hop));
      }
      setProgress(data.stage, LIVE.length);
    } catch { /* a malformed frame is not worth breaking the check over */ }
  });

  stream.addEventListener('report', event => {
    try { REPORT = JSON.parse(event.data); }
    catch { LAST_ERROR = { error: 'bad-response' }; }
    done();
    if (REPORT?.url) {
      /* The address bar gets the canonical form of what was typed, which is
         also the form the next visitor's link will have. */
      TARGET = REPORT.url;
      const query = optionsQuery().toString();
      history.replaceState({}, '', '/' + encodeURIComponent(REPORT.url) + (query ? '?' + query : ''));
      updateSeoMeta();
    }
  });

  stream.addEventListener('failed', event => {
    try { LAST_ERROR = JSON.parse(event.data); }
    catch { LAST_ERROR = { error: 'scan-failed' }; }
    done();
  });

  stream.onerror = async () => {
    if (REPORT || LAST_ERROR) return;
    stream.close();
    if (STREAM === stream) STREAM = null;
    /* A stream refused before it started — an address that is not a link, a
       private one — carries its reason in a body EventSource cannot read.
       Asking the data route once gets the reason, or the report. */
    if (!heard) {
      try {
        const answer = await (await fetch(urls.api, { headers: { accept: 'application/json' } })).json();
        if (answer?.hops) REPORT = answer;
        else LAST_ERROR = answer?.error ? answer : { error: 'network' };
      } catch {
        LAST_ERROR = { error: 'network' };
      }
    } else {
      LAST_ERROR = { error: 'network' };
    }
    checking(false);
    render();
  };
}

/* ================================================================== *
 * The journey
 * ================================================================== */

/** A hop drawn from the stream: enough to watch the chain grow. */
function liveHopElement(hop) {
  const item = document.createElement('li');
  item.className = `hop live k-${hop.kind}`;
  const code = hop.status
    ? `<span class="status ${statusClass(hop.status)}">${esc(hop.status)}</span>`
    : `<span class="status err">${esc(tCode('err', hop.error || hop.refused))}</span>`;
  item.innerHTML =
    `<span class="hop-n">${hop.index + 1}</span>` +
    `<div class="hop-head">${code}` +
    `${hop.redirect ? `<span class="status-text">${esc(tCode('rt', hop.redirect.type))}</span>` : ''}` +
    `<span class="hop-time">${esc(hop.total !== undefined ? ms(hop.total) : '')}</span></div>` +
    `<div class="hop-url">${urlHtml(hop.url, [], hop.hostDisplay)}</div>`;
  return item;
}

function timingHtml(timings) {
  if (!timings) return '';
  const phases = ['dns', 'connect', 'tls', 'wait'].filter(key => timings[key] !== null && timings[key] !== undefined);
  const total = Math.max(1, timings.total || 0);
  /* The widths are set through the DOM once the markup is in: the policy
     allows no style attribute written into markup, and rightly so. */
  const bar = phases.map(key =>
    `<i class="t-${key}" data-width="${Math.max(0.5, (timings[key] / total) * 100).toFixed(1)}"></i>`).join('');
  const legend = phases.map(key => `<span class="t-${key}">${esc(tCode('t', key))} ${esc(ms(timings[key]))}</span>`).join('');
  return `<div class="sub-head">${esc(t('hop_timing'))} · ${esc(ms(timings.total))}</div>` +
    `<div class="timing">${bar}</div><div class="timing-legend">${legend}</div>`;
}

function kv(name, value, { html = false } = {}) {
  if (value === undefined || value === null || value === '') return '';
  return `<div class="kv"><span class="name">${esc(name)}</span><span class="val">${html ? value : esc(value)}</span></div>`;
}

function cookieRows(cookies) {
  return cookies.map(cookie => {
    const flags = [cookie.secure ? 'Secure' : '', cookie.httpOnly ? 'HttpOnly' : '',
      cookie.sameSite ? `SameSite=${cookie.sameSite}` : ''].filter(Boolean).join(' · ');
    const scope = cookie.domain ? `${cookie.hostOnly ? '' : '.'}${cookie.domain}${cookie.path || ''}` : '';
    const fate = cookie.rejected
      ? `<span class="weak">${esc(cookie.rejectedLabel || tCode('ck', cookie.rejected))}</span>`
      : cookie.deleted ? esc(t('v_deleted'))
      : cookie.expires === 'session' ? esc(t('v_session'))
      : esc(cookie.expires ? new Date(cookie.expires).toLocaleDateString(locale()) : DASH);
    return `<tr><td class="mono" data-label="${esc(t('th_name'))}">${esc(cookie.name || '∅')}</td>` +
      `<td class="mono" data-label="${esc(t('th_scope'))}">${esc(scope) || DASH}</td>` +
      `<td data-label="${esc(t('th_flags'))}">${esc(flags) || DASH}</td>` +
      `<td data-label="${esc(t('th_expires'))}">${fate}</td></tr>`;
  }).join('');
}

function detailsHtml(hop) {
  const parts = [];
  parts.push(timingHtml(hop.timings));

  const rows = [
    hop.redirect?.location ? kv(t('hop_location'), hop.redirect.location) : '',
    kv(t('hop_address'), hop.address ? `${hop.address}${hop.port ? ' : ' + hop.port : ''}` : null),
    kv(t('hop_http'), hop.httpVersion ? `HTTP/${hop.httpVersion}` : null),
    kv(t('hop_server'), hop.server),
    kv(t('hop_through'), hop.edgeName),
    hop.tls ? kv(t('hop_tls'), [hop.tls.protocol, hop.tls.cipher].filter(Boolean).join(' · ')) : '',
    hop.tls ? kv(t('hop_cert'), hop.tls.authorized
      ? `<span class="good">${esc(t('hop_cert_ok'))}</span>`
      : `<span class="weak">${esc(t('hop_cert_bad'))}${hop.tls.error ? ` · ${esc(hop.tls.error)}` : ''}</span>`,
    { html: true }) : '',
    hop.tls ? kv(t('hop_cert_for'), [hop.tls.subject, ...(hop.tls.names || []).filter(name => name !== hop.tls.subject)]
      .filter(Boolean).slice(0, 6).join(', ') + (hop.tls.namesTotal > 6 ? ` … (${hop.tls.namesTotal})` : '')) : '',
    hop.tls ? kv(t('hop_cert_issuer'), hop.tls.issuer) : '',
    hop.tls?.validTo ? kv(t('hop_cert_until'), new Date(hop.tls.validTo).toLocaleDateString(locale())) : '',
    kv('Cache-Control', hop.cacheControl),
    kv('Expires', hop.expires),
    kv('Strict-Transport-Security', hop.hsts),
    kv(t('hop_cookies_sent'), hop.cookiesSent?.join(', ')),
  ].join('');
  if (rows) parts.push(`<div class="kvlist">${rows}</div>`);

  if (hop.page) {
    const page = hop.page;
    const pageRows = [
      kv(t('hop_title'), page.title),
      kv(t('hop_canonical'), page.canonical || hop.linkCanonical),
      kv(t('hop_robots'), [...(page.robots || []).map(entry => `${entry.name}: ${entry.content}`),
        ...(hop.robotsHeader || []).map(value => `X-Robots-Tag: ${value}`)].join(' · ')),
      page.refresh && hop.redirect?.type !== 'meta-refresh'
        ? kv(t('hop_refresh'), t('hop_refresh_slow', { url: page.refresh.target || page.refresh.url || '', s: number(page.refresh.delay) }))
        : '',
      page.noscriptRefresh ? kv(t('hop_noscript'), page.noscriptRefresh.target) : '',
      page.scripts && hop.redirect?.type !== 'javascript'
        ? kv(t('hop_scripts'), page.scripts.map(entry => entry.target).join(', ')) : '',
      kv(t('hop_body'), `${number(Math.round((page.bytes || 0) / 102.4) / 10)} ${t('unit_kb')}${page.truncated ? ' · ' + t('v_truncated') : ''}`),
    ].join('');
    parts.push(`<div class="sub-head">${esc(t('hop_page'))}</div><div class="kvlist">${pageRows}</div>`);
  }

  if (hop.cookiesSet?.length) {
    parts.push(`<div class="sub-head">${esc(t('hop_cookies_set'))}</div>` +
      '<div class="table-wrap"><table class="table stacks"><thead><tr>' +
      `<th>${esc(t('th_name'))}</th><th>${esc(t('th_scope'))}</th><th>${esc(t('th_flags'))}</th><th>${esc(t('th_expires'))}</th>` +
      `</tr></thead><tbody>${cookieRows(hop.cookiesSet)}</tbody></table></div>` +
      `<div class="note">${esc(t('note_cookie_values'))}</div>`);
  }

  if (hop.headers?.length) {
    parts.push(`<div class="sub-head">${esc(t('hop_headers'))}</div>` +
      '<div class="table-wrap"><table class="table headers-table"><tbody>' +
      hop.headers.map(([name, value]) => `<tr><td>${esc(name)}</td><td>${esc(value)}</td></tr>`).join('') +
      '</tbody></table></div>');
  }

  return parts.filter(Boolean).join('');
}

function nextHtml(hop, report) {
  const redirect = hop.redirect;
  if (!redirect) return '';
  const how = redirect.type === 'http'
    ? `${redirect.status} · ${hop.statusMeaning || tCode('sc', redirect.status)}`
    : `${redirect.typeLabel || tCode('rt', redirect.type)}${redirect.delay ? ` · ${number(redirect.delay)} ${t('unit_s')}` : ''}`;

  const notes = [];
  if (redirect.relative) notes.push(t('hop_relative'));
  if (redirect.fragmentInherited) notes.push(t('hop_fragment'));
  if (redirect.multiple) notes.push(t('hop_multiple'));
  if (redirect.notFollowed) notes.push(t('hop_not_followed'));

  const nextHop = report?.hops?.[hop.index + 1];
  const target = redirect.target
    ? `<span class="hop-url">${urlHtml(redirect.target, nextHop ? nextHop.changes : [], nextHop?.hostDisplay)}</span>`
    : `<span class="weak">${esc(redirect.location)}</span>`;
  const loop = redirect.loop !== undefined
    ? `<span class="loop">↺ ${esc(t('hop_loop', { n: redirect.loop + 1 }))}</span>` : '';

  return `<div class="hop-next"><span class="how"><span class="arrow">→</span> ${esc(how)}</span>` +
    `${notes.map(note => `<span class="tag">${esc(note)}</span>`).join('')}</div>` +
    (nextHop && !loop ? '' : `<div class="hop-next">${target}${loop}</div>`);
}

function problemHtml(hop) {
  const problems = [];
  if (hop.kind === 'failed') problems.push(`${hop.errorLabel || tCode('err', hop.error)}${hop.detail ? ` (${hop.detail})` : ''}`);
  if (hop.kind === 'refused' || hop.kind === 'not-followed') problems.push(hop.refusedLabel || tCode('err', hop.refused));
  if (hop.missingLocation) problems.push(tCode('flag', 'redirect-without-location'));
  if (hop.unfollowedStatus) problems.push(tCode('flag', 'redirect-status-not-followed'));
  if (hop.challenge) problems.push(tCode('flag', 'bot-challenge'));
  if (hop.tls && !hop.tls.authorized) problems.push(t('hop_cert_bad'));
  return problems.map(text => `<div class="hop-problem">${esc(text)}</div>`).join('');
}

function hopElement(hop, report) {
  const item = document.createElement('li');
  const bad = hop.kind === 'final' && hop.status >= 400;
  item.className = `hop k-${hop.kind}${bad ? ' bad' : ''}`;

  const code = hop.status
    ? `<span class="status ${statusClass(hop.status)}">${esc(hop.status)}</span>`
    : `<span class="status err">${esc(hop.kind === 'failed' ? t('hop_failed') : t('hop_stopped'))}</span>`;
  const text = [hop.statusText, hop.kind === 'final' ? t('hop_final') : ''].filter(Boolean).join(' · ');

  const meta = [];
  if (hop.address) meta.push(`<span class="tag">${esc(hop.address)}</span>`);
  if (hop.edgeName) meta.push(`<span class="tag">${esc(hop.edgeName)}</span>`);
  else if (hop.server) meta.push(`<span class="tag">${esc(hop.server)}</span>`);
  if (hop.tls) {
    meta.push(`<span class="tag ${hop.tls.authorized ? 'ok' : 'bad'}">${esc(hop.tls.protocol || 'TLS')}${hop.tls.authorized ? ' ✓' : ' ✗'}</span>`);
  }
  if (hop.cookiesSet?.length) meta.push(`<span class="tag">${esc(t('hop_sets_cookies', { n: hop.cookiesSet.length }))}</span>`);
  if (hop.page?.title && hop.kind === 'final') meta.push(`<span class="tag">${esc(hop.page.title)}</span>`);

  const details = hop.timings ? `<details><summary>${esc(t('hop_details'))}</summary>` +
    `<div class="detail-body">${detailsHtml(hop)}</div></details>` : '';

  item.innerHTML =
    `<span class="hop-n">${hop.index + 1}</span>` +
    `<div class="hop-head">${code}<span class="status-text">${esc(text)}</span>` +
    `<span class="hop-time">${esc(hop.timings ? ms(hop.timings.total) : '')}</span></div>` +
    `<div class="hop-url">${urlHtml(hop.url, hop.changes, hop.hostDisplay)}</div>` +
    (meta.length ? `<div class="hop-meta">${meta.join('')}</div>` : '') +
    problemHtml(hop) +
    nextHtml(hop, report) +
    details;
  item.querySelectorAll('.timing i[data-width]').forEach(segment => {
    segment.style.width = segment.dataset.width + '%';
  });
  return item;
}

function renderHops(report) {
  const list = byId('hops');
  list.innerHTML = '';
  for (const hop of report.hops || []) list.appendChild(hopElement(hop, report));
}

/** The chain as plain lines, for a ticket or a chat. */
function chainText(report) {
  const lines = (report.hops || []).map(hop => {
    const code = hop.status ?? (hop.errorLabel || hop.refusedLabel || hop.error || hop.refused);
    const how = hop.redirect && hop.redirect.type !== 'http' ? `  (${hop.redirect.typeLabel || hop.redirect.type})` : '';
    return `${String(hop.index + 1).padStart(2)}. ${code}  ${hop.url}${how}`;
  });
  const last = report.hops?.[report.hops.length - 1];
  if (last?.redirect?.loop !== undefined) lines.push(`    ↺ ${t('hop_loop', { n: last.redirect.loop + 1 })}`);
  else if (last?.redirect && ['left-web', 'unsafe-redirect', 'too-many-redirects'].includes(report.summary?.outcome)) {
    lines.push(`    → ${last.redirect.target}`);
  }
  return lines.join('\n');
}

/* ================================================================== *
 * The rest of the report
 * ================================================================== */

const OUTCOME_STATE = {
  arrived: 'ok', 'left-web': 'muted', incomplete: 'warn', refused: 'warn',
  'client-error': 'bad', 'server-error': 'bad', loop: 'bad', 'too-many-redirects': 'bad',
  failed: 'bad', 'broken-redirect': 'bad', 'unsafe-redirect': 'bad',
};

function badgeClass(summary) {
  const outcome = summary.outcome;
  if (['loop', 'too-many-redirects', 'failed', 'broken-redirect', 'unsafe-redirect'].includes(outcome)) return 'g-f';
  if (outcome === 'client-error' || outcome === 'server-error') return 'g-e';
  if (outcome !== 'arrived') return 'g-unknown';
  const count = summary.redirects;
  return count <= 1 ? 'g-a' : count === 2 ? 'g-b' : count <= 4 ? 'g-c' : 'g-d';
}

function renderHero(report) {
  const summary = report.summary || {};
  const badge = byId('count-badge');
  badge.className = 'grade-badge ' + badgeClass(summary);
  badge.textContent = summary.outcome === 'loop' ? '↺' : String(summary.redirects ?? 0);

  byId('hero-url').textContent = readable(report.url || report.input);

  const meta = byId('hero-meta');
  meta.innerHTML = '';
  const state = OUTCOME_STATE[summary.outcome];
  meta.appendChild(tag(summary.outcomeLabel || tCode('out', summary.outcome),
    state === 'ok' ? 'ok' : state === 'bad' ? 'bad' : state === 'warn' ? 'warn' : ''));
  if (summary.destination?.status) meta.appendChild(tag(`HTTP ${summary.destination.status}`));
  if (summary.totalMs !== undefined) meta.appendChild(tag(ms(summary.totalMs)));
  if (report.client) meta.appendChild(tag(report.client.profileLabel || tCode('ua', report.client.profile)));
  if (report.client && !report.client.cookies) meta.appendChild(tag(t('v_cookies_off'), 'warn'));
}

function renderSummary(report) {
  const summary = report.summary || {};
  const destination = summary.destination;
  setHtml('s-destination', destination
    ? `<span class="hop-url">${urlHtml(destination.url)}</span>${destination.status ? ` · ${esc(destination.status)}` : ''}`
    : '', destination ? '' : 'muted');
  set('s-outcome', summary.outcomeLabel || tCode('out', summary.outcome), OUTCOME_STATE[summary.outcome]);

  const types = Object.entries(summary.types || {})
    .map(([type, count]) => `${tCode('rt', type)}: ${number(count)}`).join(', ');
  set('s-redirects', summary.redirects ? `${number(summary.redirects)}${types ? ` (${types})` : ''}` : t('v_no_redirects'));
  set('s-total', summary.requests ? `${ms(summary.totalMs)} · ${t('v_requests', { n: number(summary.requests) })}` : null);
  set('s-redirect-time', summary.redirects ? ms(summary.redirectMs) : null);
  set('s-hosts', (summary.hosts || []).join(' → '));
}

function renderClient(report) {
  const client = report.client || {};
  set('c-profile', client.profileLabel || tCode('ua', client.profile));
  set('c-ua', client.userAgent);
  set('c-language', client.acceptLanguage || t('v_not_sent'), client.acceptLanguage ? '' : 'muted');
  set('c-cookies', client.cookies ? t('v_cookies_kept') : t('v_cookies_forgotten'), client.cookies ? '' : 'warn');
  byId('c-note').textContent = client.kind === 'crawler' ? t('note_crawler') : t('note_client');
}

function renderFlags(report) {
  const list = byId('flag-list');
  list.innerHTML = '';
  const flags = report.flags || [];
  if (!flags.length) {
    list.innerHTML = `<div class="empty-note">${esc(t('empty_flags'))}</div>`;
    return;
  }
  for (const finding of flags) {
    const where = finding.hops?.length
      ? t('at_steps', { n: finding.hops.map(index => index + 1).join(', ') }) : '';
    const item = document.createElement('div');
    item.className = 'finding';
    item.innerHTML =
      `<span class="sev sev-${esc(finding.severity)}">${
        esc(finding.severityLabel || tCode('sev', finding.severity))}</span>` +
      '<div class="body">' +
      `<div class="title">${esc(finding.name || tCode('flag', finding.id))}` +
      `${where ? ` <span class="where">${esc(where)}</span>` : ''}</div>` +
      `<div class="desc">${esc(finding.description || tCode('fd', finding.id))}</div>` +
      '</div>' +
      `<span class="state">${esc(finding.statusLabel || tCode('st', finding.status))}</span>`;
    list.appendChild(item);
  }
}

function renderAlerts(report) {
  const alerts = byId('alerts');
  alerts.innerHTML = '';
  if (!report?.incomplete?.length) return;

  const box = document.createElement('div');
  box.className = 'alert warn';
  const reasons = report.incompleteLabels || report.incomplete.map(code => tCode('inc', code));
  box.innerHTML =
    '<div class="alert-body">' +
    `<div class="alert-title">${esc(t('incomplete_title'))}</div>` +
    `<div>${esc(t('incomplete_chain'))}</div>` +
    `<ul>${reasons.map(reason => `<li>${esc(reason)}</li>`).join('')}</ul>` +
    '</div>';
  alerts.appendChild(box);
}

function renderError() {
  byId('report').hidden = true;
  byId('empty').hidden = true;
  const box = byId('alerts');
  box.innerHTML = '';
  const alert = document.createElement('div');
  alert.className = 'alert bad';
  const code = LAST_ERROR.error || 'scan-failed';
  /* The message the server sent is in the language it was asked in, which may
     not be the one on screen now; the code is translated here instead. */
  alert.innerHTML = `<div class="alert-body"><div class="alert-title">${esc(tCode('err', code))}</div>` +
    (LAST_ERROR.allowedPorts ? `<div>${esc(t('v_ports', { list: LAST_ERROR.allowedPorts.join(', ') }))}</div>` : '') +
    '</div>';
  box.appendChild(alert);
  byId('count-badge').className = 'grade-badge g-unknown';
  byId('count-badge').textContent = '!';
}

function render() {
  applyStaticText();

  if (LAST_ERROR) { renderError(); return; }
  if (!REPORT) return;

  byId('report').hidden = false;
  renderHero(REPORT);
  renderHops(REPORT);
  renderSummary(REPORT);
  renderClient(REPORT);
  renderFlags(REPORT);
  renderAlerts(REPORT);
  byId('raw-json').textContent = JSON.stringify(REPORT, null, 2);
}

/* ================================================================== *
 * Static text, language switching, SEO
 * ================================================================== */

function buildClientSelect() {
  const select = byId('search-ua');
  const current = select.value || 'chrome';
  select.innerHTML = '';
  for (const id of PROFILES) {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = tCode('ua', id);
    select.appendChild(option);
  }
  select.value = current;
}

function applyStaticText() {
  document.documentElement.lang = LANG;
  document.documentElement.dir = RTL.has(LANG) ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach(node => {
    node.textContent = t(node.dataset.i18n);
  });
  byId('search-url').placeholder = t('ph_url');
  byId('search-url').setAttribute('aria-label', t('hero_label'));
  byId('lang').setAttribute('aria-label', t('lang_aria'));
  byId('api-hint').innerHTML = t('api_hint', { origin: location.origin, example: 'example.com' });
  buildClientSelect();
  if (!TARGET) byId('hero-url').textContent = t('no_target');
  if (!REPORT && !LAST_ERROR && !STREAM) byId('count-badge').textContent = '·';
}

function updateSeoMeta() {
  const label = TARGET ? readable(TARGET) : '';
  const title = label ? `${label} — ${t('title_short')}` : t('title');
  document.title = title;
  for (const [id, value] of [
    ['meta-description', t('subtitle')], ['og-title', title], ['twitter-title', title],
    ['og-description', t('subtitle')], ['twitter-description', t('subtitle')],
  ]) {
    const node = byId(id);
    if (node) node.setAttribute('content', value);
  }
  const canonical = byId('link-canonical');
  if (canonical) canonical.href = location.origin + (TARGET ? '/' + encodeURIComponent(TARGET) : '/');
}

function buildLanguageSelect() {
  const select = byId('lang');
  select.innerHTML = '';
  for (const code of Object.keys(I18N)) {
    const option = document.createElement('option');
    option.value = code;
    option.textContent = window.LANG_NAMES?.[code] || code;
    if (code === LANG) option.selected = true;
    select.appendChild(option);
  }
  select.addEventListener('change', () => {
    LANG = select.value;
    try { localStorage.setItem(STORAGE_KEY, LANG); } catch { /* private mode */ }
    render();
    updateSeoMeta();
  });
}

function buildExamples() {
  const box = byId('examples');
  box.innerHTML = '';
  for (const example of EXAMPLES) {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = example;
    button.addEventListener('click', () => go(example));
    box.appendChild(button);
  }
}

/* ================================================================== *
 * Wiring
 * ================================================================== */

function go(input) {
  const value = String(input || '').trim();
  if (!value) return;
  const query = optionsQuery().toString();
  history.pushState({}, '', '/' + encodeURIComponent(value) + (query ? '?' + query : ''));
  startCheck(value);
}

byId('search-form').addEventListener('submit', event => {
  event.preventDefault();
  go(byId('search-url').value);
});

byId('btn-rescan').addEventListener('click', () => {
  if (TARGET) startCheck(TARGET, { refresh: true });
});

byId('btn-copy-json').addEventListener('click', () => {
  if (REPORT) copyText(JSON.stringify(REPORT, null, 2));
});

byId('btn-copy-chain').addEventListener('click', () => {
  if (REPORT) copyText(chainText(REPORT));
});

byId('btn-save-json').addEventListener('click', () => {
  if (!REPORT) return;
  const blob = new Blob([JSON.stringify(REPORT, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  let host = 'report';
  try { host = new URL(REPORT.url).hostname; } catch { /* keep the fallback */ }
  link.download = `myredirectchecker-${host}.json`;
  link.click();
  URL.revokeObjectURL(url);
});

function fromLocation() {
  applyOptions(location.search);
  const segment = location.pathname.replace(/^\//, '');
  if (!segment) return null;
  try { return decodeURIComponent(segment); } catch { return segment; }
}

window.addEventListener('popstate', () => {
  const target = fromLocation();
  if (target) startCheck(target);
});

buildLanguageSelect();
buildExamples();
applyStaticText();

const initial = fromLocation();
updateSeoMeta();
if (initial) startCheck(initial);
