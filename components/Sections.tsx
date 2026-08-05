import Link from 'next/link';
import Image from 'next/image';
import type { Section, CardItem } from '@/lib/types';
import Constellation from './Constellation';
import ContactForm from './ContactForm';

const accentBorder: Record<NonNullable<CardItem['accent']>, string> = {
  slate: 'border-t-slate',
  mid: 'border-t-mid',
  star: 'border-t-star',
};

function Eyebrow({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-mid">{text}</p>
  );
}

export default function Sections({ sections }: { sections: Section[] }) {
  let heroSeen = false;
  return (
    <>
      {sections.map((s, i) => {
        switch (s.variant) {
          case 'hero': {
            const HTag = heroSeen ? 'p' : 'h1';
            heroSeen = true;
            return (
              <section key={i} className="relative overflow-hidden bg-night-wash">
                <Constellation />
                <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-36 sm:pb-32 sm:pt-44">
                  <HTag className="max-w-2xl font-display text-4xl leading-tight text-paper sm:text-5xl">
                    {s.headline}
                  </HTag>
                  <p className="mt-5 max-w-xl text-lg text-mist">{s.subhead}</p>
                  <Link
                    href={s.ctaHref}
                    className="mt-8 inline-block rounded bg-star px-6 py-3 text-sm font-medium text-night transition hover:brightness-110"
                  >
                    {s.ctaLabel}
                  </Link>
                </div>
              </section>
            );
          }
          case 'intro': {
            const HTag = heroSeen || i > 0 ? 'h2' : 'h1';
            if (HTag === 'h1') heroSeen = true;
            return (
              <section key={i} className="bg-paper">
                <div className="mx-auto max-w-3xl px-6 py-20">
                  <Eyebrow text={s.eyebrow} />
                  <HTag className="font-display text-3xl text-night sm:text-4xl">
                    {s.heading}
                  </HTag>
                  <div
                    className="prose-body mt-6 text-lg leading-relaxed text-slate"
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
              </section>
            );
          }
          case 'cards':
            return (
              <section key={i} className="bg-mist-wash">
                <div className="mx-auto max-w-5xl px-6 py-20">
                  <Eyebrow text={s.eyebrow} />
                  {s.heading && (
                    <h2 className="font-display text-3xl text-night">{s.heading}</h2>
                  )}
                  <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {s.cards.map((c, j) => {
                      const inner = (
                        <div
                          className={`h-full rounded-md border-t-[3px] bg-white p-6 shadow-sm transition hover:shadow-md ${accentBorder[c.accent ?? 'slate']}`}
                        >
                          <h3 className="text-lg font-medium text-night">{c.title}</h3>
                          <p className="mt-3 text-sm leading-relaxed text-mid">{c.body}</p>
                        </div>
                      );
                      return c.href ? (
                        <Link key={j} href={c.href} className="block h-full">
                          {inner}
                        </Link>
                      ) : (
                        <div key={j} className="h-full">{inner}</div>
                      );
                    })}
                  </div>
                </div>
              </section>
            );
          case 'split':
            return (
              <section key={i} className="bg-paper">
                <div
                  className={`mx-auto flex max-w-5xl flex-col gap-10 px-6 py-20 sm:items-center ${s.flip ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
                >
                  <div className="sm:w-1/2">
                    <Eyebrow text={s.eyebrow} />
                    <h2 className="font-display text-3xl text-night">{s.heading}</h2>
                    <div
                      className="mt-5 leading-relaxed text-slate"
                      dangerouslySetInnerHTML={{ __html: s.body }}
                    />
                  </div>
                  {s.imageUrl && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md sm:w-1/2">
                      <Image
                        src={s.imageUrl}
                        alt={s.imageAlt ?? ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </section>
            );
          case 'list':
            return (
              <section key={i} className="border-t border-pale bg-paper" id={s.eyebrow?.toLowerCase().includes('nonprofit') ? 'nonprofits' : s.eyebrow?.toLowerCase().includes('funder') ? 'foundations' : s.eyebrow?.toLowerCase().includes('investor') ? 'investors' : undefined}>
                <div className="mx-auto max-w-3xl px-6 py-16">
                  <Eyebrow text={s.eyebrow} />
                  <h2 className="font-display text-2xl text-night sm:text-3xl">{s.heading}</h2>
                  <dl className="mt-8 space-y-8">
                    {s.items.map((item, j) => (
                      <div key={j} className="border-l-2 border-mist pl-5">
                        <dt className="font-medium text-night">{item.title}</dt>
                        <dd className="mt-1 leading-relaxed text-mid">{item.body}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            );
          case 'cta':
            return (
              <section key={i} className="relative overflow-hidden bg-night-wash">
                <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
                  <h2 className="font-display text-2xl text-paper sm:text-3xl">{s.heading}</h2>
                  {s.body && <p className="mx-auto mt-4 max-w-xl text-mist">{s.body}</p>}
                  <Link
                    href={s.ctaHref}
                    className="mt-7 inline-block rounded bg-star px-6 py-3 text-sm font-medium text-night transition hover:brightness-110"
                  >
                    {s.ctaLabel}
                  </Link>
                </div>
              </section>
            );
          case 'contact': {
            const HTag = heroSeen ? 'h2' : 'h1';
            heroSeen = true;
            return (
              <section key={i} className="bg-paper">
                <div className="mx-auto max-w-2xl px-6 py-20">
                  <HTag className="font-display text-3xl text-night sm:text-4xl">
                    {s.heading}
                  </HTag>
                  <p className="mt-4 leading-relaxed text-slate">{s.body}</p>
                  <div className="mt-10">
                    <ContactForm />
                  </div>
                </div>
              </section>
            );
          }
          default:
            return null;
        }
      })}
    </>
  );
}
