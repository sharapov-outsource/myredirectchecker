/**
 * The reasoning, tested without a network.
 *
 * Everything here works on strings and plain objects: what was typed, what a
 * refresh tag says, what a Set-Cookie line allows, what a chain of hops means.
 * The parts that open sockets are exercised against a local server in
 * follow.test.js, and the whole service in scripts/smoke.js.
 */

import test from 'node:test';
import assert from 'node:assert/strict';

import { parseInput, urlProblem, siteOf, displayHost } from '../server/target.js';
import { parseRefresh, scriptTargets, analysePage, linkCanonical, noindex, decodeEntities } from '../server/page.js';
import { parseSetCookie, createJar, defaultPath, pathMatch, redactSetCookie } from '../server/cookies.js';
import { findings } from '../server/findings.js';
import { edgeOf, botChallenge } from '../server/edge.js';
import { changes } from '../server/follow.js';
import { profileId, cookiesEnabled, profileHeaders } from '../server/profiles.js';
import { asUtf8, headerList, rawValues, errorCode } from '../server/http.js';

/* ------------------------------------------------------------------ *
 * What was typed
 * ------------------------------------------------------------------ */

test('a bare name starts on plain http, so the upgrade is part of the chain', () => {
  assert.equal(parseInput('example.com').url, 'http://example.com/');
  assert.equal(parseInput('  example.com/Page?q=1#top ').url, 'http://example.com/Page?q=1#top');
  assert.equal(parseInput('https://example.com').url, 'https://example.com/');
});

test('a scheme whose slashes a proxy merged is put back together', () => {
  assert.equal(parseInput('https:/example.com/a').url, 'https://example.com/a');
  assert.equal(parseInput('http:/example.com').url, 'http://example.com/');
});

test('a port without a scheme is a port, not a scheme', () => {
  assert.equal(parseInput('example.com:8080/x').url, 'http://example.com:8080/x');
});

test('an international name is accepted in its punycode form', () => {
  assert.equal(parseInput('пример.рф').url, 'http://xn--e1afmkfd.xn--p1ai/');
  assert.equal(displayHost('xn--e1afmkfd.xn--p1ai'), 'пример.рф');
  assert.equal(displayHost('example.com'), undefined);
});

test('what is not a web address is refused with a reason', () => {
  assert.equal(parseInput('').error, 'invalid-host');
  assert.equal(parseInput('mailto:someone@example.com').error, 'scheme-not-supported');
  assert.equal(parseInput('javascript:alert(1)').error, 'scheme-not-supported');
  assert.equal(parseInput('ftp://example.com/file').error, 'scheme-not-supported');
  assert.equal(parseInput('tg://resolve?domain=x').error, 'scheme-not-supported');
  assert.equal(parseInput('http://user:secret@example.com/').error, 'credentials-not-allowed');
  assert.equal(parseInput('http://localhost/').error, 'invalid-host');
  assert.equal(parseInput('http://intranet/').error, 'invalid-host');
  assert.equal(parseInput('example.com/' + 'a'.repeat(3000)).error, 'url-too-long');
  assert.equal(parseInput('exa mple.com').error, 'invalid-host');
});

test('a private address is refused however it is spelled', () => {
  for (const raw of [
    'http://127.0.0.1/', 'http://10.0.0.1/', 'http://169.254.169.254/latest/meta-data/',
    'http://[::1]/', 'http://[::ffff:10.0.0.1]/', 'http://0x7f000001/', 'http://2130706433/',
    'http://017700000001/', 'http://192.168.0.1:8080/',
  ]) {
    assert.equal(parseInput(raw).error, 'private-address', raw);
  }
  assert.equal(parseInput('http://8.8.8.8/').url, 'http://8.8.8.8/');
});

test('only a short list of ports is spoken to', () => {
  assert.equal(parseInput('example.com:22').error, 'port-not-allowed');
  assert.equal(parseInput('https://example.com:6379/').error, 'port-not-allowed');
  assert.equal(parseInput('https://example.com:8443/').url, 'https://example.com:8443/');
  assert.equal(urlProblem(new URL('http://example.com:25/')), 'port-not-allowed');
});

test('the site of a host is the host without www', () => {
  assert.equal(siteOf('www.example.com'), 'example.com');
  assert.equal(siteOf('shop.example.com'), 'shop.example.com');
});

