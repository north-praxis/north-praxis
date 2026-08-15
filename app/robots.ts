import type { MetadataRoute } from 'next';
import { SITE } from '@/lib/defaults';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/portal'] },
    sitemap: `${SITE.domain}/sitemap.xml`,
  };
}
