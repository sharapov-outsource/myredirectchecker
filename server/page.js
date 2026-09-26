/**
 * The redirects that are not in the status line.
 *
 * A 200 can still send the visitor somewhere else, in three ways:
 *
 *   · a `Refresh` header, which every browser honours although no RFC ever
 *     standardised it;
 *   · `<meta http-equiv="refresh">`, which the HTML standard does, down to how
 *     the content attribute is parsed — and that parser is followed here step
 *     by step, because `0;URL='/next'`, `0, /next` and `0 url = /next` are all
 *     real pages and all mean the same thing;
 *   · script. `location.href = '/next'` is found by reading the source, never
 *     by running it: this service executes nothing it downloads. A literal
 *     target in a page that is otherwise empty is a redirect stub and is
 *     followed, labelled as found in the source. Anywhere else it may sit
 *     behind a condition, so it is reported and left alone.
 *
 * The same pass reads what the final page says about itself — title, canonical
 * address, robots directives — because "where does this link end up" is
 * usually followed by "and is that the page it should be".
 */

const WS = /[\t\n\f\r ]/;

const NAMED = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', '#39': "'" };

export function decodeEntities(text) {
  return String(text ?? '').replace(/&(#x[0-9a-f]+|#\d+|[a-z]+\d*);?/gi, (match, body) => {
    const key = body.toLowerCase();
    if (key.startsWith('#x')) return safeChar(parseInt(key.slice(2), 16), match);
    if (key.startsWith('#')) return safeChar(parseInt(key.slice(1), 10), match);
    return NAMED[key] ?? match;
  });
}

function safeChar(code, fallback) {
  try { return String.fromCodePoint(code); } catch { return fallback; }
}

