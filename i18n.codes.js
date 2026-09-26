/**
 * Every code this service can put in a report.
 *
 * Finding identifiers are read out of the source, so a new finding cannot be
 * added without its words. The rest are short closed lists, each imported from
 * the module that owns it where there is one, and written out here where the
 * list is only ever spelled out in a switch or a regular expression.
 */

import path from 'node:path';
import { readFileSync } from 'node:fs';
import { codesFrom } from '@sharapov/service-kit/check-i18n';

import { STAGES } from './server/scan.js';
import { PROFILE_IDS } from './server/profiles.js';

/** The codes one function returns, read from its body alone. */
function returnedBy(file, name) {
  const source = readFileSync(file, 'utf8');
  const start = source.indexOf(`function ${name}(`);
  const body = source.slice(start, source.indexOf('\n}\n', start));
  return [...body.matchAll(/return '([a-z0-9-]+)'/g)].map(match => match[1]);
}

export default function codes(root) {
  const server = file => path.join(root, 'server', file);
  const flags = codesFrom(server('findings.js'), /add\('([a-z0-9-]+)'/g);

  return {
    flag: flags,
    fd: flags,
    stage: STAGES,
    ua: PROFILE_IDS,
    rt: ['http', 'refresh-header', 'meta-refresh', 'javascript'],
    sc: ['301', '302', '303', '307', '308'],
    t: ['dns', 'connect', 'tls', 'wait'],
    out: [
      'arrived', 'client-error', 'server-error', 'loop', 'too-many-redirects', 'failed',
      'refused', 'broken-redirect', 'unsafe-redirect', 'left-web', 'incomplete',
    ],
    ck: codesFrom(server('cookies.js'), /reason: '([a-z0-9-]+)'/g),
    inc: ['deadline', 'port-not-followed', 'credentials-not-followed', 'url-too-long'],
    err: [
      /* the shell's own */
      'invalid-host', 'domain-expected', 'invalid-port', 'port-not-allowed', 'dns-failed',
      'private-address', 'unreachable', 'scan-timeout', 'stage-timeout', 'scan-failed',
      'busy', 'bad-output', 'network', 'bad-response', 'timeout',
      /* this service's: what the parser refuses */
      'url-too-long', 'scheme-not-supported', 'credentials-not-allowed', 'unknown-client', 'deadline',
      /* and what a hop's connection can end with */
      ...returnedBy(server('http.js'), 'errorCode'),
    ],
    sev: ['critical', 'high', 'medium', 'low', 'info'],
    st: ['ok', 'safe', 'warning', 'weak', 'missing', 'unknown', 'partial', 'failed', 'info', 'vulnerable'],
  };
}
