import { test } from 'node:test';
import assert from 'node:assert/strict';

// node --test with type stripping (Node 22): url.ts / seo.ts are dependency-free
// module sources, so they import directly — no build step, no mocks.

const { safeUrl } = await import('../src/lib/url.ts');
const { jsonLd } = await import('../src/lib/seo.ts');

test('safeUrl allows http(s), mailto, tel, site-relative and hash URLs', () => {
  assert.equal(safeUrl('https://example.com/x'), 'https://example.com/x');
  assert.equal(safeUrl('HTTP://EXAMPLE.COM'), 'HTTP://EXAMPLE.COM');
  assert.equal(safeUrl('mailto:hi@example.com'), 'mailto:hi@example.com');
  assert.equal(safeUrl('tel:+819012345678'), 'tel:+819012345678');
  assert.equal(safeUrl('/blog/hello/'), '/blog/hello/');
  assert.equal(safeUrl('#top'), '#top');
});

test('safeUrl collapses XSS/scheme-injection vectors to /', () => {
  for (const evil of [
    'javascript:alert(1)',
    'JaVaScRiPt:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'vbscript:msgbox',
    'file:///etc/passwd',
    '//evil.com',
    '/\\evil.com', // backslash normalizes to / → protocol-relative
    '/\t/evil.com', // tab stripped before URL resolution
    '/\n/evil.com',
    '/ /evil.com'.replace(' ', ''), // space isn't stripped — still assert plain
    ' https://ok.example', // leading space is NOT scheme-safe → collapse
  ]) {
    assert.equal(safeUrl(evil), '/', `must collapse: ${JSON.stringify(evil)}`);
  }
  assert.notEqual(safeUrl('javascript:alert(1)'), 'javascript:alert(1)');
});

test('safeUrl empty/falsy → /', () => {
  assert.equal(safeUrl(''), '/');
  assert.equal(safeUrl(undefined), '/');
  assert.equal(safeUrl(null), '/');
});

test('jsonLd escapes < so JSON-LD cannot close the inline script block', () => {
  const out = jsonLd({ name: '</script><script>alert(1)</script>' });
  assert.ok(!out.includes('</script'), 'raw </script> must never appear');
  assert.ok(out.includes('\\u003c'), '`<` is escaped to the JSON-valid \\u003c');
  assert.deepEqual(JSON.parse(out.replace(/\\u003c/g, '<')), {
    name: '</script><script>alert(1)</script>',
  });
});