import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://your-site.example.com',
  integrations: [sitemap()],
  output: 'static',
  server: {
    port: 4321,
  },
});
