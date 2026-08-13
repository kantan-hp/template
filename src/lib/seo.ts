// SEO helpers shared by the layouts: URL absolutization against the resolved
// site, and JSON-LD serialization that is safe to inline in a <script> block.

/** Absolute URL from a site-relative path (or pass through an absolute URL). */
export function absoluteUrl(pathOrUrl: string, site: URL): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return new URL(pathOrUrl, site).href;
}

/** JSON-LD string safe to inline in a <script> block (`<` escaped). */
export function jsonLd(obj: unknown): string {
  return JSON.stringify(obj).replace(/</g, '\\u003c');
}
