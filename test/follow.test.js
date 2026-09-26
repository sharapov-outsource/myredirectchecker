/**
 * The follower against a server started here.
 *
 * Every scenario is a path on one local server, so nothing leaves the machine.
 * That server lives at 127.0.0.1, which the private-address guard exists to
 * refuse — so the guard is lifted for these tests, and put back on in the ones
 * that are about the guard itself.
 */

import test, { before, after } from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import https from 'node:https';
import zlib from 'node:zlib';
import dns from 'node:dns';
import path from 'node:path';
import { tmpdir } from 'node:os';
import { mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

process.env.ALLOW_PRIVATE_TARGETS = 'true';
process.env.ALLOWED_PORTS = 'any';
process.env.PROBE_INTERVAL_HTTP_MS = '0';

const { follow, MAX_REDIRECTS } = await import('../server/follow.js');
const { request } = await import('../server/http.js');

const requests = [];
let base;
let server;

const html = (res, body, status = 200, headers = {}) => {
  res.writeHead(status, { 'content-type': 'text/html; charset=utf-8', ...headers });
  res.end(body);
};
const redirect = (res, location, status = 302, headers = {}) => {
  res.writeHead(status, { location, ...headers });
  res.end();
};

function route(req, res) {
  const url = new URL(req.url, 'http://local');
  const cookie = req.headers.cookie || '';
  requests.push(url.pathname);

  switch (url.pathname) {
    case '/a': return redirect(res, '/b' + url.search, 301);
    case '/b': return redirect(res, '/c', 302, { 'set-cookie': 'sid=1; Path=/; HttpOnly' });
    case '/c': return html(res, `<title>C</title><p>cookie: ${cookie}</p>`);

    case '/gate':
      if (!cookie.includes('seen=1')) return redirect(res, '/gate', 302, { 'set-cookie': 'seen=1; Path=/' });
      return html(res, '<title>Inside</title>');

    case '/loop-1': return redirect(res, '/loop-2');
    case '/loop-2': return redirect(res, '/loop-1');

    case '/meta': return html(res, '<meta http-equiv="refresh" content="0;URL=\'/c\'">');
    case '/meta-slow': return html(res, `<meta http-equiv="refresh" content="300; url=/c"><p>${'x'.repeat(50)}</p>`);
    case '/stub': return html(res, '<p>One moment…</p><script>window.location.href = "/c";</script>');
    case '/refresh': res.writeHead(200, { 'content-type': 'text/plain', refresh: '1; url=/c' }); return res.end('bye');

    case '/gzip': {
      res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' });
      return res.end(zlib.gzipSync('<title>Gzipped</title>'));
    }
    case '/br': {
      res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'br' });
      return res.end(zlib.brotliCompressSync('<title>Brotli</title>'));
    }
    case '/deflate-raw': {
      res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'deflate' });
      return res.end(zlib.deflateRawSync('<title>Raw deflate</title>'));
    }
    case '/cp1251': {
      res.writeHead(200, { 'content-type': 'text/html; charset=windows-1251' });
      return res.end(Buffer.from([0x3c, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x3e, 0xcf, 0xf0, 0xe8, 0xe2, 0xe5, 0xf2,
        0x3c, 0x2f, 0x74, 0x69, 0x74, 0x6c, 0x65, 0x3e]));            // <title>Привет</title>
    }
    case '/bomb': {
      /* Five megabytes of zeros in a few kilobytes: the reader must stop. */
      res.writeHead(200, { 'content-type': 'text/html', 'content-encoding': 'gzip' });
      return res.end(zlib.gzipSync(Buffer.alloc(5 * 1024 * 1024)));
    }

    case '/fragment': return redirect(res, '/c');
    case '/no-location': res.writeHead(302); return res.end();
    case '/two-locations': res.writeHead(302, [['Location', '/c'], ['Location', '/b']]); return res.end();
    case '/to-app': return redirect(res, 'tg://resolve?domain=example');
    case '/to-script': return redirect(res, 'javascript:alert(1)');
    case '/to-closed-port': return redirect(res, `http://127.0.0.1:1/`);
    case '/to-metadata':
      /* The guard is switched on at the moment the dangerous hop is handed
         out, so the first hop, to this very server, is still allowed. */
      process.env.ALLOW_PRIVATE_TARGETS = 'false';
      return redirect(res, 'http://169.254.169.254/latest/meta-data/');
    case '/hang': return undefined;                               // never answers

    default: {
      const counted = /^\/count\/(\d+)$/.exec(url.pathname);
      if (counted) return redirect(res, `/count/${Number(counted[1]) + 1}`);
      return html(res, '<title>Not found</title>', 404);
    }
  }
}

