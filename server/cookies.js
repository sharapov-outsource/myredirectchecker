/**
 * A cookie jar that lives for one check.
 *
 * It is here because of the most common false alarm a redirect checker raises.
 * A site that wants to know whether the visitor accepts cookies sets one and
 * redirects back to the same address; the second request carries the cookie
 * and the page loads. A checker that forgets cookies between hops sends the
 * same request twice, gets the same redirect twice, and reports a loop that no
 * browser has ever seen.
 *
 * So cookies are stored and sent the way RFC 6265 describes: domain and path
 * matching, host-only cookies, Secure only over https, expiry, and the
 * `__Host-` and `__Secure-` prefixes. A cookie a browser would refuse is refused
 * here too, with the reason, because a login that "works in curl" and silently
 * fails in a browser usually comes down to exactly that.
 *
 * What is deliberately left out is SameSite on the sending side: deciding
 * whether a hop in the middle of a chain is same-site needs the public suffix
 * list, and a guess would be wrong in both directions. Every stored cookie is
 * sent where its domain and path match.
 *
 * Values never leave this file. A cookie set during a redirect is quite often
 * a session, and a report is something people paste into chats.
 */

import net from 'node:net';

import { bareHost } from './target.js';

const MAX_COOKIE = 4096;

/** One Set-Cookie line, taken apart as in RFC 6265 §5.2. Later attributes win. */
export function parseSetCookie(line) {
  const parts = String(line ?? '').split(';');
  const pair = parts.shift() || '';
  const eq = pair.indexOf('=');
  const name = (eq === -1 ? '' : pair.slice(0, eq)).trim();
  const value = (eq === -1 ? pair : pair.slice(eq + 1)).trim();

  const attributes = {};
  for (const part of parts) {
    const at = part.indexOf('=');
    const key = (at === -1 ? part : part.slice(0, at)).trim().toLowerCase();
    const raw = (at === -1 ? '' : part.slice(at + 1)).trim();
    switch (key) {
      case 'domain':
        if (raw) attributes.domain = raw.replace(/^\./, '').replace(/\.$/, '').toLowerCase();
        break;
      case 'path':
        // A path that does not start with a slash is ignored, not an error.
        attributes.path = raw.startsWith('/') ? raw : undefined;
        break;
      case 'expires': {
        const time = Date.parse(raw);
        if (!Number.isNaN(time)) attributes.expires = time;
        break;
      }
      case 'max-age':
        if (/^-?\d+$/.test(raw)) attributes.maxAge = Number(raw);
        break;
      case 'secure':
        attributes.secure = true;
        break;
      case 'httponly':
        attributes.httpOnly = true;
        break;
      case 'samesite':
        attributes.sameSite = raw.toLowerCase() || 'empty';
        break;
      case 'partitioned':
        attributes.partitioned = true;
        break;
      default:
        break;
    }
  }
  return { name, value, attributes, size: name.length + value.length };
}

const clean = host => bareHost(host).replace(/\.$/, '').toLowerCase();

/**
 * A Set-Cookie line with its value taken out and its attributes left in, for
 * the raw header list a report carries. The value is the one part of the line
 * that is nobody's business; the attributes are the part worth reading.
 */
export function redactSetCookie(line) {
  const text = String(line ?? '');
  const end = text.indexOf(';');
  const pair = end === -1 ? text : text.slice(0, end);
  const eq = pair.indexOf('=');
  const name = eq === -1 ? '' : pair.slice(0, eq).trim();
  return `${name}=…${end === -1 ? '' : text.slice(end)}`;
}

/** RFC 6265 §5.1.3. */
export function domainMatch(host, domain) {
  if (host === domain) return true;
  return !net.isIP(host) && host.endsWith('.' + domain);
}

/** RFC 6265 §5.1.4: the directory of the request path. */
export function defaultPath(pathname) {
  if (!pathname || !pathname.startsWith('/')) return '/';
  const last = pathname.lastIndexOf('/');
  return last <= 0 ? '/' : pathname.slice(0, last);
}

/** RFC 6265 §5.1.4. */
export function pathMatch(requestPath, cookiePath) {
  if (requestPath === cookiePath) return true;
  if (!requestPath.startsWith(cookiePath)) return false;
  return cookiePath.endsWith('/') || requestPath[cookiePath.length] === '/';
}

