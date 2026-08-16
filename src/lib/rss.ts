import rss from '@astrojs/rss';
import { site } from '../config';
import { defaultLocale } from '../i18n/ui';
import type { Locale } from '../i18n/ui';
import { getPostsFor, slugOf } from './blog';

export async function buildRss(locale: Locale) {
  // Mirror BaseLayout.astro's placeholder suppression: until a real site URL
  // is configured (PUBLIC_SITE_URL or src/config.json `site.url`), emitting the
  // feed would publish entry links pointing at the placeholder domain. Serve a
  // 410 with an empty body instead so feed readers fail fast (and the built
  // file is harmless) rather than subscribing to broken URLs.
  const siteEnv = import.meta.env.SITE ?? '';
  const isPlaceholder = !siteEnv || siteEnv.includes('your-site.example.com');
  if (isPlaceholder) {
    return new Response('', {
      status: 410,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  // The site's default locale (site.lang) serves unprefixed; everything else
  // gets its exact-code prefix. Compare against the *configured* default, not
  // a hardcoded 'en' — a ja-default site feeds /rss.xml as /ja/.
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  const posts = await getPostsFor(locale);
  return rss({
    title: site.title,
    description: site.description,
    site: new URL(`${prefix}/`, siteEnv),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${prefix}/blog/${slugOf(post)}/`,
    })),
  });
}
