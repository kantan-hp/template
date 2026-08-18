# かんたんHP — 無料ですぐ始められるブログ

[![Astro](https://img.shields.io/badge/Astro-7-FF5D01?logo=astro&logoColor=white)](https://astro.build)
[![Sveltia CMS](https://img.shields.io/badge/Sveltia%20CMS-0.178.0-4a90d9)](https://sveltiacms.app)
[![Hosting: Cloudflare Pages](https://img.shields.io/badge/Cloudflare%20Pages-free-F38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**かんたん** という名前の通り、**シンプル** が一番のコンセプトです。

かんたんHPは、**無料で動く** すぐ使える**ブログ**です。分かりやすいウェブ画面から
**簡単に編集** でき、サーバーもデータベースも管理も不要です。

**他の言語で読む：** [English](README.md) · [日本語](README.ja.md) · [繁體中文](README.zh-Hant.md) · [简体中文](README.zh-Hans.md)

---

## できること

- **ブログが無料**で公開できます（Cloudflare Pages でのホスティング）
- **ウェブ編集画面**（`your-site.com/admin`）で、記事の執筆・画像追加・公開ができます
- **Settings タブ**で、サイトタイトル・キャッチコピー・テーマをコードなしで変更できます
- サイトは**選択した1つの言語**（英語・日本語・繁體中文・简体中文）で表示され、エディタも同じ言語になります。言語タブの管理は不要です。
- 最初から「Welcome」記事が公開済みなので、最初のデプロイからサイトは「生きて」います
- 編集者はコードやgitに触れる必要はありません。ブラウザだけです。

---

## 始め方

1. **サイトを作る** — **[kantan-hp.fyi](https://kantan-hp.fyi)** を開き、数クリックでサイトを作成します。
   必要なのは（無料の）GitHubアカウントと（無料の）Cloudflareアカウントだけです。
2. **記事を書き始める** — `your-site.com/admin` を開いて記事を書き、公開するだけ。
   エディタのログインはパネルが設定してくれるので、別途GitHubログインの設定は不要です。

### 手順1 — サイトを作る

**[kantan-hp.fyi](https://kantan-hp.fyi)** を開き、メールアドレスでサインインします。GitHubアカウントを
連携し、Cloudflare APIトークンを貼り付けて、名前を決めるだけ。パネルがリポジトリを生成し、Cloudflare Pages に
デプロイして、`your-site.pages.dev` のライブアドレスを発行します — 約1分で完了します。

### 手順2 — 最初の記事を書く

`your-site.pages.dev/admin` を開き → **Blog → New Blog** をクリック → タイトルと本文を書き、
画像をアップロードして **Publish** を押すだけ。約1分でサイトに公開されます。
（はじめから「Welcome」記事が公開済みなので、ブログが空になることはありません。）

以上です。それ以外はすべてオプションです。

---

## タイトル・キャッチコピー・テーマを変える

エディタの **Settings** タブが `src/config.json` を編集します。サイトの **タイトル**、
**キャッチコピー**、**著者名**、**テーマ**（標準搭載のAstroPaperカラースキームから選択）、
**ナビゲーション**を変更できます。**Publish** を押せばライブサイトに自動反映されます — コードは不要です。

**About** ページを編集するには、エディタの **Pages** タブを使います。

---

## サイトを最新の状態に保つ

**kantan パネル**で作成されたサイトは、このテンプレートに新しいバージョンのサイトコアが公開されると、
ダッシュボードに **Update available** バッジが表示されます。パネルは **fitness gate**（適合ゲート）を
通過した更新のみを提供します（記事・画像・設定が上書きされることはありません。カスタマイズされたサイトは
壊されるのではなく更新がブロックされます）。エディタのログイン情報も自動で再設定されます。
正確なユーザーデータ契約は **[開発者ガイド](docs/developer-guide.md#versioning-and-updates-panel-provisioned-sites)** を参照してください。

---

## 見た目を変えたいですか？

手軽にデザインを変えるなら、エディタの **Settings → Theme** を選ぶのが一番簡単です。
サイト本体は通常の **Astro** プロジェクトでもあるので、色・レイアウト・ページ追加などを変更したい場合は、
`src/` 内のファイルを編集すれば自動で再ビルドされます。

セットアップやカスタマイズの詳細は **[開発者ガイド](docs/developer-guide.md)** を参照してください。
エディタのログインは **kantan パネル**で作成したサイトでは自動的に設定されます。

---

## ライセンス

MIT © 2026 Lava Security
