# Contributing

Thanks for helping improve **Kantan HP**. This is a public starter meant to stay simple,
so please keep contributions focused and beginner-friendly.

## Getting started

```bash
npm install
npm run dev      # local dev server
```

## Checks to run before opening a PR

```bash
npm run check   # static type check (Astro/TS)
npm run build   # production build
```

CI runs both on every push and pull request. A PR is ready to merge when CI is green
and no reset discussion threads are unresolved.

## Guidelines

- Keep new dependencies minimal — this starter prizes lightness.
- Add posts under `src/content/blog/` as plain Markdown with frontmatter.
- New editor fields go in both `public/admin/config.yml` and
  `src/content/config.ts` (keep them in sync).
- No secrets or personal data: this repository is **public**.

## License

By contributing you agree your changes are released under the [MIT License](LICENSE).
