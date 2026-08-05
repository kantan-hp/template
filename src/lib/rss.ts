import rss from '@astrojs/rss';
import { site } from '../config';
import type { Locale } from '../i18n/ui';
import { getPostsFor, slugOf } from './blog';

export async function buildRss(locale: Locale) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  const posts = await getPostsFor(locale);
  return rss({
    title: site.title,
    description: site.description,
    site: new URL(`${prefix}/`, import.meta.env.SITE),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `${prefix}/blog/${slugOf(post)}/`,
    })),
  });
}
