#!/usr/bin/env node
/**
 * The checker without the web server, for when a terminal is enough:
 *
 *   npm run scan -- example.com/some/page
 *   npm run scan -- bit.ly/xyz --ua=googlebot --no-cookies
 *   npm run scan -- example.com --json
 */

import { scan } from '../server/scan.js';
import { parseInput } from '../server/target.js';
import { profileId, PROFILE_IDS } from '../server/profiles.js';

const args = process.argv.slice(2);
const input = args.find(argument => !argument.startsWith('-'));
const asJson = args.includes('--json');
const ua = args.find(argument => argument.startsWith('--ua='))?.slice(5);

if (!input) {
  console.error(`usage: npm run scan -- <link> [--ua=${PROFILE_IDS.join('|')}] [--no-cookies] [--json]`);
  process.exit(2);
}
if (profileId(ua) === null) {
  console.error(`unknown client "${ua}"; one of: ${PROFILE_IDS.join(', ')}`);
  process.exit(2);
}

const target = parseInput(input);
if (target.error) {
  console.error(`${input}: ${target.error}`);
  process.exit(2);
}

const report = await scan(target, {
  query: { ua, cookies: args.includes('--no-cookies') ? 'false' : undefined },
  onProgress: event => {
    if (asJson || !event.hop) return;
    const hop = event.hop;
    process.stderr.write(`  ${String(hop.index + 1).padStart(2)}. ${hop.status ?? hop.error ?? hop.refused}  ${hop.url}\n`);
  },
});

if (asJson) {
  console.log(JSON.stringify(report, null, 2));
  process.exit(0);
}

const { summary } = report;
console.log(`\n${report.url}`);
console.log(`  ${summary.outcome} · ${summary.redirects} redirect(s) · ${summary.totalMs} ms` +
  ` · as ${report.client.profile}${report.client.cookies ? '' : ', no cookies'}`);
if (summary.destination) console.log(`  ends at ${summary.destination.url}${summary.destination.status ? ` (${summary.destination.status})` : ''}`);

console.log('');
for (const hop of report.hops) {
  const code = hop.status ?? hop.error ?? hop.refused;
  const how = hop.redirect ? ` → ${hop.redirect.type === 'http' ? hop.redirect.status : hop.redirect.type}` : '';
  const loop = hop.redirect?.loop !== undefined ? ` ↺ back to ${hop.redirect.loop + 1}` : '';
  const where = [hop.address, hop.edgeName || hop.server].filter(Boolean).join(' · ');
  console.log(`  ${String(hop.index + 1).padStart(2)}. ${code}  ${hop.url}${how}${loop}`);
  if (where || hop.timings) {
    console.log(`      ${[where, hop.timings ? `${hop.timings.total} ms` : ''].filter(Boolean).join(' · ')}`);
  }
}

if (report.incomplete?.length) console.log(`\n  incomplete: ${report.incomplete.join(', ')}`);

console.log('\nfindings:');
if (!report.flags.length) console.log('  none');
for (const finding of report.flags) {
  const hops = finding.hops ? `  (step ${finding.hops.map(index => index + 1).join(', ')})` : '';
  console.log(`  ${finding.severity.padEnd(8)} ${finding.id}${hops}`);
}
console.log('');