test('the client is chosen by name, and an unknown one is not quietly replaced', () => {
  assert.equal(profileId(undefined), 'chrome');
  assert.equal(profileId('GoogleBot'), 'googlebot');
  assert.equal(profileId('nokia'), null);
  assert.equal(cookiesEnabled(undefined), true);
  assert.equal(cookiesEnabled('false'), false);

  const browser = profileHeaders('chrome', 'ru');
  assert.match(browser['accept-language'], /^ru-RU/);
  assert.equal(browser['upgrade-insecure-requests'], '1');
  /* A crawler does not say what language it would like. */
  assert.equal(profileHeaders('googlebot', 'ru')['accept-language'], undefined);
  assert.match(profileHeaders('googlebot', 'en')['user-agent'], /Googlebot\/2\.1/);
});

/* ------------------------------------------------------------------ *
 * Refresh, as the HTML standard parses it
 * ------------------------------------------------------------------ */

test('every spelling of a refresh the standard allows', () => {
  assert.deepEqual(parseRefresh('0; url=/next'), { delay: 0, url: '/next' });
  assert.deepEqual(parseRefresh("0;URL='/next'"), { delay: 0, url: '/next' });
  assert.deepEqual(parseRefresh('0, /next'), { delay: 0, url: '/next' });
  assert.deepEqual(parseRefresh('3 url = "/a b" and the rest'), { delay: 3, url: '/a b' });
  assert.deepEqual(parseRefresh('.5; url=/x'), { delay: 0, url: '/x' });
  assert.deepEqual(parseRefresh('10'), { delay: 10, url: null });
  /* A u that is not the start of "url" is the start of the address. */
  assert.deepEqual(parseRefresh('0; upload/next'), { delay: 0, url: 'upload/next' });
});

test('a refresh that is not one is ignored', () => {
  assert.equal(parseRefresh(''), null);
  assert.equal(parseRefresh('soon'), null);
  assert.equal(parseRefresh('5x; url=/a'), null);
});

/* ------------------------------------------------------------------ *
 * Script redirects, read and never run
 * ------------------------------------------------------------------ */

test('a literal location change is found in every usual form', () => {
  const base = 'https://example.com/dir/page';
  const found = source => scriptTargets(source, base).map(entry => entry.target);

  assert.deepEqual(found('location.href = "/a";'), ['https://example.com/a']);
  assert.deepEqual(found("window.location='https://other.example/'"), ['https://other.example/']);
  assert.deepEqual(found("top.location.href = 'next'"), ['https://example.com/dir/next']);
  assert.deepEqual(found("location.replace('/b')"), ['https://example.com/b']);
  assert.deepEqual(found("document.location.assign(\"/c\")"), ['https://example.com/c']);
  assert.deepEqual(found('location.href = "https:\\/\\/example.com\\/d"'), ['https://example.com/d']);
});

test('what only looks like a redirect is left alone', () => {
  const found = source => scriptTargets(source, 'https://example.com/');
  assert.deepEqual(found("if (location.href == '/c') {}"), []);
  assert.deepEqual(found("location.href = '/search?q=' + query"), []);
  assert.deepEqual(found('location.href = `/u/${id}`'), []);
  assert.deepEqual(found("location.href = '#top'"), []);
  assert.deepEqual(found("location.href = 'javascript:void 0'"), []);
});

test('a page is read for what it says about itself and where it sends people', () => {
  const page = analysePage(`<!doctype html><html><head>
    <title>  Spring &amp; sale  </title>
    <base href="https://cdn.example.net/shop/">
    <link rel="alternate canonical" href="/canonical">
    <meta name="robots" content="noindex, follow">
    <!-- <meta http-equiv="refresh" content="0; url=/commented-out"> -->
    <meta http-equiv="Refresh" content="2; URL=next">
    <noscript><meta http-equiv="refresh" content="0; url=/no-js"></noscript>
    <script type="application/ld+json">{"url": "location.href = '/not-code'"}</script>
  </head><body><p>${'Words. '.repeat(100)}</p></body></html>`, 'https://example.com/page');

  assert.equal(page.title, 'Spring & sale');
  assert.equal(page.base, 'https://cdn.example.net/shop/');
  assert.equal(page.canonical, 'https://cdn.example.net/canonical');
  assert.deepEqual(page.robots, [{ source: 'meta', name: 'robots', content: 'noindex, follow' }]);
  /* Relative to <base>, as the standard says; the commented-out one is ignored. */
  assert.deepEqual(page.refresh, { delay: 2, url: 'next', target: 'https://cdn.example.net/shop/next' });
  assert.equal(page.noscriptRefresh.target, 'https://cdn.example.net/no-js');
  assert.deepEqual(page.scripts, []);
  assert.equal(page.stub, false);
});

