// Locale helpers for the single-language template. kantan sites serve entirely
// in their chosen language (site.lang) at `/` — there are no locale-prefixed
// routes — so every path resolves to the default locale and URLs are plain.
import { defaultLocale } from './ui';
import type { Locale } from './ui';

// The locale for any pathname: always the site's single language.
export function getLocaleFromPath(_pathname: string): Locale {
  return defaultLocale;
}

export function getLocaleFromUrl(_url: URL): Locale {
  return defaultLocale;
}

// <html lang> tag (BCP-47 — the locale codes already are).
export function getLanguageFromLocale(locale: Locale): string {
  return locale;
}

// Paths carry no locale prefix; the input is already the canonical path.
export function getPathWithoutLocale(pathname: string): string {
  return pathname;
}

// The site is single-language, so the localized URL of a path is the path.
export function getLocalizedUrl(pathname: string, _locale: Locale): string {
  return pathname;
}
