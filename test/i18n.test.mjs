import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const ROOT = dirname(fileURLToPath(import.meta.url)) + '/..';
const CONFIG = join(ROOT, 'src/config.json');

function build() {
  execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
}

// Single-language regression: the site's chosen language (site.lang) drives the
// whole site (no prefixed locale routes, no i18n content folders) — a
// non-English site must render its UI in that language at the flat paths.
test('single-language: site.lang=ja serves Japanese at /blog/ with no locale routes', () => {
  const orig = readFileSync(CONFIG, 'utf8');
  writeFileSync(CONFIG, orig.replace('"lang": "en"', '"lang": "ja"'));
  try {
    build();
    const blog = readFileSync(join(ROOT, 'dist/blog/index.html'), 'utf8');
    assert.match(blog, /<html lang="ja"/, '/blog/ must render in the site language');
    assert.ok(blog.includes('ブログ'), 'blog UI strings must be localized (not English)');
    assert.ok(
      !existsSync(join(ROOT, 'dist/en')),
      'no /en/ routes — kantan sites are single-language (the old i18n build produced dist/en)',
    );
    assert.ok(
      existsSync(join(ROOT, 'dist/blog/welcome/index.html')),
      'the seed post serves flat under /blog/welcome/',
    );
  } finally {
    writeFileSync(CONFIG, orig);
  }
});
