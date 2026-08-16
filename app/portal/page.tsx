import { cookies } from 'next/headers';
import Link from 'next/link';
import Constellation from '@/components/Constellation';
import { getServiceSupabase } from '@/lib/supabase';
import { enterPortal, leavePortal } from './actions';

const PORTAL_COOKIE = 'np_portal';

export const dynamic = 'force-dynamic';
export const metadata = {
  title: { absolute: 'Client portal | North Praxis' },
  robots: 'noindex, nofollow',
};

interface Milestone {
  title: string;
  date?: string;
  state: 'done' | 'now' | 'next';
  note?: string;
}
interface Update {
  date: string;
  body: string;
}
interface Doc {
  title: string;
  url: string;
  note?: string;
}
interface PortalContent {
  welcome?: string;
  milestones?: Milestone[];
  updates?: Update[];
  documents?: Doc[];
}

async function getClient() {
  const code = cookies().get(PORTAL_COOKIE)?.value;
  if (!code) return null;
  const supabase = getServiceSupabase();
  if (!supabase) return null;
  const { data } = await supabase
    .from('portal_clients')
    .select('slug, name, content, updated_at')
    .eq('access_code', code)
    .eq('status', 'active')
    .single();
  return data ?? null;
}

const stateStyles: Record<Milestone['state'], string> = {
  done: 'bg-star border-star',
  now: 'bg-transparent border-star animate-pulse-slow',
  next: 'bg-transparent border-mist/40',
};

export default async function PortalPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const client = await getClient();

  if (!client) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-night-wash">
        <Constellation />
        <div className="relative mx-auto max-w-md px-6 pb-24 pt-36">
          <Link href="/" className="font-display text-xl tracking-wide text-paper">
            North Praxis
          </Link>
          <h1 className="mt-12 font-display text-3xl font-normal text-paper">
            Client portal
          </h1>
          <p className="mt-4 font-light leading-relaxed text-mist">
            Enter the access code from your engagement welcome note.
          </p>
          <form action={enterPortal} className="mt-8 space-y-4">
            <input
              name="code"
              required
              autoFocus
              autoComplete="off"
              placeholder="Access code"
              className="w-full rounded-lg border border-mist/30 bg-white/5 px-5 py-4 text-paper placeholder:text-mist/50 focus:border-star focus:outline-none"
            />
            {searchParams.error && (
              <p className="text-sm text-star">
                That code was not recognized. Check it and try again, or email
                chelsea@northpraxis.com.
              </p>
            )}
            <button
              type="submit"
              className="rounded-full bg-star px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-night transition hover:bg-[#E3B76F]"
            >
              Enter
            </button>
          </form>
        </div>
      </main>
    );
  }

  const content = (client.content ?? {}) as PortalContent;

  return (
    <main className="min-h-screen bg-paper">
      <div className="relative overflow-hidden bg-night-wash">
        <Constellation />
        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-14">
          <div className="flex items-center justify-between">
            <Link href="/" className="font-display text-xl tracking-wide text-paper">
              North Praxis
            </Link>
            <form action={leavePortal}>
              <button
                type="submit"
                className="text-[12px] uppercase tracking-[0.18em] text-mist transition hover:text-white"
              >
                Sign out
              </button>
            </form>
          </div>
          <p className="mt-14 text-[11px] uppercase tracking-[0.35em] text-star">
            Client workspace
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal text-paper sm:text-5xl">
            {client.name}
          </h1>
          {content.welcome && (
            <p className="mt-6 max-w-2xl font-light leading-[1.85] text-mist">
              {content.welcome}
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-16">
        {content.milestones && content.milestones.length > 0 && (
          <section>
            <h2 className="text-[11px] uppercase tracking-[0.35em] text-star">
              Where we are
            </h2>
            <ol className="mt-8 space-y-0">
              {content.milestones.map((m, i) => (
                <li key={i} className="relative flex gap-5 pb-10 last:pb-0">
                  {i < (content.milestones?.length ?? 0) - 1 && (
                    <span
                      className="absolute left-[7px] top-5 h-full w-px bg-slate/15"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`relative mt-1.5 block h-[15px] w-[15px] shrink-0 rounded-full border-2 ${stateStyles[m.state] ?? stateStyles.next}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-display text-lg text-night">{m.title}</p>
                    {m.date && (
                      <p className="mt-0.5 text-sm font-light text-mid">{m.date}</p>
                    )}
                    {m.note && (
                      <p className="mt-2 max-w-xl font-light leading-relaxed text-slate">
                        {m.note}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}

        {content.updates && content.updates.length > 0 && (
          <section className="mt-16 border-t border-slate/10 pt-12">
            <h2 className="text-[11px] uppercase tracking-[0.35em] text-star">
              Latest notes
            </h2>
            <div className="mt-8 space-y-8">
              {content.updates.map((u, i) => (
                <div key={i} className="border-l border-star/50 pl-6">
                  <p className="text-sm font-light text-mid">{u.date}</p>
                  <p className="mt-2 max-w-2xl font-light leading-[1.85] text-slate">
                    {u.body}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {content.documents && content.documents.length > 0 && (
          <section className="mt-16 border-t border-slate/10 pt-12">
            <h2 className="text-[11px] uppercase tracking-[0.35em] text-star">
              Documents
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {content.documents.map((d, i) => (
                <li key={i}>
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-slate/10 bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-star/40 hover:shadow-lg"
                  >
                    <p className="font-display text-lg text-night">{d.title}</p>
                    {d.note && (
                      <p className="mt-1 text-sm font-light text-mid">{d.note}</p>
                    )}
                    <span
                      className="mt-3 block h-px w-8 bg-star/60 transition-all duration-300 group-hover:w-14"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="mt-20 border-t border-slate/10 pt-8 text-sm font-light text-mid">
          Questions between sessions? Email{' '}
          <a href="mailto:chelsea@northpraxis.com" className="underline">
            chelsea@northpraxis.com
          </a>
          .
        </p>
      </div>
    </main>
  );
}
