import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// Resolve the real site URL so RSS/sitemap point at the live domain.
// Priority: build-time env var (set by the kantan panel or deploy.yml) >
// `site.url` in src/config.json > the placeholder below.
function resolveSite() {
  if (process.env.PUBLIC_SITE_URL) return process.env.PUBLIC_SITE_URL;
  try {
    const raw = JSON.parse(
      readFileSync(fileURLToPath(new URL('./src/config.json', import.meta.url)), 'utf8'),
    );
    const settings = Array.isArray(raw) ? raw[0] : raw;
    if (settings?.site?.url) return settings.site.url;
  } catch {
    /* fall through to the placeholder */
  }  return 'https://your-site.example.com';
}

// https://astro.build/config
const resolvedSite = resolveSite();
// .includes() (not ===) so it stays in sync with the same predicate used in
// rss.ts / BaseLayout.astro / PostLayout.astro / robots.txt.ts — a trailing
// slash or scheme nuance shouldn't split-brain the placeholder detection.
const isPlaceholderSite = resolvedSite.includes('your-site.example.com');

// Sitemap + RSS only make sense once a real site URL is configured; until then
// (placeholder) emitting sitemap-*.xml / rss.xml would publish broken links to
// a nonexistent domain. Mirrors the canonical/hreflang suppression in
// BaseLayout.astro and the RSS route gating.
export default defineConfig({
  site: resolvedSite,
  integrations: isPlaceholderSite
    ? []
    : [
        // Sitemap only (no i18n xhtml:link alternates): @astrojs/sitemap's
        // i18n option doesn't cleanly support prefixDefaultLocale:false — the
        // default locale would need an empty-string prefix which fails its
        // validator. BaseLayout.astro already emits correct <link rel=alternate
        // hreflang> tags in HTML, so the sitemap alternates are duplicative.
        sitemap(),
      ],
  output: 'static',
  server: {
    port: 4321,
  },
});
