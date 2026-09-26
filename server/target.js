/**
 * What was typed, turned into a URL this service is willing to fetch — and the
 * same judgement passed again on every hop after it.
 *
 * The second half is the one that matters. A redirect checker is a machine that
 * fetches whatever address a stranger's server tells it to, and the obvious way
 * to abuse one is a public link that answers
 *
 *   Location: http://169.254.169.254/latest/meta-data/
 *
 * The first request was harmless; the second is the cloud metadata endpoint of
 * whatever machine this runs on. So every hop is checked as if it were typed,
 * before a socket is opened for it:
 *
 *   · only http and https are fetched — anything else is reported, not followed;
 *   · a literal address is refused here if it is private;
 *   · a name is refused at resolution time, in http.js, if any address it
 *     resolves to is private — which also covers a name that changes its answer
 *     between two lookups;
 *   · only a short list of ports is spoken to, so a Location header cannot be
 *     used to knock on every port of somebody else's machine.
 */

import net from 'node:net';
import { domainToUnicode } from 'node:url';

import { isPrivateAddress, allowPrivate, portSet } from '@sharapov/service-kit';

/** Browsers cope with longer; nothing legitimate needs it, and it bounds the cache. */
export const MAX_URL_LENGTH = 2048;

/**
 * A host name as DNS allows it. The last label is letters, or an IDN label in
 * its punycode form — `пример.рф` arrives here as `xn--e1afmkfd.xn--p1ai`.
 */
const HOSTNAME = /^(?=.{1,253}$)(?:[a-z0-9_](?:[a-z0-9_-]{0,61}[a-z0-9_])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{1,59})$/;

/** Schemes a person might paste that are not a web address at all. */
const NOT_WEB = new Set([
  'mailto', 'tel', 'sms', 'javascript', 'data', 'file', 'ftp', 'ws', 'wss', 'blob', 'about',
  'tg', 'intent', 'market', 'itms-apps', 'whatsapp', 'viber', 'skype',
]);

/**
 * The ports a hop may go to. `ALLOWED_PORTS=any` lifts the restriction, which
 * is for tests and private deployments — never for a public instance.
 */
export function allowedPorts() {
  if (String(process.env.ALLOWED_PORTS || '').trim().toLowerCase() === 'any') return null;
  return portSet('ALLOWED_PORTS', '80,443,8080,8443');
}

export const bareHost = hostname => String(hostname || '').replace(/^\[|\]$/g, '');

export function effectivePort(url) {
  return Number(url.port || (url.protocol === 'https:' ? 443 : 80));
}

/**
 * Why a URL may not be fetched, or null when it may.
 * @param {URL} url
 */
export function urlProblem(url) {
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return 'scheme-not-supported';
  if (url.username || url.password) return 'credentials-not-allowed';
  if (url.href.length > MAX_URL_LENGTH) return 'url-too-long';

  const host = bareHost(url.hostname).replace(/\.$/, '');
  if (net.isIP(host)) {
    if (!allowPrivate() && isPrivateAddress(host)) return 'private-address';
  } else if (!HOSTNAME.test(host)) {
    return 'invalid-host';
  }

  const ports = allowedPorts();
  if (ports && !ports.has(effectivePort(url))) return 'port-not-allowed';
  return null;
}

/**
 * The scheme of whatever was typed, when it plainly has one. `example.com:8080`
 * has a colon and no scheme, so only a known name, or one followed by `//`,
 * counts.
 */
function schemeOf(value) {
  const match = /^([a-z][a-z0-9+.-]*):/i.exec(value);
  if (!match) return null;
  const scheme = match[1].toLowerCase();
  if (value.slice(match[0].length).startsWith('//') || NOT_WEB.has(scheme)) return scheme;
  return null;
}

/**
 * @param {string} raw  whatever arrived in the path or the search box
 * @returns {{url: string, input: string, host: string}|{error: string}}
 */
export function parseInput(raw) {
  if (typeof raw !== 'string') return { error: 'invalid-host' };
  let value = raw.trim();
  if (!value) return { error: 'invalid-host' };
  if (value.length > MAX_URL_LENGTH) return { error: 'url-too-long' };
  if (/[\u0000-\u001f\u007f]/.test(value)) return { error: 'invalid-host' };

  /* A reverse proxy that merges slashes — nginx does by default — turns
     `/https://example.com` into `/https:/example.com` on the way in. */
  value = value.replace(/^(https?):\/(?!\/)/i, '$1://');

  const scheme = schemeOf(value);
  if (scheme && scheme !== 'http' && scheme !== 'https') return { error: 'scheme-not-supported' };

  /* No scheme: start where a person typing the address would, on plain http,
     so the upgrade to https is part of what gets shown rather than skipped. */
  if (!scheme) value = 'http://' + value.replace(/^\/+/, '');

  let url;
  try {
    url = new URL(value);
  } catch {
    return { error: 'invalid-host' };
  }

  const problem = urlProblem(url);
  if (problem) return { error: problem };

  return { url: url.href, input: raw.trim(), host: url.hostname };
}

/** The host as a person would write it, when that differs from the wire form. */
export function displayHost(hostname) {
  const host = bareHost(hostname);
  if (!host.includes('xn--')) return undefined;
  const unicode = domainToUnicode(host);
  return unicode && unicode !== host ? unicode : undefined;
}

/**
 * The site a host belongs to, for telling "the same site on another name" from
 * "somewhere else". Without the public suffix list this is only `www.` taken
 * off, which is what the canonicalisation findings need: they are about one
 * site's own names, not about registrable domains.
 */
export const siteOf = hostname => bareHost(hostname).replace(/^www\./, '').replace(/\.$/, '');
