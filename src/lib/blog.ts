// Shared helpers for the locale-scoped pages. English lives at the root of
// src/pages/ (prefixDefaultLocale: false); the other locales live in a
// [locale]/ folder. Both layers use these builders so the page logic isn't
// duplicated.
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import { defaultLocale, locales } from '../i18n/ui';
import type { Locale } from '../i18n/ui';

export const PAGE_SIZE = 6;

// The locales rendered by the [locale]/ pages — everything except the site's
// default language (which serves at the root).
export function nonDefaultLocales(): Locale[] {
  return locales.filter((locale) => locale !== defaultLocale);
}

// getStaticPaths entries for the simple [locale] routes (index, about, rss).
export function localePaths(localesToBuild: Locale[]) {
  return localesToBuild.map((locale) => ({ params: { locale } }));
}

export async function getPostsFor(locale: Locale): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog');
  // Collection ids are lowercased by the glob loader (zh-Hant -> zh-hant), so
  // match the locale folder prefix case-insensitively.
  const prefix = `${locale.toLowerCase()}/`;
  return all
    .filter((post) => !post.data.draft && post.id.startsWith(prefix))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// The post's slug (id minus the locale-folder prefix, minus any extension).
export function slugOf(post: CollectionEntry<'blog'>): string {
  return post.id.replace(/^[^/]+\//, '').replace(/\.md$/, '');
}

// Paginated blog-index entries. When `locale` is given the params include the
// locale segment (for [locale]/blog/[...page]); when omitted the entry belongs
// to the English root layer (src/pages/blog/[...page]).
export function blogIndexPaths(posts: CollectionEntry<'blog'>[], locale?: Locale) {
  const lastPage = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  return Array.from({ length: lastPage }, (_, i) => {
    const current = i + 1;
    return {
      params: locale
        ? { locale, page: current === 1 ? undefined : `page/${current}` }
        : { page: current === 1 ? undefined : `page/${current}` },
      props: {
        posts: posts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
        currentPage: current,
        lastPage,
        locale: (locale ?? 'en') as Locale,
      },
    };
  });
}

// getStaticPaths entries for the individual post routes.
export function postPaths(posts: CollectionEntry<'blog'>[], locale?: Locale) {
  return posts.map((post) => ({
    params: locale ? { locale, slug: slugOf(post) } : { slug: slugOf(post) },
    props: { post },
  }));
}
