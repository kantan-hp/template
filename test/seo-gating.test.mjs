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

// Placeholder gating: with no real site URL, RSS/sitemap must NOT be emitted
// and canonical/og:url must be omitted — they would otherwise point crawlers at
// your-site.example.com. With a real URL (PUBLIC_SITE_URL), all of them appear.
test('placeholder site: no rss.xml/sitemap, no canonical/og:url', () => {
  const orig = readFileSync(CONFIG, 'utf8');
  try {
    build();
    assert.ok(!existsSync(join(ROOT, 'dist/rss.xml')), 'rss.xml must be gated (410/no file)');
    assert.ok(!existsSync(join(ROOT, 'dist/sitemap-index.xml')), 'sitemap must be gated');
    const home = readFileSync(join(ROOT, 'dist/index.html'), 'utf8');
    assert.ok(!home.includes('rel="canonical"'), 'canonical omitted on placeholder');
    assert.ok(!home.includes('property="og:url"'), 'og:url omitted on placeholder');
    const blog = readFileSync(join(ROOT, 'dist/blog/index.html'), 'utf8');
    assert.ok(!blog.includes('rel="canonical"'), 'canonical omitted on /blog/ too');
    const welcome = readFileSync(join(ROOT, 'dist/blog/welcome/index.html'), 'utf8');
    assert.ok(!welcome.includes('rel="canonical"'), 'canonical omitted on posts too');
  } finally {
    writeFileSync(CONFIG, orig);
  }
});

test('real site URL (PUBLIC_SITE_URL): rss.xml, sitemap, canonical, og:url all present', () => {
  const orig = readFileSync(CONFIG, 'utf8');
  const origEnv = process.env.PUBLIC_SITE_URL;
  process.env.PUBLIC_SITE_URL = 'https://my-blog.example.org';
  try {
    build();
    assert.ok(existsSync(join(ROOT, 'dist/rss.xml')), 'rss.xml emitted once a real URL resolves');
    assert.ok(existsSync(join(ROOT, 'dist/sitemap-index.xml')), 'sitemap emitted');
    const rss = readFileSync(join(ROOT, 'dist/rss.xml'), 'utf8');
    assert.ok(rss.includes('https://my-blog.example.org/'), 'feed links use the real origin');
    assert.ok(!rss.includes('your-site.example.com'), 'placeholder domain must not leak into the feed');

    const home = readFileSync(join(ROOT, 'dist/index.html'), 'utf8');
    assert.ok(
      home.includes('rel="canonical" href="https://my-blog.example.org/"'),
      'home canonical = site origin',
    );
    assert.ok(
      home.includes('property="og:url" content="https://my-blog.example.org/"'),
      'home og:url = site origin',
    );
    assert.ok(!home.includes('your-site.example.com'), 'placeholder never reaches the head');

    const blogPage = readFileSync(join(ROOT, 'dist/blog/index.html'), 'utf8');
    assert.ok(
      blogPage.includes('rel="canonical" href="https://my-blog.example.org/blog/"'),
      'blog canonical follows the pathname',
    );

    const post = readFileSync(join(ROOT, 'dist/blog/welcome/index.html'), 'utf8');
    assert.ok(
      post.includes('rel="canonical" href="https://my-blog.example.org/blog/welcome/"'),
      'post canonical = page path',
    );
  } finally {
    if (origEnv === undefined) delete process.env.PUBLIC_SITE_URL;
    else process.env.PUBLIC_SITE_URL = origEnv;
    writeFileSync(CONFIG, orig);
  }
});