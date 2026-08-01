# かんたんHP — Cloudflare Pages用の軽量ブログスターター

> **かんたん** の名の通り、シンプルで高速、初心者向けのブログスターターです。
> **Cloudflare Pages** 上で無料で動きます。

**他の言語で読む：** [English](README.md) · [日本語](README.ja.md) ·
[繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

次の2つを組み合わせています：

- **[Astro](https://astro.build)** — 静的サイトジェネレーター。高速で、デフォルトでは
  クライアント側JavaScriptを使わず、カスタマイズも簡単です。
- **[Decap CMS](https://decapcms.org)**（旧Netlify CMS）— `/admin` に用意された親しみやすい
  ウェブエディター。コードやgitに触れずに、記事の執筆や画像のアップロードができます。

技術に詳しくない編集者も、ウェブダッシュボードからコンテンツを管理できます。開発者は一度だけ
セットアップすれば、あとは保存するだけで記事が自動的に公開されます。

---

## 📚 目次

- [前提条件](#前提条件)
- [1. ローカルで動かす（開発者向け）](#1ローカルで動かす開発者向け)
- [2. Cloudflare Pagesに公開する](#2cloudflare-pagesに公開する)
- [3. Decap CMSで記事を書く](#3decap-cmsで記事を書く)
- [4. サイトをカスタマイズする](#4サイトをカスタマイズする)
- [ディレクトリ構成](#ディレクトリ構成)
- [プロジェクト構造](#プロジェクト構造)
- [コントリビュート](#コントリビュート)
- [ライセンス](#ライセンス)

---

## 前提条件

**開発者向け：**

- [Node.js](https://nodejs.org) バージョン **20** 以上
- 無料の [GitHub](https://github.com) アカウント
- 無料の [Cloudflare](https://dash.cloudflare.com) アカウント
- お使いのマシンにGit

**編集者向け（非技術者）：** インストール不要。ブラウザとGitHubアカウント（または組織から
のアクセス権）があればOKです。

---

## 1. ローカルで動かす（開発者向け）

```bash
# このリポジトリをクローン
git clone https://github.com/lavasecurity/kantan-hp.git
cd kantan-hp

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:4321](http://localhost:4321) を開きます。スターターのホーム
ページが表示されます。

本番用ビルドとプレビュー：

```bash
npm run build      # 静的サイトを dist/ にビルド
npm run preview    # ビルドしたサイトをローカルで配信
```

---

## 2. Cloudflare Pagesに公開する

このスターターは**静的サイト**なので、サーバーもデータベースも不要で、どこにでもデプロイできます。

### 方法A：Cloudflare Pages（推奨）

1. [Cloudflareダッシュボード](https://dash.cloudflare.com) で
   **Workers & Pages → Create → Pages → Connect to Git** を開く。
2. 認可して、このリポジトリを選択する。
3. **Build settings** で次のように設定：
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy** をクリック。以降、プッシュのたびに自動でビルドされます。

サイトは `https://<your-project>.pages.dev` で公開されます。

### 方法B：Wrangler CLI（開発者向け）

```bash
npm install -g wrangler
npx wrangler pages deploy dist --project-name kantan-hp
```

### 方法C：他の静的ホスティング

`npm run build` で生成した `dist/` フォルダを、任意の静的ホスト（Netlify、Vercel、
GitHub Pages、S3バケットなど）にアップロードします。

> **注意：** [`astro.config.mjs`](astro.config.mjs) 内の `site` を、プレースホルダ
> `https://your-site.example.com` から実際のドメインに変更してください。
> RSSフィードとサイトマップが正しいURLを指すようになります。

---

## 3. Decap CMSで記事を書く

デプロイ後、編集者は **`https://<your-site>/admin`** のダッシュボードを使います。

### GitHubログインを有効にする（一度だけ）

Decap CMSはあなたの代わりにGitリポジトリへコンテンツをコミットするため、あなたとして
ログインできる必要があります。

**方法1 — GitHub OAuth App（チームに推奨）：**
1. GitHub OAuth Appを作成（OAuthコールバックは `https://<your-site>/admin`）。
2. Cloudflare Pagesの**環境変数** `OAUTH_GITHUB_CLIENT_ID` と
   `OAUTH_GITHUB_CLIENT_SECRET` にアプリのclient ID／secretを設定。
3. [`public/admin/config.yml`](public/admin/config.yml) の `backend` セクションを設定。

> 詳しい手順は **[docs/github-oauth-setup.md](docs/github-oauth-setup.md)** を参照してください。

**方法2 — Netlify Identity方式：** 一部のダッシュボードはOAuthゲートウェイを提供しています。
上と同じ環境変数パターンに従ってください。

### エディター

- **新規投稿：** **Blog → New Blog** をクリック。
- **フィールド：** Title（タイトル）、Description（説明）、Publish Date（公開日）、
  Hero Image（画像をアップロードかURL貼り付け）、Tags（タグ）、Draft（下書きトグル）、
  Body（画像ボタン付きのWYSIWYGエディター）。
- **保存：** **Save** で下書きをコミット、**Publish** で公開。

保存のたびに `src/content/blog/` 配下にMarkdownファイルが作成されます。Cloudflare
connectがプッシュを検知して**自動で再ビルド**し、1分ほどで記事が公開されます。

> ローカルテスト：Decapにはローカルプロキシがあります。別のターミナルで `npm run decap`
> を実行し、ローカルで `/admin` を開いてローカルバックエンドを選択してください。

---

## 4. サイトをカスタマイズする

- **サイト名と説明：** [`src/config.ts`](src/config.ts) を編集。
- **テーマ／色・レイアウト：** [`src/styles/global.css`](src/styles/global.css) と
  [`src/pages/`](src/pages) を編集。
- **記事スキーマ（必須フィールド）：** [`src/content/config.ts`](src/content/config.ts) を編集。
- **Decapエディターのフィールド：** [`public/admin/config.yml`](public/admin/config.yml) を編集。
- **CSS/JSの追加：** [`src/styles/`](src/styles) にファイルを追加してimportするか、
  静的アセットは [`public/`](public) に配置。

詳しくは **[Astro公式ドキュメント](https://docs.astro.build)** を参照してください。

---

## ディレクトリ構成

```
kantan-hp/
├── public/               # そのまま公開される静的ファイル
│   ├── admin/            # Decap CMSダッシュボード（config.yml + index.html）
│   ├── images/           # エディターでアップロードした画像
│   └── favicon.svg
├── src/
│   ├── components/       # 再利用可能な .astro コンポーネント
│   ├── content/
│   │   ├── blog/         # ブログ記事（Markdown）
│   │   └── config.ts     # 記事スキーマ
│   ├── layouts/          # ページレイアウト（BaseLayout.astro）
│   ├── pages/            # ルート：home, /blog, /blog/[slug], /rss.xml
│   ├── styles/           # グローバルCSS
│   └── config.ts         # サイトメタ情報
├── .github/
│   └── workflows/        # CIチェック（typecheck + build）
├── astro.config.mjs      # Astro設定
└── package.json
```

---

## プロジェクト構造

| ファイル | 用途 |
| --- | --- |
| `src/config.ts` | サイト名・説明・ローカライズ名 |
| `src/layouts/BaseLayout.astro` | 全ページ共通のヘッダー/フッター/HTML |
| `src/pages/index.astro` | ホームページ |
| `src/pages/blog/index.astro` | ブログ一覧（新しい順） |
| `src/pages/blog/[slug].astro` | 個別記事テンプレート |
| `src/pages/rss.xml.ts` | RSSフィード生成 |
| `public/admin/config.yml` | Decap CMSのコレクション＆フィールド |
| `.github/workflows/ci.yml` | プッシュ/PR時に `astro check` + `astro build` |

---

## コントリビュート

貢献は歓迎します。PRは焦点を絞り、マージ前にCIをグリーンにしてください：

```bash
npm run check   # 静的型チェック
npm run build   # 本番ビルド
```

詳細は [CONTRIBUTING.md](CONTRIBUTING.md) を参照してください。

---

## ライセンス

MIT © 2026 Lava Security
