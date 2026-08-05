import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Sections from '@/components/Sections';
import { getPageContent } from '@/lib/content';
import { SITE } from '@/lib/defaults';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('home');
  return {
    title: { absolute: content.title },
    description: content.metaDescription,
    alternates: { canonical: '/' },
  };
}

export default async function HomePage() {
  const content = await getPageContent('home');
  return (
    <>
      <Nav dark />
      <main>
        <Sections sections={content.sections} />
      </main>
      <Footer />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: SITE.name,
            url: SITE.domain,
            founder: { '@type': 'Person', name: SITE.owner },
            description: content.metaDescription,
          }),
        }}
      />
    </>
  );
}
