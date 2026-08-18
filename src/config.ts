// Site-wide settings for the blog.
//
// This is the JSON file the CMS **Settings** tab edits (see
// public/admin/config.yml). It is a plain JSON object whose keys match the
// collection's fields. You can also edit this file by hand; the site rebuilds
// on the next deploy.

import userConfig from './config.json';

// The JSON type is inferred from the file's current content (via
// resolveJsonModule), so an editor removing an optional key (e.g. clearing
// Author) would change the inferred type and break `npm run check`. Cast to an
// explicit interface whose CMS-optional fields are optional instead.
export interface NavItem {
  label: string;
  url: string;
}

export interface SocialItem {
  name: string;
  url: string;
}

export interface SiteSettings {
  site?: {
    title?: string;
    description?: string;
    author?: string;
    url?: string;
    // The site's single language (BCP-47). Drives the site-wide UI strings.
    // The kantan provisioner sets this when a site is created; fallback `en`.
    lang?: string;
  };
  theme?: {
    preset?: string;
  };
  nav?: NavItem[];
  socials?: SocialItem[];
}

const settings = (userConfig as SiteSettings) ?? {};

export const site = {
  title: settings.site?.title ?? 'Kantan HP',
  description:
    settings.site?.description ??
    'A free, simple blog you can publish in minutes — no server, no database, no code.',
  author: settings.site?.author ?? 'Kantan HP',
  lang: settings.site?.lang ?? 'en',
};

export const theme = {
  // Theme presets map to the AstroPaper color schemes in src/styles/themes.css
  // (paper, kha-yan, nila, jadeite, pyit-tine-htaung, deep-purple, ember, espresso).
  preset: settings.theme?.preset ?? 'paper',
};

// `theme-color` (mobile browser chrome) for the active preset. Light-first
// presets use their light accent; the "paper light + dark accent" presets
// (deep-purple, ember, espresso) are defined by their dark accent. Mirrors the
// accent values in src/styles/themes.css.
const PRESET_THEME_COLORS: Record<string, string> = {
  paper: '#006cac',
  'kha-yan': '#6e10cf',
  nila: '#6760b4',
  jadeite: '#027c6d',
  'pyit-tine-htaung': '#aa0215',
  'deep-purple': '#eb3fd3',
  ember: '#ff3737',
  espresso: '#ee781e',
};

export const themeColor = PRESET_THEME_COLORS[theme.preset] ?? PRESET_THEME_COLORS.paper;

export const nav: NavItem[] = settings.nav ?? [];

export const socials: SocialItem[] = settings.socials ?? [];
