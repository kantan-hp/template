// HTTPS enforcement for custom domains.
//
// Cloudflare enforces https on *.pages.dev at the platform level, but a user's
// own custom domain can be reached over plain http unless its zone has "Always
// Use HTTPS" (a setting in the user's Cloudflare account that kantan cannot
// touch). This middleware 301s http → https on every request using the
// forwarded-proto header, so a provisioned site is always served over https on
// any domain — no zone-scoped token required.
export const onRequest = async ({ request, next }) => {
  const proto = (request.headers.get('x-forwarded-proto') || '').toLowerCase();
  if (proto === 'http') {
    const url = new URL(request.url);
    url.protocol = 'https:';
    return Response.redirect(url.href, 301);
  }
  return next();
};
