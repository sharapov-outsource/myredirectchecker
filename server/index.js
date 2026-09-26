/**
 * myredirectchecker — the HTTP layer.
 *
 *   GET /                                the page
 *   GET /<url, encoded>                  page for a link (JSON for console clients)
 *   GET /api/<url, encoded>              always data
 *   GET /api/stream/<url, encoded>       the same check as server-sent events
 *   GET /example.com/some/page?x=1       a link typed as is, redirected to the encoded form
 *   GET /healthz                         liveness probe
 *
 * Every other service in the family takes a host name, which fits in one path
 * segment. A link does not: it has slashes, a query string of its own, and
 * often more characters than a host name ever will. The shell's routes are kept
 * as they are, and the one canonical form is the whole URL encoded into a
 * single segment. Everything a person is likely to type instead — the link
 * pasted straight after the slash, its query string included — is put back
 * together here and redirected to that form, so a link to a report is always
 * the same link.
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { createService, localizeReport } from '@sharapov/service-kit';

import { scan, STAGES } from './scan.js';
import { parseInput, allowedPorts, MAX_URL_LENGTH } from './target.js';
import { PROFILE_IDS, DEFAULT_PROFILE, profileId, cookiesEnabled } from './profiles.js';
import { MAX_REDIRECTS, REDIRECT_STATUSES } from './follow.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

/* A redirect is the kind of thing somebody fixes and checks again within the
   minute, so a report is kept for two minutes rather than the family's ten. */
process.env.CACHE_TTL_MS ??= String(2 * 60 * 1000);

/**
 * Query parameters that belong to this service. Everything else in a query
 * string belongs to the link being checked. A link that itself uses one of
 * these names has to be sent encoded — the one ambiguity this layout cannot
 * avoid, and the README says so.
 */
const OWN_PARAMS = new Set(['output', 'format', 'lang', 'refresh', 'download', 'ua', 'cookies']);

/** Paths the shell or the static mount answer, never a link to check. */
const RESERVED = new Set(['api', 'static', 'healthz', 'robots.txt', 'sitemap.xml', 'favicon.ico']);

/** Splits a raw query string without decoding it, so the link's own survives byte for byte. */
function splitQuery(search) {
  const own = [];
  const foreign = [];
  for (const part of String(search || '').split('&')) {
    if (!part) continue;
    const name = decodeURIComponentSafe(part.split('=')[0]).toLowerCase();
    (OWN_PARAMS.has(name) ? own : foreign).push(part);
  }
  return { own: own.join('&'), foreign: foreign.join('&') };
}

function decodeURIComponentSafe(value) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function parse(raw, req) {
  if (profileId(req?.query?.ua) === null) return { error: 'unknown-client' };
  return parseInput(raw);
}

/** Only the host goes into a log line: the rest of a link can carry a token. */
function logTarget(raw) {
  const parsed = parseInput(String(raw ?? ''));
  return parsed.error ? '(unparsed)' : new URL(parsed.url).host;
}

