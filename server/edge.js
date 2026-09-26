/**
 * Who answered.
 *
 * A redirect can be issued by the application, by the web server in front of
 * it, or by a CDN before the request ever reaches either — and when a redirect
 * is wrong, which of the three to go and fix is the first question. The
 * headers usually say which network the answer came through. They do not say
 * whether that network produced the redirect or passed on the origin's, so the
 * report says "answered through", never "issued by".
 *
 * Only markers that are specific to one provider are used. A header that
 * several of them send proves nothing and is left out.
 */

const has = (headers, name) => headers[name] !== undefined;
const server = headers => String(headers.server || '').toLowerCase();
const via = headers => String(headers.via || '').toLowerCase();

const EDGES = [
  ['cloudflare', h => has(h, 'cf-ray') || server(h) === 'cloudflare'],
  ['cloudfront', h => has(h, 'x-amz-cf-id') || via(h).includes('cloudfront')],
  ['fastly', h => has(h, 'fastly-debug-digest') ||
    (has(h, 'x-timer') && /\bcache-[a-z0-9-]+-[a-z]{3}\d*\b/.test(String(h['x-served-by'] || '')))],
  ['akamai', h => server(h).startsWith('akamaighost') || has(h, 'akamai-grn') || has(h, 'x-akamai-transformed')],
  ['ddos-guard', h => server(h) === 'ddos-guard'],
  ['qrator', h => server(h).startsWith('qrator')],
  ['vercel', h => has(h, 'x-vercel-id') || server(h) === 'vercel'],
  ['netlify', h => has(h, 'x-nf-request-id') || server(h) === 'netlify'],
  ['github-pages', h => server(h) === 'github.com' && has(h, 'x-github-request-id')],
  ['azure-front-door', h => has(h, 'x-azure-ref')],
  ['bunny', h => server(h).startsWith('bunnycdn')],
  ['sucuri', h => has(h, 'x-sucuri-id')],
  ['imperva', h => has(h, 'x-iinfo') || String(h['x-cdn'] || '').toLowerCase() === 'imperva'],
  ['google', h => server(h) === 'gws' || server(h) === 'google frontend' || via(h).includes('1.1 google')],
  ['yandex', h => has(h, 'x-yandex-req-id')],
  ['varnish', h => has(h, 'x-varnish') || via(h).includes('varnish')],
];

/** The network the response came through, when a marker names one. */
export function edgeOf(headers = {}) {
  for (const [id, test] of EDGES) {
    try {
      if (test(headers)) return id;
    } catch { /* a malformed header proves nothing */ }
  }
  return null;
}

export const EDGE_IDS = EDGES.map(([id]) => id);

/** Names as the companies write them. Not translated: they are names. */
export const EDGE_NAMES = {
  cloudflare: 'Cloudflare',
  cloudfront: 'Amazon CloudFront',
  fastly: 'Fastly',
  akamai: 'Akamai',
  'ddos-guard': 'DDoS-Guard',
  qrator: 'Qrator',
  vercel: 'Vercel',
  netlify: 'Netlify',
  'github-pages': 'GitHub Pages',
  'azure-front-door': 'Azure Front Door',
  bunny: 'Bunny CDN',
  sucuri: 'Sucuri',
  imperva: 'Imperva',
  google: 'Google',
  yandex: 'Yandex',
  varnish: 'Varnish',
};

/**
 * A bot check instead of the page. Everything after it is what an automated
 * client is shown, which may not be what a browser that passes the check gets.
 */
export function botChallenge(status, headers = {}, text = '') {
  if (String(headers['cf-mitigated'] || '').toLowerCase() === 'challenge') return 'cloudflare';
  if (status === 403 || status === 503 || status === 429) {
    if (server(headers) === 'cloudflare' && /\/cdn-cgi\/challenge-platform\//.test(text)) return 'cloudflare';
    if (server(headers) === 'ddos-guard' && /ddos-guard/i.test(text)) return 'ddos-guard';
    if (server(headers).startsWith('qrator')) return 'qrator';
  }
  return null;
}
