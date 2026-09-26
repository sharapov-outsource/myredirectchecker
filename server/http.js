/**
 * One request, and nothing followed.
 *
 * `fetch` is no use here: it follows redirects, and this service exists to look
 * at each one; it hides the connection, and the connection is half of what a
 * hop has to say; and it refuses a bad certificate rather than reporting it,
 * when a certificate a browser would stop at is one of the findings.
 *
 * So this is `http.request` with every step timed and three guards around the
 * socket, each covering a case the others cannot:
 *
 *   · a literal address is refused in target.js before anything is opened;
 *   · a name is resolved by `guardedLookup`, which refuses the lot if any one
 *     address it resolves to is private — the connection is never attempted;
 *   · the address the socket actually reached is checked once more on connect.
 *
 * Each hop gets a fresh connection. A browser reuses one for hops on the same
 * host, so the times here are what a first visit costs, not a second.
 */

import http from 'node:http';
import https from 'node:https';
import dns from 'node:dns';
import net from 'node:net';
import zlib from 'node:zlib';
import { performance } from 'node:perf_hooks';

import { pace, isPrivateAddress, allowPrivate } from '@sharapov/service-kit';

import { bareHost, effectivePort } from './target.js';

const TIMEOUT = Number(process.env.HTTP_TIMEOUT_MS || 10000);
const MAX_BODY = Number(process.env.HTTP_MAX_BODY || 256 * 1024);

/* A report keeps every header, but not every byte of one: a policy header can
   run to twenty kilobytes, and a hundred cookies is an attack, not a site. */
const MAX_VALUE = 2048;
const MAX_HEADERS = 120;

function refusal(address) {
  return Object.assign(new Error(`refused to connect to ${address}`), { code: 'PRIVATE_ADDRESS', address });
}

/**
 * Name resolution that refuses a private answer before a connection is tried.
 *
 * Every address is checked, not just the one that would be used: a name that
 * answers with one public and one private address is refused outright, because
 * which of the two a connection ends up using is not something to leave to
 * Happy Eyeballs.
 */
function guardedLookup(marks) {
  return function lookup(hostname, options, callback) {
    if (typeof options === 'function') { callback = options; options = {}; }
    if (typeof options === 'number') options = { family: options };

    const started = performance.now();
    dns.lookup(hostname, { ...options, all: true }, (err, addresses) => {
      marks.dnsDone = performance.now();
      marks.dns = marks.dnsDone - started;
      if (err) return callback(err);

      const list = addresses || [];
      if (!list.length) return callback(Object.assign(new Error('no address'), { code: 'ENOTFOUND' }));
      if (!allowPrivate()) {
        const inside = list.find(entry => isPrivateAddress(entry.address));
        if (inside) return callback(refusal(inside.address));
      }

      marks.addresses = list.map(entry => entry.address);
      if (options.all) return callback(null, list);
      return callback(null, list[0].address, list[0].family);
    });
  };
}

/** A socket error as one of the codes the report uses. */
export function errorCode(err) {
  const code = String(err?.code || err?.errors?.[0]?.code || '');
  if (code === 'PRIVATE_ADDRESS') return 'private-address';
  if (['ENOTFOUND', 'EAI_AGAIN', 'EAI_NODATA', 'EAI_NONAME', 'ENODATA', 'ESERVFAIL'].includes(code)) {
    return 'dns-failed';
  }
  if (code === 'ECONNREFUSED') return 'connection-refused';
  if (['ECONNRESET', 'EPIPE', 'ECONNABORTED'].includes(code)) return 'connection-reset';
  if (['ETIMEDOUT', 'TIMEOUT', 'ESOCKETTIMEDOUT'].includes(code)) return 'timeout';
  if (['EHOSTUNREACH', 'ENETUNREACH', 'EADDRNOTAVAIL'].includes(code)) return 'unreachable';
  if (code.startsWith('HPE_')) return 'malformed-response';
  if (code === 'EPROTO' || code.startsWith('ERR_SSL') || code.startsWith('ERR_TLS')) return 'tls-failed';
  /* Not 'network': the shared dictionary already uses that for the page
     failing to reach this service, which is a different thing to say. */
  return 'connection-failed';
}

function timings(marks) {
  const round = value => (value === undefined || value === null ? null : Math.max(0, Math.round(value)));
  const tcpFrom = marks.dnsDone ?? marks.start;
  const waitFrom = marks.secured ?? marks.connected;
  return {
    dns: round(marks.dns),
    connect: marks.connected !== undefined ? round(marks.connected - tcpFrom) : null,
    tls: marks.secured !== undefined && marks.connected !== undefined ? round(marks.secured - marks.connected) : null,
    wait: marks.response !== undefined && waitFrom !== undefined ? round(marks.response - waitFrom) : null,
    total: round((marks.end ?? marks.response ?? performance.now()) - marks.start),
  };
}

