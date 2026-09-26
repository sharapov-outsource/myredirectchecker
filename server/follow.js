/**
 * Following a link, one hop at a time, and keeping every hop.
 *
 * Each hop is judged before it is fetched exactly as the first address was —
 * scheme, port, a private address — because the address a hop goes to is
 * chosen by whoever answered the previous one.
 *
 * A loop is a request that has been made before: the same URL with the same
 * cookies. The cookies are part of it on purpose. A site that sets a cookie and
 * redirects to itself is asking the same URL a different question the second
 * time, and a browser gets through; only when the cookie changes nothing is it
 * a loop that no client can leave.
 */

import { request, headerList, rawValues } from './http.js';
import { createJar, redactSetCookie } from './cookies.js';
import { analysePage, parseRefresh, linkCanonical, noindex } from './page.js';
import { edgeOf, botChallenge } from './edge.js';
import { urlProblem, displayHost, effectivePort } from './target.js';
import { profileHeaders } from './profiles.js';

/* Chrome and Firefox both give up after twenty redirects. */
export const MAX_REDIRECTS = Number(process.env.MAX_REDIRECTS || 20);

const TIMEOUT = Number(process.env.HTTP_TIMEOUT_MS || 10000);

/* A page that refreshes itself somewhere else after more than a minute is a
   page, with a slideshow in it, not a redirect. */
const MAX_REFRESH_DELAY = 60;

export const REDIRECT_STATUSES = new Set([301, 302, 303, 307, 308]);
export const PERMANENT = new Set([301, 308]);
const KEEPS_METHOD = new Set([307, 308]);
const HTML = /^\s*(?:text\/html|application\/xhtml\+xml)\b/i;

/* Browsers refuse to be redirected to these at all (ERR_UNSAFE_REDIRECT). */
const UNSAFE = new Set(['javascript:', 'data:', 'file:', 'blob:', 'about:', 'filesystem:', 'view-source:']);

const first = (headers, name) => {
  const value = headers?.[name];
  return Array.isArray(value) ? value[0] : value ?? null;
};

