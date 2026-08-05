import type { GetStaticPaths } from 'astro';
import type { Locale } from '../../i18n/ui';
import { buildRss } from '../../lib/rss';
import { localePaths, nonDefaultLocales } from '../../lib/blog';

export const getStaticPaths: GetStaticPaths = () => localePaths(nonDefaultLocales());

export const GET = async ({ params }: { params: { locale: string } }) =>
  buildRss(params.locale as Locale);
