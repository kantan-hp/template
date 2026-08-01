# Kantan HP — Lightweight Blog Starter for Cloudflare Pages

> **Kantan** (かんたん) means **simple** in Japanese. This is a minimal, fast,
> and beginner-friendly blog starter that runs for free on **Cloudflare Pages**.

**Read this in:** [English](README.md) · [日本語](README.ja.md) ·
[繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

It combines:

- **[Astro](https://astro.build)** — the static-site generator. Fast, no client-side
  JavaScript by default, easy to customize.
- **[Decap CMS](https://decapcms.org)** (formerly Netlify CMS) — a friendly web editor
  at `/admin` where you write posts and upload images **without touching code or git**.

Non-technical editors manage content from a web dashboard. A developer sets it up once,
and every saved post is published automatically.

---

## 📚 Content

- [Prerequisites](#prerequisites)
- [1. Run it locally (developers)](#1-run-it-locally-developers)
- [2. Publish to Cloudflare Pages](#2-publish-to-cloudflare-pages)
- [3. Writing posts with Decap CMS](#3-writing-posts-with-decap-cms)
- [4. Customizing the site](#4-customizing-the-site)
- [Directory layout](#directory-layout)
- [Project structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Prerequisites

**For developers:**

- [Node.js](https://nodejs.org) version **20** or newer
- A free [GitHub](https://github.com) account
- A free [Cloudflare](https://dash.cloudflare.com) account
- Git installed on your machine

**For editors (non-technical):** nothing to install — they just need a browser and a
GitHub account (or access via your organization).

---

## 1. Run it locally (developers)

```bash
# Clone this repository
git clone https://github.com/lavasecurity/kantan-hp.git
cd kantan-hp

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. You should see the
starter homepage.

To build a production version and preview it:

```bash
npm run build      # builds static site into dist/
npm run preview    # serves the built site locally
```

---

## 2. Publish to Cloudflare Pages

This starter is a **static site** — no server, no database — so it deploys anywhere.

### Option A: Cloudflare Pages (recommended)

1. On the [Cloudflare Dashboard](https://dash.cloudflare.com), go to
   **Workers & Pages → Create → Pages → Connect to Git**.
2. Authorize and select this repository.
3. In **Build settings**, set:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Click **Save and Deploy**. Cloudflare connect will install dependencies and build
   automatically on every push.

Your site is now live at `https://<your-project>.pages.dev`.

### Option B: Wrangler CLI (developers)

```bash
npm install -g wrangler
npx wrangler pages deploy dist --project-name kantan-hp
```

### Option C: Any static host

Build with `npm run build` and upload the `dist/` folder to any static host (Netlify,
Vercel, GitHub Pages, an S3 bucket, etc.).

> **Note:** change `site` in [`astro.config.mjs`](astro.config.mjs) from the placeholder
> `https://your-site.example.com` to your real domain so the RSS feed and sitemap point
> to the correct URLs.

---

## 3. Writing posts with Decap CMS

Once deployed, editors use the dashboard at **`https://<your-site>/admin`**.

### Enable GitHub login (one-time)

Decap CMS commits content to your Git repository on your behalf, so it needs to log in
as you.

**Option 1 — GitHub OAuth App (simplest for a team):**
1. Create a GitHub OAuth App: callback `https://<your-site>/admin`.
2. Add the app's client ID and secret as Cloudflare Pages **environment variables**
   `OAUTH_GITHUB_CLIENT_ID` and `OAUTH_GITHUB_CLIENT_SECRET`.
3. Configure `public/admin/config.yml`'s `backend` section.

> See **[docs/github-oauth-setup.md](docs/github-oauth-setup.md)** for the full,
> step-by-step walkthrough.

**Option 2 — Netlify Identity style (requires a gateway):** some dashboards host an
OAuth gateway for you. Follow the same env-var pattern above.

### The editor

- **New post:** click **Blog → New Blog**.
- **Fields:** Title, Description, Publish Date, Hero Image (upload or paste a URL),
  Tags, Draft (toggle), and the Body (WYSIWYG editor with an image button).
- **Save:** click **Save** to commit a draft, **Publish** to make it live.

Every save creates a Markdown file under `src/content/blog/`. Cloudflare connect detects
the push and **rebuilds automatically** — your post goes live within a minute.

> Local testing: Decap also has a local proxy. Run `npm run decap` in a separate
> terminal, then open `/admin` locally and choose the local backend.

---

## 4. Customizing the site

- **Site title & description:** edit [`src/config.ts`](src/config.ts).
- **Theme / colors & layout:** edit [`src/styles/global.css`](src/styles/global.css)
  and the front pages in [`src/pages/`](src/pages).
- **Post schema** (required fields): edit [`src/content/config.ts`](src/content/config.ts).
- **Decap editor fields:** edit [`public/admin/config.yml`](public/admin/config.yml).
- **Add CSS/JS:** add files to [`src/styles/`](src/styles) and import them, or put
  static assets in [`public/`](public).

See the **[Astro documentation](https://docs.astro.build)** for topics such as adding
Tailwind, custom components, or new content collections.

---

## Directory layout

```
kantan-hp/
├── public/               # static files copied as-is to the built site
│   ├── admin/            # Decap CMS dashboard (config.yml + index.html)
│   ├── images/           # images uploaded via the editor
│   └── favicon.svg
├── src/
│   ├── components/       # reusable .astro components
│   ├── content/
│   │   ├── blog/         # your blog posts (Markdown files)
│   │   └── config.ts     # post schema
│   ├── layouts/          # page layouts (BaseLayout.astro)
│   ├── pages/            # routes: home, /blog, /blog/[slug], /rss.xml
│   ├── styles/           # global CSS
│   └── config.ts         # site metadata
├── .github/
│   └── workflows/        # CI checks (typecheck + build)
├── astro.config.mjs      # Astro configuration
└── package.json
```

---

## Project structure

| File | Purpose |
| --- | --- |
| `src/config.ts` | Site title, description, localized names |
| `src/layouts/BaseLayout.astro` | Shared header/footer/HTML for all pages |
| `src/pages/index.astro` | Homepage |
| `src/pages/blog/index.astro` | Blog listing (newest first) |
| `src/pages/blog/[slug].astro` | Single post template |
| `src/pages/rss.xml.ts` | RSS feed generator |
| `public/admin/config.yml` | Decap CMS collections & fields |
| `.github/workflows/ci.yml` | Runs `astro check` + `astro build` on push/PR |

---

## Contributing

Contributions are welcome. Please keep PRs focused and make sure CI is green before they
are ready to merge:

```bash
npm run check   # static type check
npm run build   # production build
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

---

## License

MIT © 2026 Lava Security
