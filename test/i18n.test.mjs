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

// Model-a regression: the site's default language (site.lang) must serve
// unprefixed at /, with its UI localized — the root blog layer once hardcoded
// 'en', which silently broke every non-English site.
test('model a: site.lang=ja serves Japanese at /blog/ with no /ja/ routes', () => {
  const orig = readFileSync(CONFIG, 'utf8');
  writeFileSync(CONFIG, orig.replace('"lang": "en"', '"lang": "ja"'));
  try {
    build();
    const blog = readFileSync(join(ROOT, 'dist/blog/index.html'), 'utf8');
    assert.match(blog, /<html lang="ja"/, '/blog/ must render in the default locale');
    assert.ok(blog.includes('ブログ'), 'blog UI strings must be localized (not English)');
    assert.ok(
      !existsSync(join(ROOT, 'dist/ja')),
      'ja is the default locale — it must serve at the root, never at /ja/',
    );
    assert.ok(
      existsSync(join(ROOT, 'dist/en/blog/welcome/index.html')),
      'the en seed post should live under /en/ on a ja-default site',
    );
  } finally {
    writeFileSync(CONFIG, orig);
  }
});
