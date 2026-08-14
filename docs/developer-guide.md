# Developer guide

This is the technical companion to the layman-facing [README](../README.md). It covers
local setup, customization, and the internals of the starter.

## Stack

- **[Astro](https://astro.build)** — static site generator (Node.js/npm, version 22+).
- **[Sveltia CMS](https://sveltiacms.app)** — web editor at `/admin` that commits Markdown
  to your Git repo. (Successor to Netlify/Decap CMS; reads the same `config.yml`.)
- **Cloudflare Pages** — free hosting; rebuilds on every push.

## Run locally

```bash
git clone https://github.com/kantan-hp/template.git
cd kantan-hp
npm install
npm run dev          # http://localhost:4321
```

```bash
npm run build        # static site -> dist/
npm run preview      # serve the built site locally
npm run check        # typecheck (Astro/TS)
```

## Deploy

Build command `npm run build`, output directory `dist`. The normal path to a live
site is the **kantan panel** (https://kantan-hp.fyi), which provisions a direct-upload
Cloudflare Pages project plus a deploy workflow for you. You can also deploy the
`dist/` folder anywhere (Cloudflare Pages, Netlify, Vercel, S3, ...).

> Change `site` in [`astro.config.mjs`](../astro.config.mjs) from the placeholder
> `https://your-site.example.com` to your real domain so the RSS feed and sitemap point
> to the right URLs.
>
> The build reads the site URL from, in priority order: the `PUBLIC_SITE_URL`
> environment variable (set it in the Cloudflare Pages project or the deploy
> workflow), the `site.url` field in `src/config.json`, or the placeholder.

## Where things live

| Area | File |
| --- | --- |
| Site title, tagline, theme, nav | [`src/config.json`](../src/config.json) (edited by the editor's **Settings** tab) |
| Theme presets (AstroPaper color schemes) | [`src/styles/themes.css`](../src/styles/themes.css) |
| Layout / component styles | [`src/styles/global.css`](../src/styles/global.css) |
| Shared components | [`src/components/`](../src/components) (Header, Footer, Card, ...) |
| Pages (home, blog list, about) | [`src/pages/`](../src/pages) |
| Layouts (head, header/footer) | [`src/layouts/`](../src/layouts) |
| Blog post schema | [`src/content.config.ts`](../src/content.config.ts) |
| Editor fields | [`public/admin/config.yml`](../public/admin/config.yml) |
| Post content | [`src/content/blog/`](../src/content/blog) (Markdown) |
| Standalone pages (About) | [`src/content/pages/`](../src/content/pages) (Markdown) |
| Static assets / images | [`public/`](../public) |
| CI (typecheck + build) | [`.github/workflows/ci.yml`](../.github/workflows/ci.yml) |

## Folder layout

```
kantan-hp/
├── public/          # static assets copied to the built site
│   ├── admin/       # Editor dashboard (config.yml, index.html)
│   └── images/      # images uploaded via the editor
├── src/
│   ├── components/  # Header, Footer, Card, Datetime, Tag, Socials, Pagination,
│   │                #   plus the shared page bodies: Home, BlogIndex, AboutView
│   ├── content/
│   │   ├── blog/    # blog posts, one folder per locale: {en,ja,zh-Hant,zh-Hans}/
│   │   └── pages/   # standalone pages, e.g. about.md, per locale folder
│   ├── i18n/        # ui.ts (UI strings per locale), utils.ts (locale helpers)
│   ├── layouts/     # BaseLayout.astro, PostLayout.astro
│   ├── lib/         # blog.ts / rss.ts — shared page-building logic
│   ├── pages/       # English at the root; /ja/, /zh-Hant/, /zh-Hans/ under [locale]/
│   ├── scripts/     # theme toggle
│   ├── styles/      # global.css, themes.css
│   ├── config.json  # site settings (edited via the Settings tab)
│   └── config.ts    # typed accessors for config.json
├── astro.config.mjs
└── package.json
```

## Settings tab and theme presets

The editor's **Settings** tab edits `src/config.json` (title, tagline, author, theme
preset, nav, socials) and commits it like a post, so changes deploy automatically. The
theme preset selects an **AstroPaper color scheme** — the palettes live in
`src/styles/themes.css` and are keyed off `data-preset` on `<html>`. Light/dark mode is
toggled per visitor and stored in `localStorage`; the `data-theme` attribute is set
before paint to avoid a flash of the wrong theme.

To add a new preset: add its light/dark variable block to `themes.css` and its option to
the `theme.preset` select in `public/admin/config.yml`.

## Content contract

Blog posts live in `src/content/blog/<locale>/` with frontmatter `title`, `description`,
`pubDate`, `updatedDate`, `heroImage`, `tags`, `draft` — matching the editor's **Blog**
collection. Drafts are visible in the editor but never built, so the editor and the
site agree on what is published. Standalone pages (the **Pages** tab) live in
`src/content/pages/<locale>/` with `title`, `description` and a Markdown body.

A post is published **per locale**: a file in `src/content/blog/ja/` only appears on
`/ja/` routes. If a post has no file for a locale, it simply doesn't appear there — there is
no fallback or auto-translation. The locale is derived from the folder; note that Astro's
content loader lowercases entry ids (`zh-Hant/welcome.md` → id `zh-hant/welcome`), so
locale filters are case-insensitive.

> The editor normalizes Markdown on save (Lexical-based), so a Decap-era post may get
> light reformatting (list markers, bold/italic, soft line breaks) the first time it's
> edited in Sveltia. Astro renders soft line breaks as spaces.

## Internationalization

The site ships four locales — English, 日本語, 繁體中文, 简体中文 — matching the README
translations. The site's **default language** is `site.lang` in `src/config.json` (fallback
`en`; the kantan panel sets it when a site is created). Routing is **model (a)**: the default
locale is baked into Astro's `defaultLocale` at build time and serves **unprefixed** (`/`,
`/blog/`, ...); the other three live at their exact-code prefix (`/en/`, `/ja/`, `/zh-Hant/`,
`/zh-Hans/` as appropriate). English sites behave exactly as before (English at `/`).

- **UI strings** (nav, hero, buttons, pagination, 404, skip link) live in
  `src/i18n/ui.ts`, keyed by locale. Content (posts, about pages, site title/tagline) is
  authored per locale and not part of the dictionary.
- **The language switcher** is in the footer, right-aligned, showing the four native names;
  the current locale is marked. It switches to the same page in each locale. Because it
  lives in `BaseLayout`'s footer, it appears on every page. **Known limitation:** the switcher
  links to the same path in each locale even when that page has no translation — a post that
  exists only in English gives `/ja/blog/<slug>/`, which lands on the (default-locale) 404 with
  the switcher + a home link. Translating a post (creating its `<locale>/` file) makes the
  switch land correctly.
- **The editor** shows per-locale tabs for blog posts and pages (Sveltia `i18n` with
  `multiple_folders`). Dates, hero images and tags are duplicated across locales; titles,
  descriptions and bodies are translated. Settings (`src/config.json`) is **not** localized —
  the site title, theme and nav are global — but it carries the `lang` select so the default
  language survives CMS saves (changing it changes which locale serves at `/`).
- **To add a locale:** add it to `i18n.locales` in `astro.config.mjs`, add its strings to
  `src/i18n/ui.ts`, add a `src/content/blog/<locale>/` (and `pages/<locale>/`) folder, and
  add it to `i18n.locales` + the blog/pages collections in `public/admin/config.yml`.
- **RSS** is per-locale: `/rss.xml` (the default locale) and `/<locale>/rss.xml`.
- **The 404** is pre-rendered once in the site's default locale (`output: 'static'`) — per-locale
  404 strings only appear in `astro dev`/SSR. On static hosts a missing `/ja/...` path serves the
  default-locale 404; the footer switcher still links visitors to each locale's home.
- **Editor default tab:** Sveltia's `i18n.default_locale` is templated from `site.lang` at
  provisioning (fyi), so new sites open the editor in their language. If an owner later changes
  the language in Settings, the build default follows `site.lang` but the editor keeps the
  provisioned `default_locale` until a re-provision.
- **Seed content is English-only** (a single-locale welcome + about). A site born in another
  language starts with an empty blog in that language — content is author-authored.
- **Legacy (pre-i18n) sites:** content that was created before this template (top-level
  `src/content/blog/<slug>.md`, `src/content/pages/about.md`) is treated as belonging to the
  site's default locale, so an updated existing site keeps rendering its posts and About page.
  New content is written into the per-locale folders. If a `<locale>/` file and an unprefixed
  file would produce the same slug, the prefixed one wins.

## Editor login

To publish from `/admin`, the editor authenticates to GitHub through the panel's shared
OAuth proxy. Sites created by the kantan panel are configured automatically — the panel
injects the editor's `repo`, `base_url`, and `auth_endpoint` into
`public/admin/config.yml` at provisioning, so there is nothing to set up. For a manual
fork, point `repo` at your own repository and create the site through the panel to get a
working editor login.

## Versioning and updates (panel-provisioned sites)

Sites created by the kantan panel are a **snapshot of this template at provision time**,
recorded as the site's `template_version` (the template `main` commit SHA, panel-owned in
its D1 registry). This makes core updates safe and user-facing rather than a data-loss
trap.

