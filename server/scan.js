/**
 * The check: follow the link, then say what the journey was like.
 *
 * Everything about the journey is established in follow.js; this file puts a
 * summary on top, the findings underneath, and marks what could not be
 * established. A chain cut short by the time limit, or stopped at a port this
 * service will not speak to, is reported as far as it got and labelled
 * incomplete — never passed off as the whole story.
 */

import { withDeadline, incomplete as collectIncomplete, sortFlags, refusePrivate } from '@sharapov/service-kit';

import { follow } from './follow.js';
import { findings } from './findings.js';
import { EDGE_NAMES } from './edge.js';
import {
  PROFILES, DEFAULT_PROFILE, profileId, cookiesEnabled, acceptLanguage,
} from './profiles.js';

export const STAGES = ['follow', 'analyse'];

const SCAN_TIMEOUT = Number(process.env.SCAN_TIMEOUT_MS || 45000);

/* What a stopped hop leaves unknown, by the reason it was stopped. */
const INCOMPLETE_FOR = {
  'port-not-allowed': 'port-not-followed',
  'credentials-not-allowed': 'credentials-not-followed',
  'url-too-long': 'url-too-long',
  deadline: 'deadline',
};

export async function scan(target, options = {}) {
  /* The follower stops starting hops before SCAN_TIMEOUT, so a slow chain comes
     back cut short and labelled. This outer limit only catches a hop that
     overruns its own timeout, which should not happen and must not hang. */
  return withDeadline(run(target, options), SCAN_TIMEOUT + 15000);
}

/** The few fields of a hop the page needs to draw it while the rest arrive. */
function brief(hop) {
  return {
    index: hop.index,
    url: hop.url,
    hostDisplay: hop.hostDisplay,
    kind: hop.kind,
    status: hop.status,
    via: hop.via,
    redirect: hop.redirect ? {
      type: hop.redirect.type, status: hop.redirect.status, target: hop.redirect.target,
    } : undefined,
    total: hop.timings?.total,
    error: hop.error,
    refused: hop.refused,
  };
}

function summarise(start, hops, outcome) {
  const last = hops[hops.length - 1];
  const redirects = hops.filter(hop => hop.kind === 'redirect');
  const requested = hops.filter(hop => hop.timings);
  const sum = list => list.reduce((total, hop) => total + (hop.timings?.total || 0), 0);

  const types = {};
  for (const hop of redirects) types[hop.redirect.type] = (types[hop.redirect.type] || 0) + 1;

  const hosts = [];
  for (const hop of hops) {
    const host = hop.hostDisplay || hop.host;
    if (host && hosts[hosts.length - 1] !== host) hosts.push(host);
  }

  /* Where the link ends up. For a chain that hands over to an app the address
     is the one it hands over to; for one that never arrived there is none. */
  let destination = null;
  if (['arrived', 'client-error', 'server-error'].includes(outcome)) {
    destination = { url: last.url, status: last.status, reached: true };
  } else if (['left-web', 'unsafe-redirect'].includes(outcome)) {
    destination = { url: last.redirect.target, reached: false };
  }

  return {
    start,
    outcome,
    destination,
    redirects: redirects.length,
    requests: requested.length,
    totalMs: sum(requested),
    redirectMs: sum(redirects),
    types,
    hosts,
  };
}

async function run(target, { onProgress = () => {}, query = {}, lang = 'en' } = {}) {
  const started = Date.now();
  const profile = profileId(query.ua) || DEFAULT_PROFILE;
  const cookies = cookiesEnabled(query.cookies);
  const progress = (stage, extra = {}) =>
    onProgress({ stage, elapsedMs: Date.now() - started, ...extra });

  progress('follow');
  const { hops, outcome } = await follow(target.url, {
    profile,
    lang,
    cookies,
    deadline: started + SCAN_TIMEOUT,
    onHop: hop => progress('follow', { hop: brief(hop) }),
  });

  /* The address itself pointing inside a private network is not a chain to
     report, it is a request to refuse — the same answer a literal address
     gets before any of this runs. */
  if (hops.length === 1 && hops[0].refused === 'private-address') throw refusePrivate();

  progress('analyse');
  for (const hop of hops) {
    if (hop.edge) hop.edgeName = EDGE_NAMES[hop.edge] || hop.edge;
  }

  const last = hops[hops.length - 1];
  const flags = sortFlags(findings({ start: target.url, hops, outcome, cookies }));
  const missing = collectIncomplete([
    last.kind === 'refused' || last.kind === 'not-followed' ? INCOMPLETE_FOR[last.refused] : null,
  ]);

  const profileSpec = PROFILES[profile];
  return {
    input: target.input,
    url: target.url,
    client: {
      profile,
      kind: profileSpec.kind,
      userAgent: profileSpec.userAgent,
      acceptLanguage: profileSpec.language ? acceptLanguage(lang) : null,
      cookies,
    },
    summary: summarise(target.url, hops, outcome),
    hops,
    flags,
    incomplete: missing,
    meta: {
      elapsedMs: Date.now() - started,
      requests: hops.filter(hop => hop.timings).length,
      cached: false,
      generatedAt: new Date().toISOString(),
      engine: 'myredirectchecker/1.0',
    },
  };
}
