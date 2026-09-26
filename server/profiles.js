/**
 * Who the check pretends to be.
 *
 * Sites redirect by client far more often than people expect: phones to an
 * `m.` host, bots past a consent wall, curl to a plain-text page, and an
 * outdated browser to an "upgrade" page. So the question "where does this link
 * go" has no single answer, and the report always says which client asked.
 *
 * A browser profile sends what that browser sends on a top-level navigation,
 * including `Upgrade-Insecure-Requests` and the `Sec-Fetch-*` set — some
 * servers only upgrade to https when the first is present, and some firewalls
 * treat a request without the second as a script. A crawler profile sends what
 * the crawler sends and no more.
 *
 * What a profile cannot do is come from where the real client comes from. A
 * site that verifies Googlebot by reverse DNS will see this server's address
 * and may well treat the check as an impostor; the page says so.
 */

import zlib from 'node:zlib';

/* Recent enough to pass an "outdated browser" check. Bump now and then. */
const CHROME = '150.0.0.0';

const NAVIGATE = 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8';

const FETCH_METADATA = {
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'none',
  'sec-fetch-user': '?1',
};

export const PROFILES = {
  chrome: {
    kind: 'browser',
    userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME} Safari/537.36`,
    headers: { accept: NAVIGATE, 'upgrade-insecure-requests': '1', ...FETCH_METADATA },
    language: true,
  },
  iphone: {
    kind: 'browser',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.0 Mobile/15E148 Safari/604.1',
    headers: {
      accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'upgrade-insecure-requests': '1',
      ...FETCH_METADATA,
    },
    language: true,
  },
  android: {
    kind: 'browser',
    userAgent: `Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME} Mobile Safari/537.36`,
    headers: { accept: NAVIGATE, 'upgrade-insecure-requests': '1', ...FETCH_METADATA },
    language: true,
  },
  googlebot: {
    kind: 'crawler',
    userAgent: `Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${CHROME} Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)`,
    headers: { accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8' },
    language: false,
  },
  yandexbot: {
    kind: 'crawler',
    userAgent: 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)',
    headers: { accept: '*/*' },
    language: false,
  },
  bingbot: {
    kind: 'crawler',
    userAgent: 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)',
    headers: { accept: '*/*' },
    language: false,
  },
  curl: {
    kind: 'tool',
    userAgent: 'curl/8.9.1',
    headers: { accept: '*/*' },
    language: false,
    compression: false,
  },
};

export const DEFAULT_PROFILE = 'chrome';

/* zstd is only offered where this Node can undo it (22.15 and later). */
const ENCODINGS = typeof zlib.createZstdDecompress === 'function'
  ? 'gzip, deflate, br, zstd' : 'gzip, deflate, br';
export const PROFILE_IDS = Object.keys(PROFILES);

/** `?ua=` as given, or null when it names no profile. Absent means the default. */
export function profileId(raw) {
  if (raw === undefined || raw === null || raw === '') return DEFAULT_PROFILE;
  const id = String(raw).trim().toLowerCase();
  return PROFILES[id] ? id : null;
}

/** `?cookies=false` turns the jar off; anything else leaves it on. */
export const cookiesEnabled = raw => !['false', '0', 'no', 'off'].includes(String(raw ?? '').toLowerCase());

/**
 * What a browser in this interface language would put in Accept-Language. The
 * check asks in the visitor's language because that is what their own browser
 * does, and a site that redirects `/` to `/ru/` should be seen doing it.
 */
const ACCEPT_LANGUAGE = {
  en: 'en-US,en;q=0.9',
  ru: 'ru-RU,ru;q=0.9,en;q=0.8',
  es: 'es-ES,es;q=0.9,en;q=0.8',
  zh: 'zh-CN,zh;q=0.9,en;q=0.8',
  hi: 'hi-IN,hi;q=0.9,en;q=0.8',
  ar: 'ar,en;q=0.8',
  pt: 'pt-BR,pt;q=0.9,en;q=0.8',
  fr: 'fr-FR,fr;q=0.9,en;q=0.8',
  de: 'de-DE,de;q=0.9,en;q=0.8',
  ja: 'ja,en;q=0.8',
  tr: 'tr-TR,tr;q=0.9,en;q=0.8',
  uk: 'uk-UA,uk;q=0.9,en;q=0.8',
};

export const acceptLanguage = lang => ACCEPT_LANGUAGE[lang] || ACCEPT_LANGUAGE.en;

/** The request headers a profile sends, before cookies. */
export function profileHeaders(id, lang) {
  const profile = PROFILES[id] || PROFILES[DEFAULT_PROFILE];
  const headers = { 'user-agent': profile.userAgent, ...profile.headers };
  if (profile.language) headers['accept-language'] = acceptLanguage(lang);
  /* Asked for the way a browser asks. The body is only read to look for a
     meta refresh or a script redirect, and every one of these is decoded. */
  if (profile.compression !== false) headers['accept-encoding'] = ENCODINGS;
  return headers;
}
