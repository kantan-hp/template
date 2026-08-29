import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url)) + '/..';

// Parse public/_headers into { pattern: [[key, value], ...] } — url lines are
// unindented, header lines indented, `#` comments and blanks ignored.
function parseHeaders() {
  const rules = {};
  let cur = null;
  for (const line of readFileSync(join(ROOT, 'public/_headers'), 'utf8').split('\n')) {
    if (!line.trim() || line.trim().startsWith('#')) continue;
    if (/^\s/.test(line)) {
      const t = line.trim();
      if (t.startsWith('! ')) {
        rules[cur].push(['!' + t.slice(2).trim().toLowerCase(), '']);
        continue;
      }
      const m = t.match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
      assert.ok(m, `malformed _headers line: ${line}`);
      rules[cur].push([m[1].toLowerCase(), m[2]]);
    } else {
      cur = line.trim();
      rules[cur] = rules[cur] || [];
    }
  }
  return rules;
}

// Cloudflare Pages header semantics: a request matching several rules inherits
// ALL of them; same-name values join with ', '. `! Name` detaches the header.
function simulate(rules, patterns) {
  const final = {};
  for (const p of patterns) {
    for (const [k, v] of rules[p] || []) {
      if (k.startsWith('!')) delete final[k.slice(1)];
      else final[k] = final[k] ? final[k] + ', ' + v : v;
    }
  }
  return final;
}

test('_headers: admin paths get ONE self-contained CSP (site CSP detached via !)', () => {
  const rules = parseHeaders();
  const admin = simulate(rules, ['/*', '/admin', '/admin/*']);
  const csp = admin['content-security-policy'];
  assert.ok(csp, 'admin must still send a CSP after detaching the site one');
  assert.ok(!csp.includes(','), `admin CSP must not comma-join with the /* CSP (conjunction would break Sveltia): got ${csp}`);
  assert.ok(csp.includes('unpkg.com'), 'admin CSP must admit Sveltia script from unpkg.com');
  assert.ok(csp.includes('cdn.jsdelivr.net'), 'admin CSP must admit Sveltia icon font from jsdelivr');
  assert.ok(csp.includes("frame-ancestors 'none'"), 'admin CSP keeps frame-ancestors none');
});

test('_headers: admin pages keep site-wide hardening after the CSP detach', () => {
  const rules = parseHeaders();
  const admin = simulate(rules, ['/*', '/admin', '/admin/*']);
  assert.ok(admin['x-content-type-options']?.includes('nosniff'), 'nosniff must apply on /admin');
  assert.ok((admin['strict-transport-security'] || '').includes('max-age=31536000'), 'HSTS must apply on /admin');
  assert.ok((admin['x-frame-options'] || '').includes('DENY'), 'XFO DENY must apply on /admin');
});

test('_headers: site pages keep the conservative CSP (no unpkg/jsdelivr admission)', () => {
  const rules = parseHeaders();
  const site = simulate(rules, ['/*']);
  const csp = site['content-security-policy'];
  assert.ok(csp && csp.startsWith("default-src 'self'"), 'site CSP present');
  assert.ok(!csp.includes('unpkg.com') && !csp.includes('cdn.jsdelivr.net'), 'site CSP stays conservative');
  assert.ok(site['referrer-policy'] && site['x-content-type-options'], 'site basics present');
});