const service = await createService({
  slug: 'myredirectchecker',
  name: 'Redirect Check',
  domain: 'myredirectchecker.sharapov.biz',
  port: 3030,
  root: ROOT,
  stages: STAGES,

  /* An encoded URL: every byte of the link can become three characters. */
  maxParamLength: MAX_URL_LENGTH * 3,
  logTarget,

  parse,
  pathFor: target => target.url,
  cacheKey: target => target.url,
  /* The same link asked as a phone, as a crawler, without cookies or in
     another language can go somewhere else entirely, so none of those share
     a cache entry. */
  cacheSuffix: (query, lang) => [
    profileId(query?.ua) || DEFAULT_PROFILE,
    cookiesEnabled(query?.cookies) ? 'cookies' : 'no-cookies',
    lang,
  ].join('|'),
  run: (target, options) => scan(target, options),

  errors: ['url-too-long', 'scheme-not-supported', 'credentials-not-allowed', 'unknown-client'],
  allowedPorts: () => allowedPorts() || new Set(),

  examples: ['developer.mozilla.org', 'http://github.com', 'sharapov.biz'],

  usage: {
    usage: {
      typed: 'GET /example.com/some/page?x=1  — a link as is; redirected to the encoded form',
      client: `add ?ua=${PROFILE_IDS.join('|')} to ask as another client (default ${DEFAULT_PROFILE})`,
      cookies: 'add ?cookies=false to forget cookies between hops, the way a crawler does',
    },
    checks: [
      'every hop: status, Location as sent and as resolved, the address, the network it came through',
      'DNS, connect, TLS and first-byte time for each hop, and what the redirects cost together',
      'the certificate on every https hop, and whether a browser would stop there',
      'cookies set along the way, kept and sent on as a browser would, and refused where a browser would',
      'Refresh headers, meta refresh and script redirects, not only 3xx',
      'loops, chains too long for a browser or for Googlebot, https downgrades, lost query and path',
    ],
    limits: {
      maxRedirects: MAX_REDIRECTS,
      maxUrlLength: MAX_URL_LENGTH,
      ports: [...(allowedPorts() || [])].sort((a, b) => a - b),
    },
  },

  health: () => ({
    profiles: PROFILE_IDS,
    maxRedirects: MAX_REDIRECTS,
    ports: allowedPorts() ? [...allowedPorts()].sort((a, b) => a - b) : 'any',
  }),

  localize: (report, lang) => localizeReport(report, service.i18n, lang, (out, language) => {
    const { tCode } = service.i18n;
    const label = (prefix, code) => (code ? tCode(language, prefix, code) : undefined);

    if (out.client) out.client.profileLabel = label('ua', out.client.profile);
    if (out.summary) out.summary.outcomeLabel = label('out', out.summary.outcome);

    for (const hop of out.hops || []) {
      if (hop.redirect) hop.redirect.typeLabel = label('rt', hop.redirect.type);
      if (hop.via) hop.viaLabel = label('rt', hop.via);
      if (hop.error) hop.errorLabel = label('err', hop.error);
      if (hop.refused) hop.refusedLabel = label('err', hop.refused);
      if (REDIRECT_STATUSES.has(hop.status)) hop.statusMeaning = label('sc', hop.status);
      for (const cookie of hop.cookiesSet || []) {
        if (cookie.rejected) cookie.rejectedLabel = label('ck', cookie.rejected);
      }
    }

    if (Array.isArray(out.incomplete)) {
      out.incompleteLabels = out.incomplete.map(code => tCode(language, 'inc', code));
    }
  }),
});

/**
 * Where a link typed into the path should go: the same route, the link encoded
 * into one segment, the service's own options kept beside it.
 *
 * @returns {string|null} null when the path is not a link at all
 */
function canonicalLocation(prefix, rawPath, search) {
  const { own, foreign } = splitQuery(search);
  const typed = rawPath + (foreign ? (rawPath.includes('?') ? '&' : '?') + foreign : '');
  const target = parseInput(typed);
  /* Junk — `/wp-login.php`, `/.env` — is not a link and gets the ordinary
     404. Anything else goes to the canonical form, which reports its own
     error properly if the link is refused. */
  if (target.error === 'invalid-host') return null;
  const url = target.error ? typed : target.url;
  return `${prefix}/${encodeURIComponent(url)}${own ? `?${own}` : ''}`;
}

const notFound = reply => reply.code(404).send({ statusCode: 404, error: 'Not Found', message: 'Route not found.' });

/* A link typed straight into the path: more than one segment. */
for (const prefix of ['', '/api', '/api/stream']) {
  service.app.get(`${prefix}/*`, { config: { rateLimit: { max: 60, timeWindow: '1 minute' } } },
    async (req, reply) => {
      const [pathPart, search = ''] = req.raw.url.split(/\?(.*)/s);
      const rawPath = pathPart.slice(prefix.length + 1);
      if (RESERVED.has(rawPath.split('/')[0].toLowerCase())) return notFound(reply);
      /* The path is taken as it arrived. Its escapes are the link's own —
         `%2F` inside a name is not a separator — and new URL() keeps them. */
      const location = canonicalLocation(prefix, rawPath, search);
      return location ? reply.redirect(location, 301) : notFound(reply);
    });
}

/*
 * A single segment with a query string of its own — `/example.com?utm_source=x`.
 * The shell's route would take the segment and drop the query, and the check
 * would quietly run on a different link from the one asked about. So the query
 * is folded into the link first.
 */
service.app.addHook('onRequest', async (req, reply) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') return;
  const [pathPart, search = ''] = req.raw.url.split(/\?(.*)/s);
  if (!search) return;
  const match = /^(\/api\/stream|\/api)?\/([^/]+)$/.exec(pathPart);
  if (!match || RESERVED.has(match[2].toLowerCase())) return;
  if (!splitQuery(search).foreign) return;
  const location = canonicalLocation(match[1] || '', decodeURIComponentSafe(match[2]), search);
  if (location) return reply.redirect(location, 301);
});

await service.start();

export { service };