test('an empty page with one script target is a stub; a full page is not', () => {
  const stub = analysePage('<p>Redirecting…</p><script>location.replace("/go")</script>', 'https://a.example/');
  assert.equal(stub.stub, true);
  assert.equal(stub.scripts[0].target, 'https://a.example/go');

  const full = analysePage(`<p>${'text '.repeat(200)}</p><script>location.href="/go"</script>`, 'https://a.example/');
  assert.equal(full.stub, false);
  assert.equal(full.scripts.length, 1);
});

test('a canonical address in a Link header is found among the others', () => {
  const values = ['<https://example.com/style.css>; rel=preload, <https://example.com/page>; rel="canonical"'];
  assert.equal(linkCanonical(values, 'https://example.com/x'), 'https://example.com/page');
  assert.equal(linkCanonical(['</a>; rel=next'], 'https://example.com/'), null);
});

test('noindex is recognised in meta and header form', () => {
  assert.equal(noindex('noindex, nofollow'), true);
  assert.equal(noindex('googlebot: noindex'), true);
  assert.equal(noindex('none'), true);
  assert.equal(noindex('index, follow'), false);
  assert.equal(noindex('max-image-preview:large'), false);
  assert.equal(decodeEntities('a&#39;b &#x41; &nbsp;'), "a'b A  ");
});

/* ------------------------------------------------------------------ *
 * Cookies, as a browser keeps them
 * ------------------------------------------------------------------ */

test('a Set-Cookie line is taken apart, later attributes winning', () => {
  const cookie = parseSetCookie('sid=abc; Path=/app; path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=60');
  assert.equal(cookie.name, 'sid');
  assert.equal(cookie.value, 'abc');
  assert.deepEqual(cookie.attributes, { path: '/', secure: true, httpOnly: true, sameSite: 'lax', maxAge: 60 });
});

test('paths match the way RFC 6265 says they do', () => {
  assert.equal(defaultPath('/a/b/c'), '/a/b');
  assert.equal(defaultPath('/a'), '/');
  assert.equal(pathMatch('/app/x', '/app'), true);
  assert.equal(pathMatch('/application', '/app'), false);
  assert.equal(pathMatch('/app', '/app/'), false);
});

test('a cookie goes back only where a browser would send it', () => {
  const jar = createJar();
  jar.store(['host=1; Path=/', 'wide=1; Domain=example.com; Path=/', 'safe=1; Secure; Path=/',
    'deep=1; Path=/account'], 'https://www.example.com/start');

  assert.deepEqual(jar.forUrl('https://www.example.com/account/x').names, ['deep', 'host', 'wide', 'safe']);
  /* A host-only cookie stays on its host; a Domain cookie reaches the rest. */
  assert.deepEqual(jar.forUrl('https://shop.example.com/').names, ['wide']);
  /* Secure never travels over plain http. */
  assert.deepEqual(jar.forUrl('http://www.example.com/').names, ['host', 'wide']);
  assert.equal(jar.forUrl('https://other.example/').header, '');
});

test('the cookies a browser refuses are refused, with the reason', () => {
  const jar = createJar();
  const plain = jar.store([
    'a=1; Domain=other.example',
    'b=1; Domain=com',
    'c=1; Secure',
    '__Secure-e=1',
    'f=1; SameSite=None',
  ], 'http://example.com/');
  assert.deepEqual(plain.map(record => record.rejected), [
    'domain-mismatch', 'public-suffix', 'secure-over-http', 'prefix-secure', 'samesite-none-insecure',
  ]);

  /* The __Host- prefix is judged over https, where Secure is allowed and the
     prefix's own conditions are the only thing left to break. */
  const secure = jar.store([
    '__Host-d=1; Secure; Path=/; Domain=example.com',
    '__Host-e=1; Secure; Path=/app',
    '__host-f=1; Path=/',
    '__Host-ok=1; Secure; Path=/',
  ], 'https://example.com/');
  assert.deepEqual(secure.map(record => record.rejected), ['prefix-host', 'prefix-host', 'prefix-host', undefined]);
  assert.equal(jar.size, 1);

  /* Values are never part of a record. */
  assert.ok([...plain, ...secure].every(record => !('value' in record)));
});

test('a Set-Cookie shown in the header list keeps its attributes and loses its value', () => {
  assert.equal(redactSetCookie('sid=s3cr3t; Path=/; HttpOnly'), 'sid=…; Path=/; HttpOnly');
  assert.equal(redactSetCookie('token=abc'), 'token=…');
  assert.equal(redactSetCookie('bare'), '=…');
});

test('a cookie with a past expiry deletes the one it names', () => {
  const jar = createJar();
  jar.store(['gate=1; Path=/'], 'https://example.com/');
  assert.equal(jar.size, 1);
  const [record] = jar.store(['gate=; Path=/; Max-Age=0'], 'https://example.com/');
  assert.equal(record.deleted, true);
  assert.equal(jar.size, 0);
});

