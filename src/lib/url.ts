// URL scheme allowlist for config-sourced href/src values. The CMS Settings
// tab (src/config.json) feeds nav, socials and heroImage straight into the DOM;
// without scheme validation a compromised CMS account (or a careless owner)
// could plant a `javascript:` / `data:` URL as an href and get an XSS vector on
// every page. This helper passes through only safe schemes and site-relative
// paths; everything else collapses to `/`.

const SAFE_URL = /^(?:https?:|mailto:|tel:|\/(?!\/)|#)/;

/** Return `url` only if its scheme is allowlisted, else `/`. */
export function safeUrl(url: string | undefined | null): string {
  if (!url) return '/';
  return SAFE_URL.test(url) ? url : '/';
}
