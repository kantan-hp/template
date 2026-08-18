// Shared helpers for the single-language pages. kantan sites serve in their
// chosen language (site.lang) at `/`; content lives flat in src/content/blog
// and src/content/pages with no locale subfolders.
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

export const PAGE_SIZE = 6;

// Every published post, newest first.
export async function getAllPosts(): Promise<CollectionEntry<'blog'>[]> {
  const all = await getCollection('blog');
  return all
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// The post's slug (id minus the .md extension).
export function slugOf(post: CollectionEntry<'blog'>): string {
  return post.id.replace(/\.md$/, '');
}

// Paginated blog-index entries. Page 1 stays at /blog/, later pages at
// /blog/page/N/.
export function blogIndexPaths(posts: CollectionEntry<'blog'>[]) {
  const lastPage = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));
  return Array.from({ length: lastPage }, (_, i) => {
    const current = i + 1;
    return {
      params: { page: current === 1 ? undefined : `page/${current}` },
      props: {
        posts: posts.slice(i * PAGE_SIZE, (i + 1) * PAGE_SIZE),
        currentPage: current,
        lastPage,
      },
    };
  });
}

// The about entry.
export async function getAbout(): Promise<CollectionEntry<'pages'> | undefined> {
  const pages = await getCollection('pages');
  return pages.find((page) => page.id === 'about');
}

// getStaticPaths entries for the individual post routes.
export function postPaths(posts: CollectionEntry<'blog'>[]) {
  return posts.map((post) => ({
    params: { slug: slugOf(post) },
    props: { post },
  }));
}
