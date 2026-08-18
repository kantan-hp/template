# Kantan HP — a free, easy blog you can publish in minutes

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Sveltia CMS](https://img.shields.io/badge/Sveltia%20CMS-0.178.0-4a90d9)](https://sveltiacms.app)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Kantan** (かんたん) means **simple** — and that's the whole idea.

Kantan HP is a **ready-made blog** that costs **nothing** to run and is **easy to edit**
through a friendly web dashboard — no coding, no server, no database to manage.

**Read this in:** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## What you get

- A **working blog** for free (hosted on Cloudflare Pages)
- A **web editor** at `your-site.com/admin` — write posts, add pictures, hit publish
- A **Settings** tab to change the site title, tagline, and theme — no code
- Your site serves in **your chosen language** — English, 日本語, 繁體中文, or 简体中文 — and
  the editor follows the same language. No language tabs to manage.
- A welcome post already published, so your site is alive from the first deploy
- Editors don't need to touch code or git. Just a browser.

---

## How to get started

1. **Create your site** — go to **[kantan-hp.fyi](https://kantan-hp.fyi)** and create a site
   in a few clicks. You need a (free) GitHub account and a (free) Cloudflare account.
2. **Start writing** — open `your-site.com/admin`, write posts, and hit publish. The panel
   sets up editor login for you, so there is no separate GitHub-login step.

### Step 1 — Create your site

Go to **[kantan-hp.fyi](https://kantan-hp.fyi)** and sign in with your email. Connect your
GitHub account, paste a Cloudflare API token, and pick a name. The panel generates the
repository, deploys it to Cloudflare Pages, and hands you a live `your-site.pages.dev`
address — all in about a minute.

### Step 2 — Write your first post

Open `your-site.pages.dev/admin`, click **Blog → New Blog**, write your title and text,
upload a picture, and press **Publish**. It goes live within about a minute. (A short
welcome post is already published, so the blog is never empty.)

That's it. Everything else is optional.

---

## Change the title, tagline, and theme

In the editor, the **Settings** tab edits `src/config.json`: change the site **title**,
**tagline**, **author**, the **theme** (choose from the built-in AstroPaper color schemes),
or the **navigation** links. Press **Publish** and the live site updates automatically —
no code required.

To edit the **About** page, use the editor's **Pages** tab.

---

## Keeping your site up to date

Sites created by the **kantan panel** show an **Update available** badge on their dashboard
whenever this template ships a new version of the site core. The panel only offers updates
that pass a **fitness gate** (your posts, images, and settings are never overwritten; a
customized site is blocked, not clobbered), and it re-injects the editor's login details for
you. See the **[Developer guide](docs/developer-guide.md#versioning-and-updates-panel-provisioned-sites)**
for the exact user data contract.

---

## Want to change how it looks?

The quickest way to restyle the site is the **Settings → Theme** picker in the editor.
The site itself is also a normal **Astro** project: if you (or someone technical) want to
tweak colors, layout, or add pages, edit the files in `src/` and the site rebuilds
automatically.

See **the [Developer guide](docs/developer-guide.md)** for setup and customization details.
Editor login is set up automatically for sites created with the **kantan panel**.

---

## License

MIT © 2026 Lava Security