function tlsDetails(socket) {
  if (!socket || typeof socket.getProtocol !== 'function') return null;
  let cert = {};
  try { cert = socket.getPeerCertificate(false) || {}; } catch { /* a closed socket has none */ }
  const names = String(cert.subjectaltname || '')
    .split(/,\s*/)
    .filter(entry => entry.startsWith('DNS:'))
    .map(entry => entry.slice(4));
  const one = value => (Array.isArray(value) ? value[0] : value) || null;
  const cipher = socket.getCipher?.() || {};

  return {
    protocol: socket.getProtocol() || null,
    cipher: cipher.standardName || cipher.name || null,
    authorized: Boolean(socket.authorized),
    error: socket.authorizationError ? String(socket.authorizationError) : null,
    subject: one(cert.subject?.CN),
    issuer: one(cert.issuer?.O) || one(cert.issuer?.CN),
    validTo: cert.valid_to ? new Date(cert.valid_to).toISOString() : null,
    names: names.slice(0, 12),
    namesTotal: names.length,
  };
}

/**
 * Header values arrive decoded as latin1, byte for byte. A Location that a
 * server wrote in UTF-8 is read back as UTF-8, because that is what browsers
 * do with it; anything that is not valid UTF-8 is left as it came.
 */
export function asUtf8(value) {
  const text = String(value ?? '');
  if (!/[\x80-\xff]/.test(text)) return text;
  const decoded = Buffer.from(text, 'latin1').toString('utf8');
  return decoded.includes('�') ? text : decoded;
}

/** Raw header pairs, in the order they came, cut to a size worth reporting. */
export function headerList(rawHeaders = []) {
  const list = [];
  for (let i = 0; i + 1 < rawHeaders.length && list.length < MAX_HEADERS; i += 2) {
    const value = asUtf8(rawHeaders[i + 1]);
    list.push([String(rawHeaders[i]), value.length > MAX_VALUE ? value.slice(0, MAX_VALUE) + '…' : value]);
  }
  return list;
}

/** Every value of a header, from the raw pairs, so duplicates survive. */
export function rawValues(rawHeaders = [], name) {
  const wanted = name.toLowerCase();
  const values = [];
  for (let i = 0; i + 1 < rawHeaders.length; i += 2) {
    if (String(rawHeaders[i]).toLowerCase() === wanted) values.push(asUtf8(rawHeaders[i + 1]));
  }
  return values;
}

/* ------------------------------------------------------------------ *
 * The body
 * ------------------------------------------------------------------ */

const zlibFlush = { finishFlush: zlib.constants.Z_SYNC_FLUSH };

/** A decoder for a content coding: a stream, 'deflate' (decided later), null for none. */
function decoderFor(encoding) {
  switch (encoding) {
    case '':
    case 'identity':
      return null;
    case 'gzip':
    case 'x-gzip':
      return zlib.createGunzip(zlibFlush);
    case 'br':
      return zlib.createBrotliDecompress({ finishFlush: zlib.constants.BROTLI_OPERATION_FLUSH });
    case 'zstd':
      return typeof zlib.createZstdDecompress === 'function' ? zlib.createZstdDecompress() : undefined;
    case 'deflate':
      /* "deflate" is meant to be zlib-wrapped and is often sent raw; the first
         two bytes say which, so the choice waits for them. */
      return 'deflate';
    default:
      return undefined;
  }
}

const zlibWrapped = chunk => chunk.length >= 2 && (chunk[0] & 0x0f) === 8 &&
  ((chunk[0] << 8) | chunk[1]) % 31 === 0;

/**
 * Up to `limit` decoded bytes of a response. Never throws: a body that stops
 * short, fails to decode or runs long is reported with what arrived.
 */
function readBody(response, limit = MAX_BODY) {
  return new Promise(resolve => {
    const encoding = String(response.headers['content-encoding'] || '').trim().toLowerCase();
    const decoder = decoderFor(encoding);
    const chunks = [];
    let size = 0;
    let rawBytes = 0;
    let truncated = false;
    let error = null;
    let done = false;
    let sink = null;

    const finish = () => {
      if (done) return;
      done = true;
      resolve({ bytes: Buffer.concat(chunks, size), rawBytes, truncated, error });
    };

    if (decoder === undefined) {
      error = 'encoding';
      response.destroy();
      finish();
      return;
    }

    const keep = chunk => {
      if (done) return;
      const room = limit - size;
      if (chunk.length < room) {
        chunks.push(chunk);
        size += chunk.length;
        return;
      }
      chunks.push(chunk.subarray(0, room));
      size = limit;
      truncated = true;
      finish();
      response.destroy();
      sink?.destroy();
    };

    const attach = stream => {
      sink = stream;
      stream.on('data', keep);
      stream.on('end', finish);
      stream.on('error', () => { error = error || 'decode'; finish(); });
    };
    if (decoder && decoder !== 'deflate') attach(decoder);

    response.on('data', chunk => {
      if (done) return;
      rawBytes += chunk.length;
      if (decoder === 'deflate' && !sink) {
        attach(zlibWrapped(chunk) ? zlib.createInflate(zlibFlush) : zlib.createInflateRaw(zlibFlush));
      }
      if (sink) sink.write(chunk);
      else keep(chunk);
      /* A small compressed body can decode to something enormous; the decoded
         limit catches that, and this catches a coding that never yields. */
      if (rawBytes > limit * 8) {
        truncated = true;
        finish();
        response.destroy();
      }
    });

    const settle = () => {
      if (sink && !sink.writableEnded && !sink.destroyed) sink.end();
      else if (!sink) finish();
    };
    response.on('end', settle);
    response.on('aborted', () => { error = error || 'aborted'; settle(); });
    response.on('error', () => { error = error || 'aborted'; settle(); });
    response.on('close', settle);
  });
}

