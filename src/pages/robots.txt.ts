// robots.txt — allow all crawlers and point them at the sitemap. The Sitemap
// line is emitted only when a real site URL resolves, so the placeholder
// (`your-site.example.com`) is never advertised to crawlers.
import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site;
  const hasRealSite = Boolean(siteUrl) && !String(siteUrl).includes('your-site.example.com');
  const lines = ['User-agent: *', 'Allow: /'];
  if (hasRealSite) {
    lines.push(`Sitemap: ${new URL('sitemap-index.xml', siteUrl!).href}`);
  }
  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