/* ------------------------------------------------------------------ *
 * Headers and connections
 * ------------------------------------------------------------------ */

test('a Location written in UTF-8 is read back as UTF-8', () => {
  const wire = Buffer.from('/поиск?q=ёж', 'utf8').toString('latin1');
  assert.equal(asUtf8(wire), '/поиск?q=ёж');
  assert.equal(asUtf8('/plain'), '/plain');
  assert.deepEqual(rawValues(['Location', '/a', 'location', '/b', 'Server', 'x'], 'location'), ['/a', '/b']);
  assert.deepEqual(headerList(['X-Long', 'v'.repeat(5000)])[0][1].length, 2049);
});

test('socket errors become the codes the report uses', () => {
  assert.equal(errorCode({ code: 'ENOTFOUND' }), 'dns-failed');
  assert.equal(errorCode({ code: 'ECONNREFUSED' }), 'connection-refused');
  assert.equal(errorCode({ code: 'PRIVATE_ADDRESS' }), 'private-address');
  assert.equal(errorCode({ code: 'HPE_INVALID_CONSTANT' }), 'malformed-response');
  assert.equal(errorCode({ code: 'ERR_SSL_WRONG_VERSION_NUMBER' }), 'tls-failed');
  assert.equal(errorCode({ errors: [{ code: 'ETIMEDOUT' }] }), 'timeout');
  assert.equal(errorCode(new Error('what')), 'connection-failed');
});

test('the network a response came through is named by its own markers only', () => {
  assert.equal(edgeOf({ 'cf-ray': '8f1a-AMS', server: 'cloudflare' }), 'cloudflare');
  assert.equal(edgeOf({ server: 'ddos-guard' }), 'ddos-guard');
  assert.equal(edgeOf({ 'x-amz-cf-id': 'abc' }), 'cloudfront');
  assert.equal(edgeOf({ server: 'nginx' }), null);
  assert.equal(botChallenge(403, { 'cf-mitigated': 'challenge' }), 'cloudflare');
  assert.equal(botChallenge(200, { server: 'cloudflare' }, ''), null);
});

test('which part of the address a hop changed', () => {
  assert.deepEqual(changes('http://example.com/a', 'https://example.com/a'), ['scheme', 'port']);
  assert.deepEqual(changes('https://example.com/a', 'https://www.example.com/a/'), ['host', 'path']);
  assert.deepEqual(changes('https://example.com/a?x=1', 'https://example.com/a#b'), ['query', 'fragment']);
});

/* ------------------------------------------------------------------ *
 * Findings, from a chain described by hand
 * ------------------------------------------------------------------ */

let counter = 0;
/** A hop as follow.js would leave it, with only the fields a finding reads. */
function hop(url, fields = {}) {
  return { index: counter++, url, kind: 'redirect', timings: { total: 50 }, ...fields };
}
const redirectTo = (url, target, status = 301, fields = {}) =>
  hop(url, { status, redirect: { type: 'http', status, target, permanent: status === 301 || status === 308 }, cacheControl: 'max-age=3600', ...fields });
const final = (url, fields = {}) => hop(url, { kind: 'final', status: 200, ...fields });

function chain(...hops) {
  counter = 0;
  return hops.map((entry, index) => ({ ...entry, index }));
}
const ids = list => list.map(flag => flag.id).sort();

test('the right first step raises nothing', () => {
  const hops = chain(
    redirectTo('http://example.com/a', 'https://example.com/a'),
    final('https://example.com/a'),
  );
  assert.deepEqual(ids(findings({ start: hops[0].url, hops, outcome: 'arrived', cookies: true })), []);
});

test('normalising in the wrong order is caught, and only because the upgrade comes', () => {
  const late = chain(
    redirectTo('http://example.com/', 'http://www.example.com/'),
    redirectTo('http://www.example.com/', 'https://www.example.com/'),
    final('https://www.example.com/'),
  );
  assert.ok(ids(findings({ start: late[0].url, hops: late, outcome: 'arrived', cookies: true }))
    .includes('late-https-upgrade'));

  /* A site that never upgrades gets the one finding that says so, not this. */
  const never = chain(
    redirectTo('http://example.com/', 'http://example.com/home'),
    final('http://example.com/home'),
  );
  const found = ids(findings({ start: never[0].url, hops: never, outcome: 'arrived', cookies: true }));
  assert.ok(found.includes('ends-on-http'));
  assert.ok(!found.includes('late-https-upgrade'));
});

