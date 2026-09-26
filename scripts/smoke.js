/**
 * Smoke test: boots the service and exercises it end to end.
 *
 * A redirect checker is only interesting pointed at redirects, and CI must not
 * go out to the internet to find some. So this starts a small site of its own
 * on 127.0.0.1 — a chain with a permanent hop, a cookie, a temporary hop, a
 * meta refresh and a lost tracking parameter — and a service allowed to reach
 * it. A second service, with the private-address guard on as it is in
 * production, checks that the same kind of address is refused.
 */
import http from 'node:http';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const PORT = 3403;
const GUARDED_PORT = 3404;
const base = `http://127.0.0.1:${PORT}`;
const guarded = `http://127.0.0.1:${GUARDED_PORT}`;

/* ---------------- the site being checked ---------------- */

const site = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://site');
  switch (url.pathname) {
    case '/promo':
      res.writeHead(301, { location: '/go' + url.search, 'cf-ray': '8f00000000000000-AMS', server: 'cloudflare' });
      return res.end();
    case '/go':
      res.writeHead(302, { location: '/landing', 'set-cookie': 'sid=1; Path=/; HttpOnly' });
      return res.end();
    case '/landing':
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end('<meta http-equiv="refresh" content="0; url=/final"><title>…</title>');
    case '/final':
      res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
      return res.end('<title>Arrived</title><p>Welcome.</p>');
    default:
      res.writeHead(404, { 'content-type': 'text/html' });
      return res.end('<title>Not found</title>');
  }
});
await new Promise(resolve => site.listen(0, '127.0.0.1', resolve));
const SITE = `http://127.0.0.1:${site.address().port}`;
const CHAIN = `${SITE}/promo?utm_source=newsletter&utm_medium=email`;
const encoded = value => encodeURIComponent(value);

/* ---------------- the service ---------------- */

