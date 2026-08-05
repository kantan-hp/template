// Locale helpers for the i18n routes. English is the default locale and is
// served unprefixed (/) — see the `i18n` block in astro.config.mjs.
//
// Locale-prefixed paths keep the exact locale code (e.g. /zh-Hant/), matching
// the routes Astro builds from the [locale] folders. `getRelativeLocaleUrl`
// lowercases the segment, so URLs are built by hand here.
import { defaultLocale, locales } from './ui';
import type { Locale } from './ui';

// The locale for a pathname, reading the leading prefix (/ja/, /zh-Hant/...).
// Paths without a recognized prefix belong to the default (English) locale.
// Matching is case-insensitive (the real routes keep case; this tolerates
// lowercase requests on the 404 page).
export function getLocaleFromPath(pathname: string): Locale {
  const lower = pathname.toLowerCase();
  for (const locale of locales) {
    if (locale === defaultLocale) continue;
    if (lower === `/${locale.toLowerCase()}` || lower.startsWith(`/${locale.toLowerCase()}/`)) {
      return locale;
    }
  }
  return defaultLocale;
}

export function getLocaleFromUrl(url: URL): Locale {
  return getLocaleFromPath(url.pathname);
}

// <html lang> tag (BCP-47 — the locale codes already are).
export function getLanguageFromLocale(locale: Locale): string {
  return locale;
}

// Strip the leading locale prefix (English paths have none).
export function getPathWithoutLocale(pathname: string): string {
  const locale = getLocaleFromPath(pathname);
  if (locale === defaultLocale) return pathname;
  return pathname.replace(new RegExp(`^/${locale}`, 'i'), '') || '/';
}

// The same page in another locale, e.g. /ja/blog/foo <-> /blog/foo.
// English stays at the root; other locales get their exact-code prefix.
export function getLocalizedUrl(pathname: string, locale: Locale): string {
  const base = getPathWithoutLocale(pathname);
  if (locale === defaultLocale) return base;
  return base === '/' ? `/${locale}/` : `/${locale}${base}`;
}
