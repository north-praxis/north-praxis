import type { MetadataRoute } from 'next';
import { getSupabase } from '@/lib/supabase';
import { DEFAULT_CONTENT, SITE } from '@/lib/defaults';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let slugs = Object.keys(DEFAULT_CONTENT);
  const supabase = getSupabase();
  if (supabase) {
    const { data } = await supabase
      .from('page_content')
      .select('slug')
      .eq('status', 'active');
    if (data?.length) slugs = data.map((r) => r.slug);
  }
  return slugs.map((slug) => ({
    url: slug === 'home' ? `${SITE.domain}/` : `${SITE.domain}/${slug}`,
    changeFrequency: 'monthly',
    priority: slug === 'home' ? 1 : 0.7,
  }));
}
