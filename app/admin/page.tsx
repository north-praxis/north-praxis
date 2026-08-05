import Link from 'next/link';
import { isAuthed } from '@/lib/admin';
import { getServiceSupabase } from '@/lib/supabase';
import { login, logout } from './actions';
import ImageUploader from '@/components/admin/ImageUploader';

export const dynamic = 'force-dynamic';
export const metadata = { title: 'Admin | North Praxis', robots: 'noindex' };

export default async function AdminPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  if (!isAuthed()) {
    return (
      <main className="mx-auto max-w-sm px-6 py-24">
        <h1 className="font-display text-2xl text-night">North Praxis admin</h1>
        <form action={login} className="mt-8 space-y-4">
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm text-slate">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full rounded border border-mist bg-white px-4 py-3 focus:border-slate focus:outline-none"
            />
          </div>
          {searchParams.error && (
            <p className="text-sm text-red-700">Wrong password. Try again.</p>
          )}
          <button
            type="submit"
            className="rounded bg-night px-6 py-3 text-sm font-medium text-paper hover:bg-deep"
          >
            Sign in
          </button>
        </form>
      </main>
    );
  }

  const supabase = getServiceSupabase();
  const { data: pages } = supabase
    ? await supabase
        .from('page_content')
        .select('slug, status, updated_at, updated_by')
        .order('slug')
    : { data: null };

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl text-night">North Praxis admin</h1>
        <form action={logout}>
          <button type="submit" className="text-sm text-mid underline hover:text-night">
            Sign out
          </button>
        </form>
      </div>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-mid">Pages</h2>
      <div className="mt-3 divide-y divide-pale rounded-md border border-pale bg-white">
        {(pages ?? []).map((p) => (
          <Link
            key={p.slug}
            href={`/admin/edit/${p.slug}`}
            className="flex items-center justify-between px-5 py-4 hover:bg-pale/50"
          >
            <span className="font-medium text-night">/{p.slug === 'home' ? '' : p.slug}</span>
            <span className="text-xs text-mid">
              {p.status} · updated {new Date(p.updated_at).toLocaleDateString()} by {p.updated_by}
            </span>
          </Link>
        ))}
        {!pages?.length && (
          <p className="px-5 py-4 text-sm text-mid">
            No pages found. Check that the schema has been run in Supabase.
          </p>
        )}
      </div>

      <h2 className="mt-10 text-sm font-medium uppercase tracking-wide text-mid">Images</h2>
      <div className="mt-3">
        <ImageUploader />
      </div>
    </main>
  );
}
