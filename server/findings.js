/**
 * What is wrong with a chain, as findings.
 *
 * There is no grade. A redirect is not good or bad on its own: a 302 to a login
 * page is exactly right, a 301 to the wrong page is worse than none, and only
 * the person who owns the link knows which one they meant. So the report does
 * what can be done without that knowledge — it names what breaks, what leaks,
 * what costs time and what search engines will read differently — and leaves
 * the verdict to the reader.
 *
 * A finding that concerns particular hops carries them as `hops`, zero-based,
 * and appears once however many hops share the problem.
 */

import { flag } from '@sharapov/service-kit';

import { siteOf } from './target.js';
import { PERMANENT } from './follow.js';

const withoutFragment = url => String(url || '').replace(/#.*$/, '');

/* Googlebot follows up to ten redirects in a row, and says so in its docs. */
const GOOGLEBOT_REDIRECTS = 10;
const LONG_CHAIN = 3;
const SLOW_REDIRECTS_MS = 1000;

function parse(url) {
  try { return new URL(url); } catch { return null; }
}

/**
 * A hop that only tidies the address: the scheme, a `www.`, a trailing slash
 * or the case of the path. That is canonicalisation, and canonicalisation is
 * permanent by nature — a temporary one tells browsers not to remember it and
 * search engines to keep both addresses.
 */
function tidiesOnly(from, to) {
  const a = parse(from);
  const b = parse(to);
  if (!a || !b) return false;
  if (siteOf(a.hostname) !== siteOf(b.hostname) || a.search !== b.search) return false;
  const path = value => value.replace(/\/+$/, '').toLowerCase();
  if (path(a.pathname) !== path(b.pathname)) return false;
  return withoutFragment(a.href) !== withoutFragment(b.href);
}

/**
 * @param {object} chain
 * @param {string} chain.start     the first URL
 * @param {object[]} chain.hops
 * @param {string} chain.outcome
 * @param {boolean} chain.cookies  whether cookies were kept
 */
export function findings({ start, hops, outcome, cookies }) {
  const found = new Map();
  /** One finding per id; hops accumulate. */
  const add = (id, severity, status, extra = {}, at) => {
    const existing = found.get(id);
    if (existing) {
      if (at !== undefined && !existing.hops.includes(at)) existing.hops.push(at);
      return;
    }
    found.set(id, flag(id, severity, status, { ...extra, ...(at !== undefined ? { hops: [at] } : {}) }));
  };

  const last = hops[hops.length - 1];
  const redirects = hops.filter(hop => hop.kind === 'redirect');
  const final = hops.findLast(hop => hop.kind === 'final');
  const upgradesLater = index => hops.some(hop => hop.index > index && hop.url.startsWith('https:'));

  /* ---------------- how the chain ended ---------------- */

  switch (outcome) {
    case 'loop':
      if (cookies) add('redirect-loop', 'critical', 'failed', { to: last.redirect.loop }, last.index);
      else add('redirect-loop-without-cookies', 'high', 'failed', { to: last.redirect.loop }, last.index);
      break;
    case 'too-many-redirects':
      add('too-many-redirects', 'critical', 'failed', { count: redirects.length });
      break;
    case 'failed':
      add('connection-failed', 'critical', 'failed', { error: last.error }, last.index);
      break;
    case 'refused':
      if (last.refused === 'private-address' || last.refused === 'invalid-host') {
        add('redirect-to-private-network', 'high', 'failed', { url: last.url }, last.index);
      }
      break;
    case 'broken-redirect':
      add('location-malformed', 'high', 'failed', { location: last.redirect.location }, last.index);
      break;
    case 'unsafe-redirect':
      add('unsafe-redirect-target', 'high', 'failed',
        { scheme: parse(last.redirect.target)?.protocol }, last.index);
      break;
    case 'left-web':
      add('leaves-the-web', 'info', 'info', { scheme: parse(last.redirect.target)?.protocol }, last.index);
      break;
    case 'client-error':
      add('ends-in-client-error', 'high', 'failed', { status: last.status }, last.index);
      break;
    case 'server-error':
      add('ends-in-server-error', 'high', 'failed', { status: last.status }, last.index);
      break;
    default:
      break;
  }

  /* ---------------- hop by hop ---------------- */

  let rejected = [];
  for (const hop of hops) {
    const redirect = hop.redirect;

    if (hop.tls && !hop.tls.authorized) {
      add('certificate-invalid', 'high', 'failed', { reason: hop.tls.error }, hop.index);
    }
    if (hop.missingLocation) add('redirect-without-location', 'high', 'failed', { status: hop.status }, hop.index);
    if (hop.unfollowedStatus) {
      add('redirect-status-not-followed', 'info', 'info', { status: hop.unfollowedStatus }, hop.index);
    }
    if (hop.challenge) add('bot-challenge', 'info', 'info', { provider: hop.challenge }, hop.index);

    for (const cookie of hop.cookiesSet || []) {
      if (cookie.rejected) rejected.push({ name: cookie.name, reason: cookie.rejected, hop: hop.index });
    }
    if (hop.kind === 'redirect' && (hop.cookiesSet || []).some(cookie => !cookie.rejected && !cookie.deleted)) {
      add('redirect-sets-cookies', 'info', 'info', {}, hop.index);
    }

    if (!redirect || redirect.broken || !redirect.target) continue;
    const from = parse(hop.url);
    const to = parse(redirect.target);
    if (!from || !to) continue;
    const web = to.protocol === 'http:' || to.protocol === 'https:';

    if (web && from.protocol === 'https:' && to.protocol === 'http:') {
      add('https-downgrade', 'high', 'failed', {}, hop.index);
    }
    /* Plain http to plain http is only a finding when the chain does go to
       https later: then the upgrade was available and came late, and every
       hop before it crossed the network in the clear. A site that never
       upgrades at all is `ends-on-http`, once, rather than this on every hop. */
    if (web && from.protocol === 'http:' && to.protocol === 'http:' && upgradesLater(hop.index)) {
      add('late-https-upgrade', 'medium', 'warning', {}, hop.index);
    }
    if (web && from.protocol === 'http:' && to.protocol === 'https:' && from.hostname !== to.hostname) {
      add('upgrade-changes-host', 'low', 'warning', {}, hop.index);
    }

    if (redirect.type === 'http') {
      if (redirect.multiple) add('multiple-location-headers', 'high', 'failed', {}, hop.index);
      if (redirect.unencoded) add('location-unencoded', 'low', 'warning', {}, hop.index);
      if (!redirect.permanent && redirect.status !== 303 && tidiesOnly(hop.url, redirect.target)) {
        add('temporary-canonicalization', 'low', 'warning', { status: redirect.status }, hop.index);
      }
      if (PERMANENT.has(redirect.status) && !hop.cacheControl && !hop.expires) {
        add('permanent-redirect-cached', 'info', 'info', {}, hop.index);
      }
    }
    if (redirect.type === 'meta-refresh') add('meta-refresh', 'low', 'warning', { delay: redirect.delay }, hop.index);
    if (redirect.type === 'refresh-header') add('refresh-header', 'low', 'warning', { delay: redirect.delay }, hop.index);
    if (redirect.type === 'javascript') add('javascript-redirect', 'medium', 'warning', {}, hop.index);
  }

  if (rejected.length) {
    rejected = rejected.slice(0, 20);
    add('cookie-rejected', 'low', 'warning', { cookies: rejected });
  }

  /* ---------------- the chain as a whole ---------------- */

  /* How long and how tidy a chain is only matters for one that gets somewhere.
     A loop is broken already, and saying it could be shorter is noise. */
  const broken = outcome === 'loop' || outcome === 'too-many-redirects';
  const count = redirects.length;
  if (broken) {
    /* nothing to add about the length of a chain that never ends */
  } else if (count > GOOGLEBOT_REDIRECTS) {
    add('beyond-googlebot-limit', 'high', 'warning', { count });
  } else if (count >= LONG_CHAIN && count <= GOOGLEBOT_REDIRECTS) {
    add('long-chain', 'low', 'warning', { count });
  }

  /* Hops within one site that could have been a single redirect. The first
     hop going from http to https on the same host does not count: that one is
     the correct first step, and the one HSTS preloading asks for. */
  const mergeable = redirects.filter((hop, position) => {
    const from = parse(hop.url);
    const to = parse(hop.redirect.target);
    if (!from || !to || siteOf(from.hostname) !== siteOf(to.hostname)) return false;
    const upgradeOnly = position === 0 && from.protocol === 'http:' && to.protocol === 'https:' &&
      from.hostname === to.hostname && from.pathname === to.pathname && from.search === to.search;
    return !upgradeOnly;
  });
  if (!broken && mergeable.length >= 2) add('could-be-one-redirect', 'low', 'warning', { count: mergeable.length });

  const redirectMs = redirects.reduce((sum, hop) => sum + (hop.timings?.total || 0), 0);
  if (!broken && redirectMs > SLOW_REDIRECTS_MS) add('slow-redirects', 'low', 'warning', { ms: redirectMs });

  if (final && final.status < 400) {
    const startUrl = parse(start);
    const finalUrl = parse(final.url);

    if (finalUrl?.protocol === 'http:') add('ends-on-http', 'medium', 'warning', {}, final.index);

    if (startUrl && finalUrl && count) {
      const kept = new Set(finalUrl.searchParams.keys());
      const lost = [...new Set(startUrl.searchParams.keys())].filter(name => !kept.has(name));
      if (lost.length) add('query-lost', 'medium', 'warning', { params: lost.slice(0, 20) });

      if (startUrl.pathname !== '/' && finalUrl.pathname === '/') {
        add('path-lost', 'medium', 'warning', { path: startUrl.pathname });
      }
    }

    if (startUrl && finalUrl && siteOf(startUrl.hostname) !== siteOf(finalUrl.hostname)) {
      add('lands-on-another-site', 'info', 'info', { from: startUrl.hostname, to: finalUrl.hostname });
    }

    const canonical = final.page?.canonical || final.linkCanonical;
    if (canonical && withoutFragment(canonical) !== withoutFragment(final.url)) {
      add('canonical-elsewhere', 'low', 'warning', { canonical }, final.index);
    }
    if (final.noindex) add('final-noindex', 'medium', 'warning', {}, final.index);
    if (final.page?.scripts?.length && !final.page.stub) {
      add('script-redirect-not-followed', 'info', 'info',
        { targets: final.page.scripts.map(entry => entry.target).slice(0, 5) }, final.index);
    }
  }

  return [...found.values()];
}