before(async () => {
  server = http.createServer(route);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => {
  server.closeAllConnections?.();
  server.close();
});

const run = (path, options = {}) => follow(base + path, {
  profile: 'chrome', lang: 'en', cookies: true, deadline: Date.now() + 20000, ...options,
});

test('a chain is followed hop by hop, with the cookie set on the way sent on', async () => {
  const { hops, outcome } = await run('/a?utm_source=x#section');
  assert.equal(outcome, 'arrived');
  assert.deepEqual(hops.map(hop => [hop.kind, hop.status]), [['redirect', 301], ['redirect', 302], ['final', 200]]);
  assert.equal(hops[0].redirect.relative, true);
  assert.equal(hops[0].redirect.target, `${base}/b?utm_source=x#section`);
  /* RFC 9110: a Location without a fragment inherits the request's. */
  assert.equal(hops[1].redirect.fragmentInherited, true);
  assert.equal(hops[2].url, `${base}/c#section`);
  assert.deepEqual(hops[2].cookiesSent, ['sid']);
  assert.equal(hops[2].page.title, 'C');
  assert.deepEqual(hops[1].cookiesSet.map(cookie => cookie.name), ['sid']);
  assert.deepEqual(hops[1].changes, ['path']);
});

test('a cookie gate is a loop only for a client that forgets cookies', async () => {
  const kept = await run('/gate');
  assert.equal(kept.outcome, 'arrived');
  assert.equal(kept.hops.length, 2);

  const forgotten = await run('/gate', { cookies: false });
  assert.equal(forgotten.outcome, 'loop');
  assert.equal(forgotten.hops[forgotten.hops.length - 1].redirect.loop, 0);
});

test('a real loop is stopped where it closes, without asking again', async () => {
  requests.length = 0;
  const { hops, outcome } = await run('/loop-1');
  assert.equal(outcome, 'loop');
  assert.equal(hops.length, 2);
  assert.equal(hops[1].redirect.loop, 0);
  assert.deepEqual(requests, ['/loop-1', '/loop-2']);
});

test('meta refresh, the Refresh header and a script stub are all hops', async () => {
  for (const [path, type] of [['/meta', 'meta-refresh'], ['/refresh', 'refresh-header'], ['/stub', 'javascript']]) {
    const { hops, outcome } = await run(path);
    assert.equal(outcome, 'arrived', path);
    assert.equal(hops[0].redirect.type, type, path);
    assert.equal(hops[1].via, type, path);
    assert.equal(hops[1].url, `${base}/c`, path);
  }
});

test('a refresh minutes away is a page, not a redirect', async () => {
  const { hops, outcome } = await run('/meta-slow');
  assert.equal(outcome, 'arrived');
  assert.equal(hops.length, 1);
  assert.equal(hops[0].page.refresh.delay, 300);
});

test('compressed and legacy-encoded pages are read', async () => {
  for (const [path, title] of [['/gzip', 'Gzipped'], ['/br', 'Brotli'], ['/deflate-raw', 'Raw deflate'], ['/cp1251', 'Привет']]) {
    const { hops } = await run(path);
    assert.equal(hops[0].page.title, title, path);
  }
});

test('a body that inflates without end is cut at the limit', async () => {
  const { hops } = await run('/bomb');
  assert.equal(hops[0].page.truncated, true);
  assert.ok(hops[0].page.bytes <= 256 * 1024);
});

test('what browsers do with broken redirects is what the report says', async () => {
  const missing = await run('/no-location');
  assert.equal(missing.hops[0].missingLocation, true);
  assert.equal(missing.outcome, 'arrived');

  const two = await run('/two-locations');
  assert.deepEqual(two.hops[0].redirect.multiple, ['/c', '/b']);

  const app = await run('/to-app');
  assert.equal(app.outcome, 'left-web');
  assert.equal(app.hops[0].redirect.target, 'tg://resolve?domain=example');

  const script = await run('/to-script');
  assert.equal(script.outcome, 'unsafe-redirect');
});

test('a chain longer than a browser follows is stopped at the browser limit', async () => {
  const { hops, outcome } = await run('/count/0');
  assert.equal(outcome, 'too-many-redirects');
  assert.equal(hops.length, MAX_REDIRECTS + 1);
  assert.equal(hops[hops.length - 1].redirect.notFollowed, true);
});

test('a hop that never answers is reported, and the deadline is kept', async () => {
  const started = Date.now();
  const { hops, outcome } = await run('/hang', { deadline: Date.now() + 1500 });
  assert.equal(outcome, 'failed');
  assert.equal(hops[0].error, 'timeout');
  assert.ok(Date.now() - started < 4000);
});

test('a port outside the list is not knocked on', async () => {
  process.env.ALLOWED_PORTS = String(new URL(base).port);
  try {
    const { hops, outcome } = await run('/to-closed-port');
    assert.equal(outcome, 'refused');
    assert.equal(hops[1].refused, 'port-not-allowed');
    assert.equal(hops[1].timings, undefined);
  } finally {
    process.env.ALLOWED_PORTS = 'any';
  }
});

test('a public link that redirects into a private network is refused before connecting', async () => {
  try {
    const { hops, outcome } = await run('/to-metadata');
    assert.equal(outcome, 'refused');
    assert.equal(hops[1].refused, 'private-address');
    assert.equal(hops[1].timings, undefined, 'no request was made');
  } finally {
    process.env.ALLOW_PRIVATE_TARGETS = 'true';
  }
});

test('a name that resolves to a private address is refused at resolution', async () => {
  const original = dns.lookup;
  process.env.ALLOW_PRIVATE_TARGETS = 'false';
  requests.length = 0;
  try {
    /* A public-looking name whose answer points inside — the rebinding case. */
    dns.lookup = (host, options, callback) => callback(null, [{ address: '127.0.0.1', family: 4 }]);
    const inside = await request({ url: `http://internal.example:${new URL(base).port}/c` });
    assert.equal(inside.ok, false);
    assert.equal(inside.error, 'private-address');

    /* One public and one private answer is refused as a whole. */
    dns.lookup = (host, options, callback) => callback(null, [
      { address: '93.184.216.34', family: 4 }, { address: '10.0.0.7', family: 4 }]);
    const mixed = await request({ url: `http://mixed.example:${new URL(base).port}/c` });
    assert.equal(mixed.error, 'private-address');

    assert.deepEqual(requests, [], 'the local server was never reached');
  } finally {
    dns.lookup = original;
    process.env.ALLOW_PRIVATE_TARGETS = 'true';
  }
});

/**
 * A certificate made for this run. Nothing is committed: a private key in a
 * repository, even a test one, is the sort of thing scanners rightly shout
 * about. Where openssl is missing the test says so and skips.
 */
function selfSigned() {
  const dir = mkdtempSync(path.join(tmpdir(), 'myredirectchecker-tls-'));
  try {
    execFileSync('openssl', ['req', '-x509', '-newkey', 'rsa:2048', '-nodes', '-days', '2',
      '-keyout', path.join(dir, 'key.pem'), '-out', path.join(dir, 'cert.pem'),
      '-subj', '/CN=test.local', '-addext', 'subjectAltName=IP:127.0.0.1,DNS:test.local'],
    { stdio: 'ignore' });
    return { key: readFileSync(path.join(dir, 'key.pem')), cert: readFileSync(path.join(dir, 'cert.pem')) };
  } catch {
    return null;
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

test('an https hop reports its TLS, and a certificate a browser would reject', async t => {
  const credentials = selfSigned();
  if (!credentials) return t.skip('openssl is not available to make a certificate');

  const secure = https.createServer(credentials, (req, res) => {
    if (req.url === '/') {
      res.writeHead(301, { location: '/home', 'strict-transport-security': 'max-age=63072000' });
      return res.end();
    }
    res.writeHead(200, { 'content-type': 'text/html' });
    return res.end('<title>Secure</title>');
  });
  await new Promise(resolve => secure.listen(0, '127.0.0.1', resolve));
  try {
    const { hops, outcome } = await follow(`https://127.0.0.1:${secure.address().port}/`, {
      profile: 'chrome', lang: 'en', cookies: true, deadline: Date.now() + 10000,
    });
    /* The certificate does not stop the check: where the chain leads past a
       warning page is the useful part. */
    assert.equal(outcome, 'arrived');
    assert.equal(hops[0].tls.authorized, false);
    assert.equal(hops[0].tls.error, 'DEPTH_ZERO_SELF_SIGNED_CERT');
    assert.equal(hops[0].tls.subject, 'test.local');
    assert.match(hops[0].tls.protocol, /^TLSv1\.[23]$/);
    assert.equal(hops[0].hsts, 'max-age=63072000');
    assert.equal(typeof hops[0].timings.tls, 'number');
    assert.equal(hops[1].page.title, 'Secure');
  } finally {
    secure.closeAllConnections?.();
    secure.close();
  }
});