function boot(port, extra) {
  const child = spawn(process.execPath, ['server/index.js'], {
    cwd: root,
    env: {
      ...process.env,
      PORT: String(port),
      HOSTNAME: '127.0.0.1',
      TRUST_PROXY: 'false',
      LOG_LEVEL: 'warn',
      PROBE_INTERVAL_MS: '0',
      SCAN_TIMEOUT_MS: '15000',
      RATE_SCAN_MAX: '200',
      ...extra,
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  child.output = '';
  child.stdout.on('data', chunk => { child.output += chunk; });
  child.stderr.on('data', chunk => { child.output += chunk; });
  return child;
}

/* The one allowed to reach the local site: a test server is a private address. */
const server = boot(PORT, { ALLOW_PRIVATE_TARGETS: 'true', ALLOWED_PORTS: 'any' });
/* And one as it runs in production. */
const production = boot(GUARDED_PORT, {});

const failures = [];
let checks = 0;

function check(name, condition, detail) {
  checks++;
  if (condition) return;
  failures.push(detail ? `${name} — ${detail}` : name);
}

async function waitFor(origin, child, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const response = await fetch(`${origin}/healthz`);
      if (response.ok) return;
    } catch { /* not up yet */ }
    await new Promise(resolve => setTimeout(resolve, 250));
  }
  throw new Error(`server never answered /healthz\n${child.output}`);
}

const asCurl = { 'user-agent': 'curl/8.7.1' };
const asBrowser = { accept: 'text/html', 'user-agent': 'Mozilla/5.0' };

async function run() {
  await waitFor(base, server);
  await waitFor(guarded, production);

  /* ---------------- service routes ---------------- */
  const health = await (await fetch(`${base}/healthz`)).json();
  check('healthz: status', health.status === 'ok');
  check('healthz: names itself', health.service === 'myredirectchecker');
  check('healthz: twelve languages', health.languages?.length === 12, `got ${health.languages?.length}`);
  check('healthz: lists the clients', health.profiles?.includes('googlebot'));
  const productionHealth = await (await fetch(`${guarded}/healthz`)).json();
  check('healthz: production ports are a short list',
    JSON.stringify(productionHealth.ports) === JSON.stringify([80, 443, 8080, 8443]),
    JSON.stringify(productionHealth.ports));

  const robots = await fetch(`${base}/robots.txt`);
  check('robots.txt', robots.ok && (await robots.text()).includes('Sitemap:'));
  check('sitemap.xml', (await fetch(`${base}/sitemap.xml`)).ok);
  const favicon = await fetch(`${base}/favicon.ico`);
  check('favicon.ico: is an icon', (favicon.headers.get('content-type') || '').includes('icon'));
  check('static: icon', (await fetch(`${base}/static/icon.svg`)).ok);
  check('static: manifest', (await fetch(`${base}/static/site.webmanifest`)).ok);
  check('static: social image', (await fetch(`${base}/static/og-image.png`)).ok);

  /* ---------------- the page ---------------- */
  const page = await fetch(`${base}/${encoded(CHAIN)}`, { headers: asBrowser });
  const html = await page.text();
  check('html: status', page.status === 200, `status ${page.status}`);
  check('html: links app.js', html.includes('/static/app.js'));
  check('html: links the shared dictionary first',
    html.indexOf('/static/kit/i18n-common.js') > 0 &&
    html.indexOf('/static/kit/i18n-common.js') < html.indexOf('/static/i18n.js'));
  check('html: no placeholders left',
    !/%(ORIGIN|URL|ROBOTS|LANG|DIR|TITLE|DESCRIPTION|LOCALE|SERVICES|ANALYTICS)%/.test(html),
    (html.match(/%[A-Z]+%/) || [])[0]);
  check('html: canonical is the encoded link',
    html.includes(`<link rel="canonical" href="${base}/${encoded(CHAIN)}"`));
  check('html: report pages are not indexed', html.includes('content="noindex, follow"'));
  check('html: family footer marks this service',
    html.includes('<span class="svc current" aria-current="page">Redirect Check</span>'));
  check('html: siblings are linked', html.includes('https://myheaders.sharapov.biz/'));
  const policy = page.headers.get('content-security-policy') || '';
  check('html: a closed policy', policy.includes("script-src 'self'") && !policy.includes('unsafe-inline'), policy);

  const russian = await (await fetch(`${base}/`, {
    headers: { ...asBrowser, 'accept-language': 'ru-RU,ru;q=0.9' },
  })).text();
  check('html: honours accept-language', russian.includes('<html lang="ru"'));
  check('html: translated title', /<title>Проверка редиректов/.test(russian), russian.match(/<title>[^<]*/)?.[0]);
  const arabic = await (await fetch(`${base}/`, { headers: { ...asBrowser, 'accept-language': 'ar' } })).text();
  check('html: right-to-left for arabic', arabic.includes('<html lang="ar" dir="rtl"'));
  check('html: home page is indexed', arabic.includes('content="index, follow"'));

  /* ---------------- console clients ---------------- */
  const usage = await (await fetch(`${base}/`, { headers: asCurl })).json();
  check('usage: describes typed links', typeof usage.usage?.typed === 'string');
  check('usage: names the clients', usage.usage?.client?.includes('googlebot'));
  check('usage: lists the family, itself included',
    usage.family?.some(entry => entry.slug === 'myredirectchecker') &&
    usage.family?.some(entry => entry.slug === 'myheaders'));

  /* ---------------- a link typed as is ---------------- */
  const typed = await fetch(`${base}/example.com/some/page?utm_source=x&lang=ru`, { headers: asCurl, redirect: 'manual' });
  check('typed: redirected', typed.status === 301, `status ${typed.status}`);
  check('typed: to the encoded form, own options kept apart',
    typed.headers.get('location') === `/${encoded('http://example.com/some/page?utm_source=x')}?lang=ru`,
    typed.headers.get('location'));
  const merged = await fetch(`${base}/https:/example.com/a`, { headers: asCurl, redirect: 'manual' });
  check('typed: merged slashes are repaired', merged.headers.get('location') === `/${encoded('https://example.com/a')}`,
    merged.headers.get('location'));
  const folded = await fetch(`${base}/api/example.com?utm_source=x`, { headers: asCurl, redirect: 'manual' });
  check('typed: a query on one segment is folded into the link',
    folded.headers.get('location') === `/api/${encoded('http://example.com/?utm_source=x')}`,
    folded.headers.get('location'));
  check('typed: junk is a 404', (await fetch(`${base}/wp-admin/setup-config.php`, { headers: asCurl })).status === 404);

  /* ---------------- a report ---------------- */
  const response = await fetch(`${base}/api/${encoded(CHAIN)}?lang=ru`, { headers: asCurl });
  const report = await response.json();
  check('report: status', response.status === 200, `status ${response.status}: ${JSON.stringify(report).slice(0, 200)}`);
  check('report: arrives', report.summary?.outcome === 'arrived', report.summary?.outcome);
  check('report: every hop', report.hops?.length === 4, `hops ${report.hops?.length}`);
  check('report: the kinds of redirect',
    JSON.stringify(report.summary?.types) === JSON.stringify({ http: 2, 'meta-refresh': 1 }),
    JSON.stringify(report.summary?.types));
  check('report: the edge is named', report.hops?.[0]?.edgeName === 'Cloudflare');
  check('report: the cookie is sent on', report.hops?.[2]?.cookiesSent?.includes('sid'));
  check('report: no cookie value leaves the service', !JSON.stringify(report).includes('sid=1'));
  check('report: labels in the language asked for', report.summary?.outcomeLabel === 'доходит',
    report.summary?.outcomeLabel);
  const flags = (report.flags || []).map(flag => flag.id);
  check('report: lost tracking parameters are found', flags.includes('query-lost'), flags.join(','));
  check('report: the meta refresh is found', flags.includes('meta-refresh'), flags.join(','));
  check('report: findings are labelled', report.flags?.every(flag => flag.name && flag.description));
  check('report: timings on every hop', report.hops?.every(hop => typeof hop.timings?.total === 'number'));

  const yaml = await fetch(`${base}/api/${encoded(CHAIN)}?output=yaml`, { headers: asCurl });
  check('yaml: content type', (yaml.headers.get('content-type') || '').includes('yaml'));
  check('yaml: carries the hops', (await yaml.text()).includes('hops:'));

  const crawler = await (await fetch(`${base}/api/${encoded(CHAIN)}?ua=googlebot&cookies=false`, { headers: asCurl })).json();
  check('options: a crawler sends no language', crawler.client?.acceptLanguage === null);
  check('options: cookies can be forgotten', crawler.client?.cookies === false);

  /* A link far longer than a host name still reaches the route. */
  const long = `${SITE}/final?${'utm_campaign=spring_sale_2026&'.repeat(15)}x=1`;
  const longAnswer = await fetch(`${base}/api/${encoded(long)}`, { headers: asCurl });
  check('long links: routed', longAnswer.status === 200, `status ${longAnswer.status}`);

  /* ---------------- the stream ---------------- */
  const stream = await fetch(`${base}/api/stream/${encoded(CHAIN)}?refresh=1`);
  const events = await stream.text();
  check('stream: content type', (stream.headers.get('content-type') || '').includes('text/event-stream'));
  check('stream: hops arrive as they are followed', (events.match(/event: progress\ndata: {[^\n]*"hop":/g) || []).length === 4);
  check('stream: ends with the report', events.includes('event: report'));

  /* ---------------- refusals ---------------- */
  const scheme = await fetch(`${base}/api/${encoded('mailto:someone@example.com')}`, { headers: asCurl });
  check('refused: not a web address', scheme.status === 400 && (await scheme.json()).error === 'scheme-not-supported');
  const client = await fetch(`${base}/api/example.com?ua=nokia`, { headers: asCurl });
  check('refused: an unknown client', client.status === 400 && (await client.json()).error === 'unknown-client');
  const credentials = await fetch(`${base}/api/${encoded('http://user:pw@example.com/')}`, { headers: asCurl });
  check('refused: credentials in the link', (await credentials.json()).error === 'credentials-not-allowed');

  for (const inside of ['http://169.254.169.254/latest/meta-data/', 'http://127.0.0.1:6379/', 'http://[::1]/']) {
    const refused = await fetch(`${guarded}/api/${encoded(inside)}`, { headers: asCurl });
    const body = await refused.json();
    check(`refused in production: ${inside}`, refused.status === 400 && body.error === 'private-address',
      `${refused.status} ${body.error}`);
  }
  const port = await fetch(`${guarded}/api/${encoded('http://example.com:22/')}`, { headers: asCurl });
  const portBody = await port.json();
  check('refused in production: a port outside the list',
    portBody.error === 'port-not-allowed' && JSON.stringify(portBody.allowedPorts) === JSON.stringify([80, 443, 8080, 8443]),
    JSON.stringify(portBody));
}

try {
  await run();
} catch (err) {
  failures.push(`crashed: ${err.stack || err.message}`);
} finally {
  server.kill();
  production.kill();
  site.closeAllConnections?.();
  site.close();
}

if (failures.length) {
  console.error(`Smoke test: ${failures.length} of ${checks} checks failed:`);
  failures.forEach(failure => console.error('  · ' + failure));
  if (server.output.trim()) console.error('\nserver output:\n' + server.output);
  process.exit(1);
}
console.log(`Smoke test passed: ${checks} checks.`);
