// Shared helpers for the locale-scoped pages. The site's default language
// (site.lang) serves at the root of src/pages/ (prefixDefaultLocale: false);
// the other locales live in a [locale]/ folder. Both layers use these builders
// so the page logic isn't duplicated.
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
  // match the locale folder prefix case-insensitively. Pre-i18n content sits at
  // the top level (unprefixed ids, e.g. `welcome`); it belongs to the site's
  // DEFAULT locale, so legacy sites keep rendering after a template update.
  // When both an unprefixed file and a <locale>/ file produce the same slug,
  // the prefixed one wins (deterministic precedence; never a duplicate page).
  const prefix = `${locale.toLowerCase()}/`;
  const prefixed = all.filter((post) => !post.data.draft && post.id.startsWith(prefix));
  const prefixedSlugs = new Set(prefixed.map(slugOf));
  return [
    ...prefixed,
    ...all.filter(
      (post) =>
        !post.data.draft &&
        locale === defaultLocale &&
        !post.id.includes('/') &&
        !prefixedSlugs.has(slugOf(post)),
    ),
  ].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// The post's slug (id minus a leading locale-folder segment, minus any
// extension). Works for both prefixed (`en/welcome` → `welcome`) and unprefixed
// (`welcome` → `welcome`) ids.
export function slugOf(post: CollectionEntry<'blog'>): string {
  return post.id.replace(/^[^/]+\//, '').replace(/\.md$/, '');
}

// Paginated blog-index entries. `prefixed` adds the locale segment to the route
// params (the [locale]/ layer); the root layer passes prefixed: false and still
// carries the locale in props so the UI strings localize to the default locale.
export function blogIndexPaths(
  posts: CollectionEntry<'blog'>[],
  { locale, prefixed }: { locale: Locale; prefixed: boolean },
) {
  const lastPage = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  return Array.from({ length: lastPage }, (_, i) => {
    const current = i + 1;
    return {
      params: prefixed
        ? { locale, page: current === 1 ? undefined : `page/${current}` }
        : { page: current === 1 ? undefined : `page/${current}` },
      props: {
        posts: posts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
        currentPage: current,
        lastPage,
        locale,
      },
    };
  });
}

// The about entry for a locale: the prefixed <locale>/about.md wins; for the
// site's default locale only, fall back to the legacy unprefixed about.md so
// pre-i18n sites keep rendering their About page after an update.
export async function getAboutFor(locale: Locale): Promise<CollectionEntry<'pages'> | undefined> {
  const pages = await getCollection('pages');
  const prefixed = pages.find((page) => page.id.startsWith(`${locale.toLowerCase()}/about`));
  if (prefixed) return prefixed;
  if (locale === defaultLocale) return pages.find((page) => page.id === 'about');
  return undefined;
}

// Locales that have a published post with the given slug (for hreflang
// alternates: only announce locales where the post actually exists, so a
// translation-missing locale never advertises a 404 alternate).
export async function localesForSlug(slug: string): Promise<Locale[]> {
  const out: Locale[] = [];
  for (const locale of locales) {
    const posts = await getPostsFor(locale);
    if (posts.some((post) => slugOf(post) === slug)) out.push(locale);
  }
  return out;
}

// getStaticPaths entries for the individual post routes.
export function postPaths(posts: CollectionEntry<'blog'>[], locale?: Locale) {
  return posts.map((post) => ({
    params: locale ? { locale, slug: slugOf(post) } : { slug: slugOf(post) },
    props: { post },
  }));
}