/** The attributes of one start tag, names lowercased, values decoded. */
export function attributesOf(tag) {
  const out = {};
  const body = tag.replace(/^<[a-z0-9]+/i, '').replace(/\/?>$/, '');
  const pattern = /([^\s"'=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  let match;
  while ((match = pattern.exec(body))) {
    const name = match[1].toLowerCase();
    if (name in out) continue;                     // the first occurrence wins, as in HTML
    out[name] = decodeEntities(match[2] ?? match[3] ?? match[4] ?? '');
  }
  return out;
}

/**
 * The content of a Refresh header or a refresh meta tag, parsed as the HTML
 * standard's "shared declarative refresh steps" do.
 *
 * @returns {{delay: number, url: string|null}|null}  null when it is invalid;
 *          `url: null` means the page reloads itself
 */
export function parseRefresh(input) {
  const s = String(input ?? '');
  if (!s) return null;
  let pos = 0;
  const skipSpace = () => { while (pos < s.length && WS.test(s[pos])) pos++; };

  skipSpace();
  const digitsFrom = pos;
  while (pos < s.length && /[0-9]/.test(s[pos])) pos++;
  const timeString = s.slice(digitsFrom, pos);
  let delay = 0;
  if (!timeString) {
    if (s[pos] !== '.') return null;
  } else {
    delay = parseInt(timeString, 10);
  }
  while (pos < s.length && /[0-9.]/.test(s[pos])) pos++;

  if (pos < s.length) {
    if (s[pos] !== ';' && s[pos] !== ',' && !WS.test(s[pos])) return null;
    skipSpace();
    if (s[pos] === ';' || s[pos] === ',') pos++;
    skipSpace();
  }
  if (pos >= s.length) return { delay, url: null };

  let urlString = s.slice(pos);
  let quoteFrom = null;
  /* "url" and "=" are optional; whichever part is missing sends the parser
     straight to the address with what it has. */
  parse: {
    if (!/[uU]/.test(s[pos] || '')) { quoteFrom = pos; break parse; }
    pos++;
    if (!/[rR]/.test(s[pos] || '')) break parse;
    pos++;
    if (!/[lL]/.test(s[pos] || '')) break parse;
    pos++;
    skipSpace();
    if (s[pos] !== '=') break parse;
    pos++;
    skipSpace();
    quoteFrom = pos;
  }
  if (quoteFrom !== null) {
    pos = quoteFrom;
    let quote = '';
    if (s[pos] === '"' || s[pos] === "'") { quote = s[pos]; pos++; }
    urlString = s.slice(pos);
    if (quote && urlString.includes(quote)) urlString = urlString.slice(0, urlString.indexOf(quote));
  }

  urlString = urlString.trim();
  return { delay, url: urlString || null };
}

/** A URL relative to the page, or null when it does not parse. */
function resolve(raw, base) {
  try { return new URL(raw, base).href; } catch { return null; }
}

/** Minimal JavaScript string unescaping: enough for a URL literal. */
function unescapeJs(text) {
  return text
    .replace(/\\u\{([0-9a-f]+)\}/gi, (m, hex) => safeChar(parseInt(hex, 16), m))
    .replace(/\\u([0-9a-f]{4})/gi, (m, hex) => safeChar(parseInt(hex, 16), m))
    .replace(/\\x([0-9a-f]{2})/gi, (m, hex) => safeChar(parseInt(hex, 16), m))
    .replace(/\\(.)/g, '$1');
}

/* location = '…', window.location.href = "…", top.location = `…` — but not
   `location.href == '…'`, which is a comparison. */
const ASSIGN = /\b(?:(?:window|self|top|parent|document)\s*\.\s*)?location(?:\s*\.\s*href)?\s*=(?!=)\s*(['"`])((?:\\.|(?!\1)[^\\\n]){1,2048})\1/g;
/* location.replace('…'), location.assign('…') */
const CALL = /\blocation\s*\.\s*(?:replace|assign)\s*\(\s*(['"`])((?:\\.|(?!\1)[^\\\n]){1,2048})\1/g;

/** Literal redirect targets in a script, in the order they appear. */
export function scriptTargets(source, base) {
  const found = [];
  for (const pattern of [ASSIGN, CALL]) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(source))) {
      const literal = match[2];
      /* A literal that is only the start of an expression is not the target:
         `location.href = '/search?q=' + query` goes somewhere else each time. */
      const after = source.slice(pattern.lastIndex).match(/^\s*(\S)/)?.[1];
      if (after === '+' || (match[1] === '`' && literal.includes('${'))) continue;
      const raw = unescapeJs(literal).trim();
      if (!raw || raw.startsWith('#') || /^javascript:/i.test(raw)) continue;
      const target = resolve(raw, base);
      if (target) found.push({ raw, target, at: match.index });
    }
  }
  found.sort((a, b) => a.at - b.at);
  const seen = new Set();
  return found.filter(entry => !seen.has(entry.target) && seen.add(entry.target))
    .map(({ raw, target }) => ({ raw, target }));
}

const NOT_SCRIPT = /^(?:application\/(?:ld\+)?json|text\/(?:template|x-template|html|plain)|importmap|speculationrules)$/i;

/**
 * @param {string} html
 * @param {string} pageUrl   the address the page was fetched from
 * @returns {object} what the page says about itself and where it sends people
 */
export function analysePage(html, pageUrl) {
  const source = String(html ?? '').replace(/<!--[\s\S]*?-->/g, '');

  const scripts = [];
  let markup = source.replace(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi, (whole, attrs, body) => {
    const attributes = attributesOf(`<script ${attrs}>`);
    if (!attributes.src && !NOT_SCRIPT.test(attributes.type || '')) scripts.push(body);
    return ' ';
  });
  markup = markup
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, ' ')
    .replace(/<template\b[^>]*>[\s\S]*?<\/template\s*>/gi, ' ');

  /* A refresh inside <noscript> is for clients without script only: a browser
     with script enabled parses that content as text and never sees the tag. */
  const noscript = [];
  markup = markup.replace(/<noscript\b[^>]*>([\s\S]*?)<\/noscript\s*>/gi, (whole, body) => {
    noscript.push(body);
    return ' ';
  });

  const tags = (text, name) => text.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) || [];

  let base = pageUrl;
  const baseTag = tags(markup, 'base').map(attributesOf).find(attributes => attributes.href);
  if (baseTag) base = resolve(baseTag.href, pageUrl) || pageUrl;

  const refreshIn = text => {
    for (const attributes of tags(text, 'meta').map(attributesOf)) {
      if (String(attributes['http-equiv'] || '').toLowerCase() !== 'refresh') continue;
      const parsed = parseRefresh(attributes.content);
      if (!parsed) continue;
      return {
        delay: parsed.delay,
        url: parsed.url,
        target: parsed.url ? resolve(parsed.url, base) : null,
      };
    }
    return null;
  };

  const robots = tags(markup, 'meta').map(attributesOf)
    .filter(attributes => ['robots', 'googlebot', 'yandex'].includes(String(attributes.name || '').toLowerCase()))
    .map(attributes => ({ source: 'meta', name: attributes.name.toLowerCase(), content: attributes.content || '' }));

  const canonicalTag = tags(markup, 'link').map(attributesOf)
    .find(attributes => String(attributes.rel || '').toLowerCase().split(/\s+/).includes('canonical') &&
      attributes.href);

  const titleMatch = /<title\b[^>]*>([\s\S]*?)<\/title\s*>/i.exec(markup);
  const title = titleMatch ? decodeEntities(titleMatch[1]).replace(/\s+/g, ' ').trim().slice(0, 300) : null;

  const text = decodeEntities(markup.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
  const targets = scriptTargets(scripts.join('\n;\n'), base);

  return {
    title: title || null,
    canonical: canonicalTag ? resolve(canonicalTag.href, base) : null,
    base: base !== pageUrl ? base : null,
    robots,
    refresh: refreshIn(markup),
    noscriptRefresh: refreshIn(noscript.join('\n')),
    scripts: targets,
    /* A page with next to nothing to read and one literal target is a
       redirect stub: showing it is not what it is for. */
    stub: text.length <= 400 && targets.length === 1,
    textLength: text.length,
  };
}

/** `Link: <…>; rel="canonical"`, from every Link header value. */
export function linkCanonical(values, base) {
  for (const value of values) {
    for (const part of String(value).split(/,(?=\s*<)/)) {
      const match = /^\s*<([^>]*)>(.*)$/.exec(part);
      if (!match) continue;
      const rel = /;\s*rel\s*=\s*(?:"([^"]*)"|([^\s;,]+))/i.exec(match[2]);
      const rels = String(rel?.[1] ?? rel?.[2] ?? '').toLowerCase().split(/\s+/);
      if (rels.includes('canonical')) return resolve(match[1], base);
    }
  }
  return null;
}

/** Whether a set of robots directives keeps the page out of the index. */
export const noindex = content => /(?:^|[\s,:])(?:noindex|none)(?:$|[\s,])/i.test(String(content || ''));