const withoutFragment = url => url.replace(/#.*$/, '');

/** Which parts of the address a hop changed. */
export function changes(from, to) {
  let a;
  let b;
  try { a = new URL(from); b = new URL(to); } catch { return []; }
  const out = [];
  if (a.protocol !== b.protocol) out.push('scheme');
  if (a.hostname !== b.hostname) out.push('host');
  if (effectivePort(a) !== effectivePort(b)) out.push('port');
  if (a.pathname !== b.pathname) out.push('path');
  if (a.search !== b.search) out.push('query');
  if (a.hash !== b.hash) out.push('fragment');
  return out;
}

/** The body is worth reading only when it is a page that could send people on. */
function wantBody(response) {
  const status = response.statusCode;
  if (status === 204 || status === 304) return false;
  if (REDIRECT_STATUSES.has(status) && response.headers.location) return false;
  const type = String(response.headers['content-type'] || '');
  return !type || HTML.test(type);
}

/**
 * Where an HTTP redirect goes. RFC 9110 §10.2.2: a Location without a fragment
 * inherits the one the request was made with.
 */
function httpRedirect(status, locations, url) {
  const location = locations[0];
  const redirect = {
    type: 'http',
    status,
    location,
    permanent: PERMANENT.has(status),
    keepsMethod: KEEPS_METHOD.has(status),
  };
  if (new Set(locations.map(value => value.trim())).size > 1) redirect.multiple = locations;
  if (/[\s\u0080-￿]/.test(location.trim()) || /[\u0000-\u001f]/.test(location)) redirect.unencoded = true;
  if (!/^[a-z][a-z0-9+.-]*:/i.test(location.trim())) redirect.relative = true;

  let target;
  try {
    target = new URL(location, url);
  } catch {
    return { ...redirect, target: null, broken: true };
  }
  const current = new URL(url);
  if (!location.includes('#') && current.hash) {
    target.hash = current.hash;
    redirect.fragmentInherited = true;
  }
  return { ...redirect, target: target.href };
}

/** The same judgement for a Refresh header or a meta refresh. */
function refreshRedirect(type, parsed, url, base = url) {
  if (!parsed?.url) return null;
  let target;
  try { target = new URL(parsed.url, base).href; } catch { return null; }
  if (withoutFragment(target) === withoutFragment(url)) return null;   // reloading itself
  return { type, delay: parsed.delay, location: parsed.url, target };
}

/**
 * @param {string} start  a URL that already passed parseInput
 * @param {object} options
 * @param {string} options.profile   a key of PROFILES
 * @param {string} options.lang      interface language, for Accept-Language
 * @param {boolean} options.cookies  keep cookies between hops
 * @param {number} options.deadline  epoch ms after which no new hop is started
 * @param {(hop: object) => void} [options.onHop]
 */
export async function follow(start, { profile, lang, cookies = true, deadline, onHop = () => {} }) {
  const jar = createJar();
  const hops = [];
  const seen = new Map();
  let url = start;
  let via = null;
  let outcome = null;

  const push = hop => {
    hops.push(hop);
    try { onHop(hop); } catch { /* a listener's failure is not the check's */ }
  };

  for (;;) {
    const index = hops.length;
    const parsed = new URL(url);
    const hop = {
      index,
      url,
      host: parsed.hostname,
      hostDisplay: displayHost(parsed.hostname),
      via,
      changes: index ? changes(hops[index - 1].url, url) : undefined,
    };

    const problem = urlProblem(parsed);
    if (problem) {
      push({ ...hop, kind: 'refused', refused: problem });
      outcome = 'refused';
      break;
    }

    const remaining = deadline - Date.now();
    if (remaining < 750) {
      push({ ...hop, kind: 'not-followed', refused: 'deadline' });
      outcome = 'incomplete';
      break;
    }

    const sent = cookies ? jar.forUrl(url) : { header: '', names: [] };
    const key = `${withoutFragment(url)}\n${sent.header}`;
    if (seen.has(key)) {
      /* Not requested again: the answer is already known, and it is the one
         that started the circle. The previous hop is marked instead. */
      hops[index - 1].redirect.loop = seen.get(key);
      outcome = 'loop';
      break;
    }
    seen.set(key, index);

    const headers = profileHeaders(profile, lang);
    if (sent.header) headers.cookie = sent.header;

    const response = await request({
      url, headers, timeout: Math.min(TIMEOUT, remaining), wantBody,
    });

    hop.cookiesSent = sent.names.length ? sent.names : undefined;
    hop.timings = response.timings;

    if (!response.ok) {
      const refused = response.error === 'private-address';
      push({
        ...hop,
        kind: refused ? 'refused' : 'failed',
        refused: refused ? 'private-address' : undefined,
        error: refused ? undefined : response.error,
        detail: refused ? undefined : response.detail,
        address: response.address || undefined,
      });
      outcome = refused ? 'refused' : 'failed';
      break;
    }

    const status = response.status;
    const lower = response.headers;
    Object.assign(hop, {
      status,
      statusText: response.statusText,
      httpVersion: response.httpVersion,
      address: response.address,
      family: response.family,
      port: response.port,
      tls: response.tls || undefined,
      server: first(lower, 'server') ? String(first(lower, 'server')).slice(0, 160) : null,
      edge: edgeOf(lower),
      contentType: first(lower, 'content-type'),
      cacheControl: first(lower, 'cache-control'),
      expires: first(lower, 'expires'),
      hsts: parsed.protocol === 'https:' ? first(lower, 'strict-transport-security') : undefined,
      headers: headerList(response.rawHeaders).map(([name, value]) =>
        [name, name.toLowerCase() === 'set-cookie' ? redactSetCookie(value) : value]),
    });

    const setCookies = rawValues(response.rawHeaders, 'set-cookie');
    if (setCookies.length) hop.cookiesSet = (cookies ? jar : createJar()).store(setCookies, url);

    let page = null;
    if (response.page) {
      page = analysePage(response.page.text, url);
      hop.page = {
        title: page.title,
        canonical: page.canonical,
        robots: page.robots.length ? page.robots : undefined,
        refresh: page.refresh || undefined,
        noscriptRefresh: page.noscriptRefresh || undefined,
        scripts: page.scripts.length ? page.scripts : undefined,
        stub: page.stub || undefined,
        bytes: response.page.bytes,
        truncated: response.page.truncated || undefined,
        error: response.page.error || undefined,
      };
      hop.challenge = botChallenge(status, lower, response.page.text) || undefined;
    }

    const linkValues = rawValues(response.rawHeaders, 'link');
    const headerCanonical = linkValues.length ? linkCanonical(linkValues, url) : null;
    if (headerCanonical) hop.linkCanonical = headerCanonical;
    const robotsHeader = rawValues(response.rawHeaders, 'x-robots-tag');
    if (robotsHeader.length) hop.robotsHeader = robotsHeader;
    hop.noindex = [...robotsHeader, ...(page?.robots || []).map(entry => entry.content)].some(noindex) || undefined;

    /* ---------------- where it goes next ---------------- */
    let redirect = null;
    const locations = rawValues(response.rawHeaders, 'location').filter(value => value.trim());

    if (REDIRECT_STATUSES.has(status) && locations.length) {
      redirect = httpRedirect(status, locations, url);
    } else if (REDIRECT_STATUSES.has(status)) {
      hop.missingLocation = true;
    } else {
      const refreshHeader = first(lower, 'refresh');
      redirect = refreshRedirect('refresh-header', parseRefresh(refreshHeader), url);
      if (!redirect && page?.refresh && page.refresh.delay <= MAX_REFRESH_DELAY) {
        redirect = refreshRedirect('meta-refresh', page.refresh, url, page.base || url);
      }
      if (!redirect && page?.stub) {
        const [script] = page.scripts;
        redirect = { type: 'javascript', location: script.raw, target: script.target };
      }
      if (status >= 300 && status < 400 && locations.length) hop.unfollowedStatus = status;
    }

    if (!redirect) {
      push({ ...hop, kind: 'final' });
      outcome = status >= 500 ? 'server-error' : status >= 400 ? 'client-error' : 'arrived';
      break;
    }

    hop.kind = 'redirect';
    hop.redirect = redirect;

    if (redirect.broken) {
      push(hop);
      outcome = 'broken-redirect';
      break;
    }
    const scheme = new URL(redirect.target).protocol;
    if (UNSAFE.has(scheme)) {
      push(hop);
      outcome = 'unsafe-redirect';
      break;
    }
    if (scheme !== 'http:' && scheme !== 'https:') {
      push(hop);
      outcome = 'left-web';
      break;
    }
    if (index + 1 > MAX_REDIRECTS) {
      redirect.notFollowed = true;
      push(hop);
      outcome = 'too-many-redirects';
      break;
    }

    push(hop);
    url = redirect.target;
    via = redirect.type;
  }

  return { hops, outcome };
}
