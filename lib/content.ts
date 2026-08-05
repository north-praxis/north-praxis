import { getSupabase } from './supabase';
import { DEFAULT_CONTENT } from './defaults';
import type { PageContent } from './types';

// Fetch a page's content from Supabase, falling back to in-code defaults
// so the site always renders (first deploy, DB paused, etc.).
export async function getPageContent(slug: string): Promise<PageContent> {
  const fallback = DEFAULT_CONTENT[slug];
  const supabase = getSupabase();
  if (!supabase) return fallback;
  try {
    const { data, error } = await supabase
      .from('page_content')
      .select('content')
      .eq('slug', slug)
      .eq('status', 'active')
      .single();
    if (error || !data?.content?.sections) return fallback;
    return data.content as PageContent;
  } catch {
    return fallback;
  }
}