/**
 * Would a browser keep this cookie, and if not, why not.
 * @returns {{cookie: object}|{reason: string}}
 */
function judge(url, parsed, now) {
  const host = clean(url.hostname);
  const secureOrigin = url.protocol === 'https:';
  const { name, attributes } = parsed;

  if (parsed.size > MAX_COOKIE) return { reason: 'too-large' };
  if (!name && !parsed.value) return { reason: 'empty' };

  let domain = host;
  let hostOnly = true;
  if (attributes.domain) {
    if (!domainMatch(host, attributes.domain)) return { reason: 'domain-mismatch' };
    /* Without the public suffix list only the unmistakable case can be caught:
       a single label such as `com`, which every browser refuses. */
    if (!attributes.domain.includes('.') && attributes.domain !== host) return { reason: 'public-suffix' };
    domain = attributes.domain;
    hostOnly = false;
  }

  if (attributes.secure && !secureOrigin) return { reason: 'secure-over-http' };
  if (/^__secure-/i.test(name) && !(attributes.secure && secureOrigin)) return { reason: 'prefix-secure' };
  if (/^__host-/i.test(name) &&
    !(attributes.secure && secureOrigin && !attributes.domain && attributes.path === '/')) {
    return { reason: 'prefix-host' };
  }
  if (attributes.sameSite === 'none' && !attributes.secure) return { reason: 'samesite-none-insecure' };

  let expires = null;
  if (attributes.maxAge !== undefined) {
    expires = attributes.maxAge <= 0 ? -Infinity : now + attributes.maxAge * 1000;
  } else if (attributes.expires !== undefined) {
    expires = attributes.expires;
  }

  return {
    cookie: {
      name,
      value: parsed.value,
      domain,
      path: attributes.path || defaultPath(url.pathname),
      hostOnly,
      secure: Boolean(attributes.secure),
      httpOnly: Boolean(attributes.httpOnly),
      sameSite: attributes.sameSite || null,
      expires,
    },
  };
}

export function createJar() {
  const cookies = new Map();
  let sequence = 0;

  /**
   * Stores what a response set. Returns one record per line, value omitted.
   * @param {string[]} lines  every Set-Cookie value, in order
   * @param {string} urlString  the URL that answered
   */
  function store(lines, urlString, now = Date.now()) {
    const url = new URL(urlString);
    return lines.map(line => {
      const parsed = parseSetCookie(line);
      const { attributes } = parsed;
      const record = {
        name: parsed.name,
        secure: Boolean(attributes.secure),
        httpOnly: Boolean(attributes.httpOnly),
        sameSite: attributes.sameSite || undefined,
        size: parsed.size,
      };

      const verdict = judge(url, parsed, now);
      if (verdict.reason) return { ...record, domain: attributes.domain, rejected: verdict.reason };

      const cookie = verdict.cookie;
      const key = [cookie.name, cookie.domain, cookie.path].join('\n');
      const placed = { ...record, domain: cookie.domain, path: cookie.path, hostOnly: cookie.hostOnly };

      if (cookie.expires !== null && cookie.expires <= now) {
        cookies.delete(key);
        return { ...placed, deleted: true };
      }

      const previous = cookies.get(key);
      cookies.set(key, { ...cookie, created: previous ? previous.created : sequence++ });
      return {
        ...placed,
        expires: cookie.expires === null ? 'session' : new Date(cookie.expires).toISOString(),
      };
    });
  }

  /** What a browser would send to this URL: the header, and the names in it. */
  function forUrl(urlString, now = Date.now()) {
    const url = new URL(urlString);
    const host = clean(url.hostname);
    const secure = url.protocol === 'https:';
    const path = url.pathname || '/';

    const matching = [...cookies.values()]
      .filter(cookie => cookie.expires === null || cookie.expires > now)
      .filter(cookie => (cookie.hostOnly ? host === cookie.domain : domainMatch(host, cookie.domain)))
      .filter(cookie => pathMatch(path, cookie.path))
      .filter(cookie => !cookie.secure || secure)
      .sort((a, b) => b.path.length - a.path.length || a.created - b.created);

    return {
      header: matching.map(cookie => (cookie.name ? `${cookie.name}=${cookie.value}` : cookie.value)).join('; '),
      names: matching.map(cookie => cookie.name),
    };
  }

  return {
    store,
    forUrl,
    get size() { return cookies.size; },
  };
}
