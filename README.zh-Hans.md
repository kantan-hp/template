# 简单网站（Kantan HP）— 适用于 Cloudflare Pages 的轻量博客起始模板

> **Kantan（かんたん）** 日文意为**简单**。这是一个轻量、快速、适合初学者的博客
> 起始模板，可在 **Cloudflare Pages** 上**免费**运行。

**以此语言阅读：** [English](README.md) · [日本語](README.ja.md) ·
[繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

它结合了两者：

- **[Astro](https://astro.build)** — 静态网站生成器。快速、默认无客户端 JavaScript、易于定制。
- **[Decap CMS](https://decapcms.org)**（前身 Netlify CMS）— 位于 `/admin` 的友好网页编辑器，
  让你能**不接触代码或 git** 就能撰写文章、上传图片。

非技术背景的编辑者也能通过网页仪表盘管理内容。开发者只需设置一次，之后每次保存
文章便会自动发布。

---

## 📚 目录

- [前置需求](#前置需求)
- [1. 在本地运行（开发者）](#1在本地运行开发者)
- [2. 发布到 Cloudflare Pages](#2发布到-cloudflare-pages)
- [3. 使用 Decap CMS 撰写文章](#3使用-decap-cms-撰写文章)
- [4. 定制网站](#4定制网站)
- [目录结构](#目录结构)
- [项目结构](#项目结构)
- [贡献](#贡献)
- [许可](#许可)

---

## 前置需求

**开发者：**

- [Node.js](https://nodejs.org) 版本 **20** 或更新
- 免费的 [GitHub](https://github.com) 账号
- 免费的 [Cloudflare](https://dash.cloudflare.com) 账号
- 电脑安装 Git

**编辑者（非技术）：** 无需安装任何东西 — 只需要浏览器和 GitHub 账号（或通过你的
组织获得访问权限）。

---

## 1. 在本地运行（开发者）

```bash
# 克隆此存储库
git clone https://github.com/lavasecurity/kantan-hp.git
cd kantan-hp

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

在浏览器打开 [http://localhost:4321](http://localhost:4321)，即可看到起始首页。

构建正式版本并预览：

```bash
npm run build      # 构建静态网站到 dist/
npm run preview    # 在本地提供构建后的网站
```

---

## 2. 发布到 Cloudflare Pages

此起始模板是**静态网站** — 没有服务器、没有数据库，因此可部署到任何地方。

### 方式 A：Cloudflare Pages（推荐）

1. 在 [Cloudflare 仪表盘](https://dash.cloudflare.com) 前往
   **Workers & Pages → Create → Pages → Connect to Git**。
2. 授权并选择此存储库。
3. 在 **Build settings** 中设置：
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. 点击 **Save and Deploy**。之后每次推送都会自动构建。

网站将在 `https://<your-project>.pages.dev` 上线。

### 方式 B：Wrangler CLI（开发者）

```bash
npm install -g wrangler
npx wrangler pages deploy dist --project-name kantan-hp
```

### 方式 C：任何静态主机

使用 `npm run build` 构建后，将 `dist/` 文件夹上传到任何静态主机（Netlify、Vercel、
GitHub Pages、S3 存储桶等）。

> **注意：** 请将 [`astro.config.mjs`](astro.config.mjs) 中的 `site` 从默认的
> `https://your-site.example.com` 改为你的真实域名，RSS 与网站地图才会指向正确的 URL。

---

## 3. 使用 Decap CMS 撰写文章

部署完成后，编辑者使用 **`https://<your-site>/admin`** 的仪表盘。

### 启用 GitHub 登录（仅需一次）

Decap CMS 会代表你将内容提交到 Git 存储库，因此它需要能以你的身份登录。

**方式 1 — GitHub OAuth App（推荐用于团队）：**
1. 创建 GitHub OAuth App（OAuth 回调为 `https://<your-site>/admin`）。
2. 在 Cloudflare Pages **环境变量** `OAUTH_GITHUB_CLIENT_ID` 与
   `OAUTH_GITHUB_CLIENT_SECRET` 中设置 app 的 client ID／secret。
3. 设置 [`public/admin/config.yml`](public/admin/config.yml) 的 `backend` 区块。

> 完整逐步说明请见 **[docs/github-oauth-setup.md](docs/github-oauth-setup.md)**。

**方式 2 — Netlify Identity 形式：** 有些仪表盘会提供 OAuth 网关。遵循上述相同的
环境变量模式即可。

### 编辑器

- **新文章：** 点击 **Blog → New Blog**。
- **字段：** Title（标题）、Description（说明）、Publish Date（发布日期）、
  Hero Image（上传图片或粘贴 URL）、Tags（标签）、Draft（草稿开关）、
  以及 Body（带图片按钮的所见即所得编辑器）。
- **保存：** 点击 **Save** 提交草稿、**Publish** 发布。

每次保存都会在 `src/content/blog/` 下创建一个 Markdown 文件。Cloudflare connect
检测到推送后会**自动重新构建** — 约一分钟后文章便会发布。

> 本地测试：Decap 也提供本地代理。在另一个终端机执行 `npm run decap`，然后在本地
> 打开 `/admin` 并选择 local 后端。

---

## 4. 定制网站

- **网站名称与说明：** 编辑 [`src/config.ts`](src/config.ts)。
- **主题／颜色与布局：** 编辑 [`src/styles/global.css`](src/styles/global.css)
  与 [`src/pages/`](src/pages) 中的页面。
- **文章结构（必填字段）：** 编辑 [`src/content/config.ts`](src/content/config.ts)。
- **Decap 编辑器字段：** 编辑 [`public/admin/config.yml`](public/admin/config.yml)。
- **新增 CSS/JS：** 在 [`src/styles/`](src/styles) 新增文件并 import，或将静态资源
  放在 [`public/`](public)。

关于加入 Tailwind、自定义组件或新增内容集合等主题，请参阅
**[Astro 官方文档](https://docs.astro.build)**。

---

## 目录结构

```
kantan-hp/
├── public/               # 原样复制到构建网站的静态文件
│   ├── admin/            # Decap CMS 仪表盘（config.yml + index.html）
│   ├── images/           # 通过编辑器上传的图片
│   └── favicon.svg
├── src/
│   ├── components/       # 可重用的 .astro 组件
│   ├── content/
│   │   ├── blog/         # 博客文章（Markdown）
│   │   └── config.ts     # 文章结构
│   ├── layouts/          # 页面布局（BaseLayout.astro）
│   ├── pages/            # 路由：home, /blog, /blog/[slug], /rss.xml
│   ├── styles/           # 全局 CSS
│   └── config.ts         # 网站元数据
├── .github/
│   └── workflows/        # CI 检查（typecheck + build）
├── astro.config.mjs      # Astro 配置
└── package.json
```

---

## 项目结构

| 文件 | 用途 |
| --- | --- |
| `src/config.ts` | 网站名称、说明、本地化名称 |
| `src/layouts/BaseLayout.astro` | 所有页面共用的页首/页脚/HTML |
| `src/pages/index.astro` | 首页 |
| `src/pages/blog/index.astro` | 博客列表（最新在前） |
| `src/pages/blog/[slug].astro` | 单篇文章模板 |
| `src/pages/rss.xml.ts` | RSS 生成器 |
| `public/admin/config.yml` | Decap CMS 集合与字段 |
| `.github/workflows/ci.yml` | 推送/PR 时执行 `astro check` + `astro build` |

---

## 贡献

欢迎贡献。请让 PR 保持聚焦，并在合并前确保 CI 通过：

```bash
npm run check   # 静态类型检查
npm run build   # 正式构建
```

详见 [CONTRIBUTING.md](CONTRIBUTING.md)。

---

## 许可

MIT © 2026 Lava Security