**The user data contract — the entire user-owned mutable surface:**

| Path | What lives there |
| --- | --- |
| `src/content/**` | Blog posts and pages (Markdown, frontmatter `title`/`description`/`pubDate`/`updatedDate`/`heroImage`/`tags`/`draft`) |
| `public/images/**` | Uploaded media (hero images, in-body images) |
| `src/config.json` | Site settings (title, tagline, author, theme preset, nav, socials) |

Everything else — `package.json`, `astro.config.mjs`, `src/components|layouts|pages|styles|scripts`,
`src/content.config.ts`, `public/admin/`, `.github/workflows/` — is **core** and is updated by
the panel's versioned-update flow. **Updates never touch the user data contract.**

**How updates work (from the panel):**

1. The panel shows each site a badge: **Up to date**, **Update available**, or **Baseline
   needed**.
2. Before offering an update the panel runs a **fitness gate**: it compares the site's core
   file tree against `template@recorded_version`. A site whose core files were modified or
   deleted is **dirty** and its update is **blocked** with a list of the drifted files — no
   changes are made. (Pure *additions* of new files are tolerated.)
3. A clean site shows the file-level diff (`template@N → template@N+1`), including any **major
   bumps** (Astro/Sveltia majors), which require an explicit confirm. Updates are only offered
   for template revisions whose own CI (`npm run check` + `npm run build`) passes.
4. On confirm, the panel applies the diff to **core paths only**, re-injects the site-specific
   `public/admin/config.yml` backend lines (`repo` / `base_url` / `auth_endpoint`), and commits
   — your existing `deploy.yml` rebuilds and redeploys. The panel advances the recorded version
   on success.

Because the user has root on their own repo, the guarantee is **detection and safe handling of
drift, never prevention** — the user can always edit or break their own site. The integrity
anchor is server-side (`template_version` in D1), so a user cannot fake "clean" by editing
files.

> Sites created before version tracking existed have no recorded baseline. The panel shows
> **Baseline needed** and only accepts a baseline when the site's core still matches the
> current template. A dirty site's escape hatch is the content-transfer flow: start a fresh
> site and bring your posts, images, and settings over.

## Contributing

```bash
npm run check && npm run build
```

Then open a PR. See [`CONTRIBUTING.md`](../CONTRIBUTING.md).
