import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Sections from '@/components/Sections';
import { getSupabase } from '@/lib/supabase';
import type { PageContent } from '@/lib/types';

// Renders any page that exists only in the database (created via the MCP
// tools or the admin editor). Static routes (home, about, services,
// contact, admin) take precedence over this dynamic one.

export const revalidate = 3600;

async function fetchDbPage(slug: string): Promise<PageContent | null> {
  const supabase = getSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from('page_content')
    .select('content')
    .eq('slug', slug)
    .eq('status', 'active')
    .single();
  if (!data?.content?.sections) return null;
  return data.content as PageContent;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const content = await fetchDbPage(params.slug);
  if (!content) return {};
  return {
    title: { absolute: content.title },
    description: content.metaDescription,
    alternates: { canonical: `/${params.slug}` },
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const content = await fetchDbPage(params.slug);
  if (!content) return notFound();
  const hasHero = content.sections[0]?.variant === 'hero';
  return (
    <>
      <Nav dark={hasHero} />
      <main>
        <Sections sections={content.sections} />
      </main>
      <Footer />
    </>
  );
}
