# 簡單網站（Kantan HP）— 適用於 Cloudflare Pages 的輕量部落格起始範本

> **Kantan（かんたん）** 日文意為**簡單**。這是一個輕量、快速、適合初學者的部落格
> 起始範本，可在 **Cloudflare Pages** 上**免費**運行。

**以此語言閱讀：** [English](README.md) · [日本語](README.ja.md) ·
[繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

它結合了兩者：

- **[Astro](https://astro.build)** — 靜態網站產生器。快速、預設無客戶端 JavaScript、易於客製。
- **[Decap CMS](https://decapcms.org)**（前身 Netlify CMS）— 位於 `/admin` 的友善網頁編輯器，
  讓你能**不需接觸程式碼或 git** 就能撰寫文章、上傳圖片。

非技術背景的編輯者也能透過網頁儀表板管理內容。開發者只需設定一次，之後每次儲存
文章便會自動發布。

---

## 📚 目錄

- [前置需求](#前置需求)
- [1. 在本機執行（開發者）](#1在本機執行開發者)
- [2. 發布到 Cloudflare Pages](#2發布到-cloudflare-pages)
- [3. 使用 Decap CMS 撰寫文章](#3使用-decap-cms-撰寫文章)
- [4. 客製化網站](#4客製化網站)
- [目錄結構](#目錄結構)
- [專案結構](#專案結構)
- [貢獻](#貢獻)
- [授權](#授權)

---

## 前置需求

**開發者：**

- [Node.js](https://nodejs.org) 版本 **20** 或更新
- 免費的 [GitHub](https://github.com) 帳號
- 免費的 [Cloudflare](https://dash.cloudflare.com) 帳號
- 電腦安裝 Git

**編輯者（非技術）：** 無需安裝任何東西 — 只需要瀏覽器和 GitHub 帳號（或透過你的
組織取得存取權）。

---

## 1. 在本機執行（開發者）

```bash
# 複製此儲存庫
git clone https://github.com/lavasecurity/kantan-hp.git
cd kantan-hp

# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev
```

在瀏覽器開啟 [http://localhost:4321](http://localhost:4321)，即可看到起始首頁。

建立正式版本並預覽：

```bash
npm run build      # 建置靜態網站到 dist/
npm run preview    # 在本機提供建置後的網站
```

---

## 2. 發布到 Cloudflare Pages

此起始範本是**靜態網站** — 沒有伺服器、沒有資料庫，因此可部署到任何地方。

### 方式 A：Cloudflare Pages（建議）

1. 在 [Cloudflare 儀表板](https://dash.cloudflare.com) 前往
   **Workers & Pages → Create → Pages → Connect to Git**。
2. 授權並選取此儲存庫。
3. 在 **Build settings** 設定：
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. 按 **Save and Deploy**。之後每次推送都會自動建置。

網站將在 `https://<your-project>.pages.dev` 上線。

### 方式 B：Wrangler CLI（開發者）

```bash
npm install -g wrangler
npx wrangler pages deploy dist --project-name kantan-hp
```

### 方式 C：任何靜態主機

使用 `npm run build` 建置後，將 `dist/` 資料夾上傳到任何靜態主機（Netlify、Vercel、
GitHub Pages、S3 儲存桶等）。

> **注意：** 請將 [`astro.config.mjs`](astro.config.mjs) 中的 `site` 從預設
> `https://your-site.example.com` 改為你的真實網域，RSS 與網站地圖才會指向正確的 URL。

---

## 3. 使用 Decap CMS 撰寫文章

部署完成後，編輯者使用 **`https://<your-site>/admin`** 的儀表板。

### 啟用 GitHub 登入（僅需一次）

Decap CMS 會代表你將內容提交到 Git 儲存庫，因此它需要能以你的身分登入。

**方式 1 — GitHub OAuth App（建議用於團隊）：**
1. 建立 GitHub OAuth App（OAuth 回呼為 `https://<your-site>/admin`）。
2. 在 Cloudflare Pages **環境變數** `OAUTH_GITHUB_CLIENT_ID` 與
   `OAUTH_GITHUB_CLIENT_SECRET` 中設定 app 的 client ID／secret。
3. 設定 [`public/admin/config.yml`](public/admin/config.yml) 的 `backend` 區段。

> 完整逐步說明請見 **[docs/github-oauth-setup.md](docs/github-oauth-setup.md)**。

**方式 2 — Netlify Identity 形式：** 有些儀表板會提供 OAuth 閘道。遵循相同的
環境變數模式即可。

### 編輯器

- **新文章：** 按 **Blog → New Blog**。
- **欄位：** Title（標題）、Description（說明）、Publish Date（發布日期）、
  Hero Image（上傳圖片或貼上 URL）、Tags（標籤）、Draft（草稿開關）、
  以及 Body（帶圖片按鈕的 WYSIWYG 編輯器）。
- **儲存：** 按 **Save** 提交草稿、**Publish** 發布。

每次儲存都會在 `src/content/blog/` 下建立一個 Markdown 檔案。Cloudflare connect
偵測到推送後會**自動重新建置** — 約一分鐘內文章便會上線。

> 本機測試：Decap 也提供本地代理。在另一個終端機執行 `npm run decap`，然後在本機
> 開啟 `/admin` 並選擇 local 後端。

---

## 4. 客製化網站

- **網站名稱與說明：** 編輯 [`src/config.ts`](src/config.ts)。
- **主題／色彩與版面：** 編輯 [`src/styles/global.css`](src/styles/global.css)
  與 [`src/pages/`](src/pages) 中的頁面。
- **文章結構（必填欄位）：** 編輯 [`src/content/config.ts`](src/content/config.ts)。
- **Decap 編輯器欄位：** 編輯 [`public/admin/config.yml`](public/admin/config.yml)。
- **新增 CSS/JS：** 在 [`src/styles/`](src/styles) 新增檔案並 import，或將靜態資源
  放在 [`public/`](public)。

關於加入 Tailwind、自訂元件或新增內容集合等主題，請參閱
**[Astro 官方文件](https://docs.astro.build)**。

---

## 目錄結構

```
kantan-hp/
├── public/               # 原樣複製到建置網站的靜態檔案
│   ├── admin/            # Decap CMS 儀表板（config.yml + index.html）
│   ├── images/           # 透過編輯器上傳的圖片
│   └── favicon.svg
├── src/
│   ├── components/       # 可重用的 .astro 元件
│   ├── content/
│   │   ├── blog/         # 部落格文章（Markdown）
│   │   └── config.ts     # 文章結構
│   ├── layouts/          # 頁面版面（BaseLayout.astro）
│   ├── pages/            # 路由：home, /blog, /blog/[slug], /rss.xml
│   ├── styles/           # 全域 CSS
│   └── config.ts         # 網站中繼資料
├── .github/
│   └── workflows/        # CI 檢查（typecheck + build）
├── astro.config.mjs      # Astro 設定
└── package.json
```

---

## 專案結構

| 檔案 | 用途 |
| --- | --- |
| `src/config.ts` | 網站名稱、說明、本地化名稱 |
| `src/layouts/BaseLayout.astro` | 所有頁面共用的頁首/頁尾/HTML |
| `src/pages/index.astro` | 首頁 |
| `src/pages/blog/index.astro` | 部落格列表（最新在前） |
| `src/pages/blog/[slug].astro` | 單篇文章範本 |
| `src/pages/rss.xml.ts` | RSS 產生器 |
| `public/admin/config.yml` | Decap CMS 集合與欄位 |
| `.github/workflows/ci.yml` | 推送/PR 時執行 `astro check` + `astro build` |

---

## 貢獻

歡迎貢獻。請讓 PR 保持聚焦，並在合併前確保 CI 通過：

```bash
npm run check   # 靜態型別檢查
npm run build   # 正式建置
```

詳見 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 授權

MIT © 2026 Lava Security
