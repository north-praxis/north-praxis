import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Sections from '@/components/Sections';
import { getPageContent } from '@/lib/content';

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPageContent('contact');
  return {
    title: { absolute: content.title },
    description: content.metaDescription,
    alternates: { canonical: '/contact' },
  };
}

export default async function ContactPage() {
  const content = await getPageContent('contact');
  return (
    <>
      <Nav />
      <main>
        <Sections sections={content.sections} />
      </main>
      <Footer />
    </>
  );
}
