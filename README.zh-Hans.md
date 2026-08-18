# 简单网站（Kantan HP）— 免费、几分钟就能发布的博客

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Sveltia CMS](https://img.shields.io/badge/Sveltia%20CMS-0.178.0-4a90d9)](https://sveltiacms.app)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Kantan（かんたん）** 日文意为**简单**，而这正是全部重点。

简单网站是一套**现成的博客**，**免费**运行、通过友好的网页界面**轻松编辑**，
不需要写代码、不需要服务器、也不需要管理数据库。

**以此语言阅读：** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## 你可以获得

- 一个**免费运行的现成博客**（架设于 Cloudflare Pages）
- 位于 `your-site.com/admin` 的**网页编辑器** — 写文章、加图片、按发布
- **设置（Settings）选项卡** — 无需代码即可修改站点标题、标语和主题
- 站点以**你选择的一种语言**（英文、日本語、繁體中文、简体中文）呈现，编辑器也使用同一语言。无需管理语言标签页。
- 一篇已发布的欢迎文章，首次部署后网站就是"活的"
- 编辑者不需要碰代码或 git，只需要浏览器。

---

## 如何开始

1. **创建你的站点** — 前往 **[kantan-hp.fyi](https://kantan-hp.fyi)**，几个步骤即可创建站点。
   你只需要（免费的）GitHub 账号和（免费的）Cloudflare 账号。
2. **开始写作** — 打开 `your-site.com/admin` 撰写文章并发布。编辑器的登录由面板自动设置，
   无需另外设置 GitHub 登录。

### 步骤 1 — 创建你的站点

前往 **[kantan-hp.fyi](https://kantan-hp.fyi)**，用电子邮箱登录。连接你的 GitHub 账号、
粘贴 Cloudflare API 令牌，然后取一个名称。面板会生成存储库、部署到 Cloudflare Pages，
并给你一个已上线的 `your-site.pages.dev` 网址 — 全程约一分钟。

### 步骤 2 — 写第一篇文章

打开 `your-site.pages.dev/admin` → 按 **Blog → New Blog** → 输入标题和正文、上传图片，再按 **Publish**。约一分钟后就会发布到你的网站。
（一篇欢迎文章已经发布，所以博客不会空空如也。）

就是这样。其他一切都是选配。

---

## 修改标题、标语和主题

在编辑器中，**设置（Settings）** 选项卡会编辑 `src/config.json`：可修改站点**标题**、**标语**、
**作者**、**主题**（从内置的 AstroPaper 配色方案中选择），以及**导航**链接。按 **Publish** 即可自动更新到线上网站 — 无需写代码。

编辑**关于（About）**页面，请使用编辑器中的 **页面（Pages）** 选项卡。

---

## 保持站点更新

由 **kantan 面板**创建的站点，在模板发布新版站点核心时，仪表盘上会显示 **Update available**
徽标。面板只提供通过了 **fitness gate（适配门禁）** 的更新（您的文章、图片和设置绝不会被覆盖；
自定义过的站点会被阻止更新，而不是被破坏），并会为您重新注入编辑器的登录信息。
确切的用户数据契约请见 **[开发者指南](docs/developer-guide.md#versioning-and-updates-panel-provisioned-sites)**。

---

## 想改外观？

最快捷的改版方式是使用编辑器中的 **设置 → 主题（Settings → Theme）** 选择器。
网站本身也是一般的 **Astro** 项目：如果想调整颜色、布局或新增页面，编辑 `src/` 中的文件即可，网站会自动重新构建。

详细的设置与定制说明请见 **《开发者指南》(docs/developer-guide.md)**。由 **kantan 面板**创建的站点，
编辑器登录会自动设置完成。

---

## 许可

MIT © 2026 Lava Security
