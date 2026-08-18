// UI string dictionary for the four kantan locales, matching the README's
// translations (English, 日本語, 繁體中文, 简体中文). Keyed by BCP-47 locale.
import { site } from '../config';

export const locales = ['en', 'ja', 'zh-Hant', 'zh-Hans'] as const;
export type Locale = (typeof locales)[number];

export function isLocale(value: string | undefined): value is Locale {
  return !!value && (locales as readonly string[]).includes(value);
}

// The site's default locale, read from src/config.json `site.lang` (fallback
// en). kantan sites are single-language: the chosen locale drives the UI
// strings site-wide (no prefixed routes, no language switcher).
export const defaultLocale: Locale = isLocale(site.lang) ? site.lang : 'en';

export interface UIStrings {
  skipToContent: string;
  // aria-label for the main navigation.
  navLabel: string;
  // Default nav labels from src/config.json, keyed by the English label so a
  // Settings-edited label falls back to itself when untranslated.
  nav: Record<string, string>;
  themeToggle: string;
  hero: {
    readBlog: string;
    openEditor: string;
    latestPosts: string;
    viewAll: string;
    noPostsBefore: string;
    noPostsAfter: string;
  };
  blog: {
    title: string;
    tagline: string;
    description: (siteTitle: string) => string;
  };
  post: {
    backToBlog: string;
  };
  pagination: {
    ariaLabel: string;
    newer: string;
    older: string;
  };
  footer: {
    language: string;
  };
  about: {
    notWritten: string;
  };
  notFound: {
    title: string;
    body: string;
    goHome: string;
  };
}

export const ui: Record<Locale, UIStrings> = {
  en: {
    skipToContent: 'Skip to content',
    navLabel: 'Main navigation',
    nav: { Home: 'Home', Blog: 'Blog', About: 'About' },
    themeToggle: 'Toggle light/dark theme',
    hero: {
      readBlog: 'Read the blog',
      openEditor: 'Open the editor',
      latestPosts: 'Latest posts',
      viewAll: 'View all',
      noPostsBefore: 'No posts yet — log in at',
      noPostsAfter: 'and write your first one.',
    },
    blog: {
      title: 'Blog',
      tagline: 'Latest articles',
      description: (siteTitle) => `Latest posts from ${siteTitle}.`,
    },
    post: { backToBlog: '← Back to blog' },
    pagination: { ariaLabel: 'Blog pages', newer: '← Newer', older: 'Older →' },
    footer: { language: 'Change language' },
    about: {
      notWritten:
        "The About page hasn't been written yet — edit it from the editor's Pages tab.",
    },
    notFound: { title: 'Not found', body: "That page doesn't exist.", goHome: 'Go home' },
  },
  ja: {
    skipToContent: '本文へスキップ',
    navLabel: 'メインナビゲーション',
    nav: { Home: 'ホーム', Blog: 'ブログ', About: 'このサイトについて' },
    themeToggle: 'ライト/ダークテーマを切り替え',
    hero: {
      readBlog: 'ブログを読む',
      openEditor: 'エディタを開く',
      latestPosts: '最新の投稿',
      viewAll: 'すべて見る',
      noPostsBefore: 'まだ投稿がありません — ',
      noPostsAfter: ' にログインして最初の投稿を書きましょう。',
    },
    blog: {
      title: 'ブログ',
      tagline: '最新の記事',
      description: (siteTitle) => `${siteTitle} の最新の投稿。`,
    },
    post: { backToBlog: '← ブログへ戻る' },
    pagination: { ariaLabel: 'ブログのページ', newer: '← 新しい記事', older: '古い記事 →' },
    footer: { language: '言語を選択' },
    about: {
      notWritten:
        '「このサイトについて」のページはまだ書かれていません — エディタの「ページ」タブから編集してください。',
    },
    notFound: { title: '見つかりません', body: 'このページは存在しません。', goHome: 'ホームへ' },
  },
  'zh-Hant': {
    skipToContent: '跳到主要內容',
    navLabel: '主要導覽',
    nav: { Home: '首頁', Blog: '部落格', About: '關於本站' },
    themeToggle: '切換淺色/深色主題',
    hero: {
      readBlog: '閱讀部落格',
      openEditor: '開啟編輯器',
      latestPosts: '最新文章',
      viewAll: '查看全部',
      noPostsBefore: '還沒有文章 — 前往 ',
      noPostsAfter: ' 登入並撰寫第一篇。',
    },
    blog: {
      title: '部落格',
      tagline: '最新文章',
      description: (siteTitle) => `${siteTitle} 的最新文章。`,
    },
    post: { backToBlog: '← 返回部落格' },
    pagination: { ariaLabel: '部落格頁碼', newer: '← 較新', older: '較舊 →' },
    footer: { language: '選擇語言' },
    about: {
      notWritten: '「關於本站」頁面尚未撰寫 — 請在編輯器的「頁面」分頁中編輯。',
    },
    notFound: { title: '找不到頁面', body: '這個頁面不存在。', goHome: '返回首頁' },
  },
  'zh-Hans': {
    skipToContent: '跳到主要内容',
    navLabel: '主导航',
    nav: { Home: '首页', Blog: '博客', About: '关于本站' },
    themeToggle: '切换浅色/深色主题',
    hero: {
      readBlog: '阅读博客',
      openEditor: '打开编辑器',
      latestPosts: '最新文章',
      viewAll: '查看全部',
      noPostsBefore: '还没有文章 — 前往 ',
      noPostsAfter: ' 登录并撰写第一篇。',
    },
    blog: {
      title: '博客',
      tagline: '最新文章',
      description: (siteTitle) => `${siteTitle} 的最新文章。`,
    },
    post: { backToBlog: '← 返回博客' },
    pagination: { ariaLabel: '博客页码', newer: '← 较新', older: '较旧 →' },
    footer: { language: '选择语言' },
    about: {
      notWritten: '「关于本站」页面尚未撰写 — 请在编辑器的「页面」标签页中编辑。',
    },
    notFound: { title: '找不到页面', body: '这个页面不存在。', goHome: '返回首页' },
  },
};
