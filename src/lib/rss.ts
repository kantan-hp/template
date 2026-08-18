import rss from '@astrojs/rss';
import { site } from '../config';
import { getAllPosts, slugOf } from './blog';

export async function buildRss() {
  // Mirror BaseLayout.astro's placeholder suppression: until a real site URL
  // is configured (PUBLIC_SITE_URL or src/config.json `site.url`), emitting the
  // feed would publish entry links pointing at the placeholder domain. Return a
  // 410 with a NULL body: Astro's generate skips writing a file whose
  // response.body is null, so dist/ gets no rss.xml and Pages serves a real
  // 404 — genuine fail-fast, not a 200 empty file.
  const siteEnv = import.meta.env.SITE ?? '';
  const isPlaceholder = !siteEnv || siteEnv.includes('your-site.example.com');
  if (isPlaceholder) {
    return new Response(null, {
      status: 410,
      headers: { 'content-type': 'text/plain; charset=utf-8' },
    });
  }

  const posts = await getAllPosts();
  return rss({
    title: site.title,
    description: site.description,
    site: new URL('/', siteEnv),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${slugOf(post)}/`,
    })),
  });
}
