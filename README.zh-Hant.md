# 簡單網站（Kantan HP）— 免費、幾分鐘就能發布的部落格

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Sveltia CMS](https://img.shields.io/badge/Sveltia%20CMS-0.178.0-4a90d9)](https://sveltiacms.app)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**Kantan（かんたん）** 日文意為**簡單**，而這就是整個重點。

簡單網站是一套**現成的部落格**，**免費**運行、透過友善的網頁界面**輕鬆編輯**，
不需要寫程式、不需要伺服器、也不需要管理資料庫。

**以此語言閱讀：** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## 你可以獲得

- 一個**免費運行的現成部落格**（架設於 Cloudflare Pages）
- 位於 `your-site.com/admin` 的**網頁編輯器** — 寫文章、加圖片、按發布
- **設定（Settings）分頁** — 免寫程式即可修改網站標題、標語與主題
- 網站以**你選擇的一種語言**（英文、日本語、繁體中文、简体中文）呈現，編輯器也使用同一語言。無需管理語言分頁。
- 一篇已發布的歡迎文章，首次部署後網站就是「活的」
- 編輯者不需要碰程式碼或 git，只需要瀏覽器。

---

## 如何開始

1. **建立你的網站** — 前往 **[kantan-hp.fyi](https://kantan-hp.fyi)**，幾個步驟即可建立網站。
   你只需要（免費的）GitHub 帳號和（免費的）Cloudflare 帳號。
2. **開始寫作** — 開啟 `your-site.com/admin` 撰寫文章並發布。編輯器的登入由面板自動設定，
   不需要另外設定 GitHub 登入。

### 步驟 1 — 建立你的網站

前往 **[kantan-hp.fyi](https://kantan-hp.fyi)**，用電子郵件登入。連接你的 GitHub 帳號、
貼上 Cloudflare API 權杖，然後取一個名稱。面板會產生儲存庫、部署到 Cloudflare Pages，
並給你一個上線中的 `your-site.pages.dev` 網址 — 全程約一分鐘。

### 步驟 2 — 寫第一篇文章

開啟 `your-site.pages.dev/admin` → 按 **Blog → New Blog** → 輸入標題和內文、上傳圖片，再按 **Publish**。約一分鐘後就會發布到你的網站。
（一篇歡迎文章已經發布，所以部落格不會空空如也。）

就是這樣。其他一切都是選配。

---

## 修改標題、標語與主題

在編輯器中，**設定（Settings）** 分頁會編輯 `src/config.json`：可修改網站**標題**、**標語**、
**作者**、**主題**（從內建的 AstroPaper 配色方案中選擇），以及**導覽**連結。按 **Publish** 即可自動更新到線上網站 — 免寫程式碼。

編輯**關於（About）**頁面，請使用編輯器中的 **頁面（Pages）** 分頁。

---

## 保持網站更新

由 **kantan 面板**建立的網站，在範本發布新版網站核心時，儀表板上會顯示 **Update available**
徽章。面板只提供通過 **fitness gate（適配門禁）** 的更新（您的文章、圖片與設定絕不會被覆寫；
自訂過的網站會被阻止更新，而不是被破壞），並會為您重新注入編輯器的登入資訊。
確切的用戶資料契約請見 **[開發者指南](docs/developer-guide.md#versioning-and-updates-panel-provisioned-sites)**。

---

## 想改外觀？

最快速的改版方式是使用編輯器中的 **設定 → 主題（Settings → Theme）** 選擇器。
網站本身也是一般的 **Astro** 專案：如果想調整顏色、版面或新增頁面，編輯 `src/` 中的檔案即可，網站會自動重新建置。

詳細的設定與客製說明請見 **〔開發者指南〕(docs/developer-guide.md)**。由 **kantan 面板**建立的網站，
編輯器登入會自動設定完成。

---

## 授權

MIT © 2026 Lava Security