test('a downgrade to plain http is caught', () => {
  const hops = chain(
    redirectTo('https://example.com/', 'http://example.com/old'),
    final('http://example.com/old'),
  );
  assert.ok(ids(findings({ start: hops[0].url, hops, outcome: 'arrived', cookies: true })).includes('https-downgrade'));
});

test('a temporary redirect that only tidies the address is caught; one to a login page is not', () => {
  const tidy = chain(
    redirectTo('https://example.com/a', 'https://www.example.com/a/', 302),
    final('https://www.example.com/a/'),
  );
  assert.ok(ids(findings({ start: tidy[0].url, hops: tidy, outcome: 'arrived', cookies: true }))
    .includes('temporary-canonicalization'));

  const login = chain(
    redirectTo('https://example.com/account', 'https://example.com/login?next=/account', 302),
    final('https://example.com/login?next=/account'),
  );
  assert.ok(!ids(findings({ start: login[0].url, hops: login, outcome: 'arrived', cookies: true }))
    .includes('temporary-canonicalization'));
});

test('lost tracking parameters and a lost path are named', () => {
  const hops = chain(
    redirectTo('https://example.com/spring-sale?utm_source=mail&ref=x', 'https://example.com/?ref=x'),
    final('https://example.com/?ref=x'),
  );
  const found = findings({ start: hops[0].url, hops, outcome: 'arrived', cookies: true });
  assert.deepEqual(found.find(flag => flag.id === 'query-lost').params, ['utm_source']);
  assert.equal(found.find(flag => flag.id === 'path-lost').path, '/spring-sale');
});

test('several tidying hops on one site could be one, the first upgrade aside', () => {
  const hops = chain(
    redirectTo('http://example.com/a', 'https://example.com/a'),
    redirectTo('https://example.com/a', 'https://www.example.com/a'),
    redirectTo('https://www.example.com/a', 'https://www.example.com/a/'),
    final('https://www.example.com/a/'),
  );
  const found = findings({ start: hops[0].url, hops, outcome: 'arrived', cookies: true });
  assert.equal(found.find(flag => flag.id === 'could-be-one-redirect').count, 2);
  assert.equal(found.find(flag => flag.id === 'long-chain').count, 3);
});

test('a loop reads differently with cookies and without', () => {
  const hops = chain(
    redirectTo('https://example.com/a', 'https://example.com/b', 302),
    hop('https://example.com/b', { status: 302, redirect: { type: 'http', status: 302, target: 'https://example.com/a', loop: 0 } }),
  );
  assert.deepEqual(ids(findings({ start: hops[0].url, hops, outcome: 'loop', cookies: true })), ['redirect-loop']);
  assert.equal(findings({ start: hops[0].url, hops, outcome: 'loop', cookies: false })[0].id,
    'redirect-loop-without-cookies');
});

test('one finding per problem, with every hop it applies to', () => {
  const hops = chain(
    redirectTo('https://a.example/', 'https://b.example/', 301, { tls: { authorized: false, error: 'CERT_HAS_EXPIRED' } }),
    redirectTo('https://b.example/', 'https://c.example/', 301, { tls: { authorized: false, error: 'CERT_HAS_EXPIRED' } }),
    final('https://c.example/'),
  );
  const found = findings({ start: hops[0].url, hops, outcome: 'arrived', cookies: true })
    .filter(flag => flag.id === 'certificate-invalid');
  assert.equal(found.length, 1);
  assert.deepEqual(found[0].hops, [0, 1]);
});

test('what the final page says about itself is reported', () => {
  const hops = chain(
    redirectTo('https://example.com/a', 'https://example.com/b'),
    final('https://example.com/b', { page: { canonical: 'https://example.com/c' }, noindex: true }),
  );
  const found = ids(findings({ start: hops[0].url, hops, outcome: 'arrived', cookies: true }));
  assert.ok(found.includes('canonical-elsewhere'));
  assert.ok(found.includes('final-noindex'));
});

test('a permanent redirect with no expiry is noted; one with a max-age is not', () => {
  const bare = chain(redirectTo('https://example.com/a', 'https://example.com/b', 301, { cacheControl: null }), final('https://example.com/b'));
  assert.ok(ids(findings({ start: bare[0].url, hops: bare, outcome: 'arrived', cookies: true }))
    .includes('permanent-redirect-cached'));
  const kept = chain(redirectTo('https://example.com/a', 'https://example.com/b'), final('https://example.com/b'));
  assert.ok(!ids(findings({ start: kept[0].url, hops: kept, outcome: 'arrived', cookies: true }))
    .includes('permanent-redirect-cached'));
});
