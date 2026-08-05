import { buildRss } from '../lib/rss';
import { defaultLocale } from '../i18n/ui';

export const GET = () => buildRss(defaultLocale);