/** Bytes to text, in the charset the response declared or the page did. */
export function decodeText(bytes, contentType = '') {
  let charset = /charset\s*=\s*["']?\s*([\w.:-]+)/i.exec(contentType)?.[1];
  if (!charset) {
    const head = bytes.subarray(0, 4096).toString('latin1');
    charset = /<meta[^>]+charset\s*=\s*["']?\s*([\w.:-]+)/i.exec(head)?.[1];
  }
  try {
    return new TextDecoder(charset || 'utf-8').decode(bytes);
  } catch {
    return new TextDecoder('utf-8').decode(bytes);
  }
}

/* ------------------------------------------------------------------ *
 * The request
 * ------------------------------------------------------------------ */

/**
 * @param {object} options
 * @param {string} options.url
 * @param {object} [options.headers]     what the client profile sends, plus cookies
 * @param {number} [options.timeout]     for the whole exchange, body included
 * @param {(response: object) => boolean} [options.wantBody]
 *        asked once the headers are in; the body is read only when it says so
 */
export async function request({ url, headers = {}, timeout = TIMEOUT, wantBody = () => false }) {
  await pace('http');

  const target = new URL(url);
  const secure = target.protocol === 'https:';
  const host = bareHost(target.hostname);
  const marks = { start: performance.now() };

  const options = {
    method: 'GET',
    hostname: host,
    port: effectivePort(target),
    path: (target.pathname || '/') + target.search,
    headers: { host: target.host, ...headers, connection: 'close' },
    setHost: false,
    agent: false,
    lookup: guardedLookup(marks),
    /* Browsers accept far larger header blocks than Node's 16 KB default, and
       read past small deviations from the grammar. A report that fails where
       the browser would have carried on is describing the wrong thing. */
    maxHeaderSize: 64 * 1024,
    insecureHTTPParser: true,
  };
  if (secure) {
    /* The certificate is one of the things reported, so a bad one must not
       end the request. `servername` is set explicitly because `setHost: false`
       stops Node deriving it, and without SNI a shared host presents its
       default certificate — which would then be reported as wrong. */
    options.rejectUnauthorized = false;
    options.ALPNProtocols = ['http/1.1'];
    if (!net.isIP(host)) options.servername = host.replace(/\.$/, '');
  }

  return new Promise(resolve => {
    let settled = false;
    let responded = false;
    const finish = value => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve({ url, ...value, timings: timings(marks) });
    };

    const client = (secure ? https : http).request(options);
    const timer = setTimeout(() => {
      client.destroy(Object.assign(new Error('timed out'), { code: 'TIMEOUT' }));
    }, Math.max(1, timeout));

    client.on('socket', socket => {
      socket.once('connect', () => {
        marks.connected = performance.now();
        marks.address = socket.remoteAddress;
        marks.family = socket.remoteFamily;
        if (!allowPrivate() && socket.remoteAddress && isPrivateAddress(socket.remoteAddress)) {
          client.destroy(refusal(socket.remoteAddress));
        }
      });
      socket.once('secureConnect', () => { marks.secured = performance.now(); });
    });

    client.on('error', err => {
      /* Once the headers are in, a reset while reading the body is the body's
         problem, and readBody reports it. */
      if (responded) return;
      finish({
        ok: false,
        error: errorCode(err),
        detail: err?.message || String(err),
        address: err?.address || marks.address || marks.addresses?.[0] || null,
      });
    });

    client.on('response', async response => {
      responded = true;
      marks.response = performance.now();
      const socket = response.socket;
      const tls = secure ? tlsDetails(socket) : null;
      const address = marks.address || socket?.remoteAddress || null;
      const family = marks.family || socket?.remoteFamily || null;

      let page;
      if (wantBody(response)) {
        const body = await readBody(response);
        page = {
          text: decodeText(body.bytes, String(response.headers['content-type'] || '')),
          bytes: body.bytes.length,
          truncated: body.truncated,
          error: body.error,
        };
      } else {
        response.destroy();
      }
      marks.end = performance.now();

      finish({
        ok: true,
        status: response.statusCode,
        statusText: response.statusMessage || '',
        httpVersion: response.httpVersion,
        rawHeaders: response.rawHeaders,
        headers: response.headers,
        address,
        family,
        port: options.port,
        tls,
        page,
      });
    });

    client.end();
  });
}
