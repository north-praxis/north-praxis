import Link from 'next/link';
import { notFound } from 'next/navigation';
import { isAuthed } from '@/lib/admin';
import { getServiceSupabase } from '@/lib/supabase';
import EditorForm from '@/components/admin/EditorForm';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: { absolute: 'Edit page | North Praxis' },
  robots: 'noindex',
};

export default async function EditPage({ params }: { params: { slug: string } }) {
  if (!isAuthed()) {
    return (
      <main className="mx-auto max-w-sm px-6 py-24">
        <p className="text-slate">
          Not signed in.{' '}
          <Link href="/admin" className="underline">
            Go to the admin login
          </Link>
          .
        </p>
      </main>
    );
  }

  const supabase = getServiceSupabase();
  if (!supabase) return notFound();
  const { data } = await supabase
    .from('page_content')
    .select('slug, content, status')
    .eq('slug', params.slug)
    .single();
  if (!data) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <Link href="/admin" className="text-sm text-mid underline hover:text-night">
        ← All pages
      </Link>
      <h1 className="mt-4 font-display text-2xl text-night">Editing /{data.slug}</h1>
      <div className="mt-8">
        <EditorForm
          slug={data.slug}
          initialContent={data.content}
          initialStatus={data.status}
        />
      </div>
    </main>
  );
}
