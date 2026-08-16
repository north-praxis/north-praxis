import Link from 'next/link';
import Image from 'next/image';
import type { Section, CardItem } from '@/lib/types';
import Constellation from './Constellation';
import ContactForm from './ContactForm';

function Eyebrow({ text, light = false }: { text?: string; light?: boolean }) {
  if (!text) return null;
  return (
    <p
      className={`mb-4 text-[11px] uppercase tracking-[0.35em] ${light ? 'text-star' : 'text-star'}`}
    >
      {text}
    </p>
  );
}

function GoldRule() {
  return <span className="mt-4 block h-px w-10 bg-star/70" aria-hidden="true" />;
}

const buttonPrimary =
  'inline-block rounded-full border border-star/50 px-9 py-4 text-xs uppercase tracking-[0.25em] text-star transition duration-500 hover:border-star hover:bg-star hover:text-night';

const buttonDark =
  'inline-block rounded-full bg-night px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-paper transition duration-300 hover:bg-deep hover:shadow-lg';

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
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(560px 380px at 79% 18%, rgba(216,167,91,0.05), transparent 70%), radial-gradient(120% 95% at 50% 38%, transparent 55%, rgba(2,3,7,0.45) 100%)',
                  }}
                  aria-hidden="true"
                />
                <div className="relative mx-auto max-w-5xl px-6 pb-28 pt-40 sm:pb-36 sm:pt-52">
                  <HTag
                    className="hero-h max-w-3xl font-display text-7xl leading-[1.02] text-[#F2EAD9] sm:text-8xl"
                    dangerouslySetInnerHTML={{ __html: s.headline }}
                  />
                  <p className="mt-6 max-w-xl text-lg font-light leading-relaxed text-mist/75">
                    {s.subhead}
                  </p>
                  <Link href={s.ctaHref} className={`mt-10 ${buttonPrimary}`}>
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
                <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
                  <Eyebrow text={s.eyebrow} />
                  <HTag className="font-display text-3xl font-normal leading-snug text-night sm:text-4xl">
                    {s.heading}
                  </HTag>
                  <GoldRule />
                  <div
                    className="prose-body mt-5 text-lg font-light leading-[1.85] text-slate"
                    dangerouslySetInnerHTML={{ __html: s.body }}
                  />
                </div>
              </section>
            );
          }
          case 'cards':
            return (
              <section key={i} className="bg-mist-wash">
                <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
                  <Eyebrow text={s.eyebrow} />
                  {s.heading && (
                    <h2 className="font-display text-3xl font-normal text-night sm:text-4xl">
                      {s.heading}
                    </h2>
                  )}
                  <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {s.cards.map((c: CardItem, j: number) => {
                      const inner = (
                        <div className="group h-full rounded-lg border border-slate/10 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-star/40 hover:shadow-xl hover:shadow-slate/10">
                          <h3 className="font-display text-xl font-normal text-night">
                            {c.title}
                          </h3>
                          <span className="mt-3 block h-px w-8 bg-star/60 transition-all duration-300 group-hover:w-14" aria-hidden="true" />
                          <p className="mt-5 text-[15px] font-light leading-[1.8] text-mid">
                            {c.body}
                          </p>
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
                  className={`mx-auto flex max-w-5xl flex-col gap-10 px-6 py-16 sm:items-center ${s.flip ? 'sm:flex-row-reverse' : 'sm:flex-row'}`}
                >
                  <div className="sm:w-1/2">
                    <Eyebrow text={s.eyebrow} />
                    <h2 className="font-display text-3xl font-normal text-night">
                      {s.heading}
                    </h2>
                    <GoldRule />
                    <div
                      className="mt-6 font-light leading-[1.85] text-slate"
                      dangerouslySetInnerHTML={{ __html: s.body }}
                    />
                  </div>
                  {s.imageUrl && (
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg sm:w-1/2">
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
              <section
                key={i}
                className="border-t border-slate/10 bg-paper"
                id={
                  s.eyebrow?.toLowerCase().includes('nonprofit')
                    ? 'nonprofits'
                    : s.eyebrow?.toLowerCase().includes('funder')
                      ? 'foundations'
                      : s.eyebrow?.toLowerCase().includes('investor')
                        ? 'investors'
                        : undefined
                }
              >
                <div className="mx-auto max-w-3xl px-6 py-14 sm:py-16">
                  <Eyebrow text={s.eyebrow} />
                  <h2 className="font-display text-2xl font-normal text-night sm:text-3xl">
                    {s.heading}
                  </h2>
                  <dl className="mt-8 space-y-7">
                    {s.items.map((item, j) => (
                      <div key={j} className="border-l border-star/50 pl-6">
                        <dt className="font-display text-lg text-night">{item.title}</dt>
                        <dd className="mt-2 font-light leading-[1.8] text-mid">
                          {item.body}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </section>
            );
          case 'cta':
            return (
              <section key={i} className="relative overflow-hidden bg-night-wash">
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(500px 300px at 50% 100%, rgba(216,167,91,0.08), transparent 70%)',
                  }}
                  aria-hidden="true"
                />
                <div className="relative mx-auto max-w-3xl px-6 py-16 text-center">
                  <h2 className="font-display text-3xl font-normal text-paper sm:text-4xl">
                    {s.heading}
                  </h2>
                  {s.body && (
                    <p className="mx-auto mt-5 max-w-xl font-light leading-relaxed text-mist">
                      {s.body}
                    </p>
                  )}
                  <Link href={s.ctaHref} className={`mt-9 ${buttonPrimary}`}>
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
                <div className="mx-auto max-w-2xl px-6 py-24">
                  <HTag className="font-display text-4xl font-normal text-night">
                    {s.heading}
                  </HTag>
                  <GoldRule />
                  <p className="mt-6 font-light leading-[1.85] text-slate">{s.body}</p>
                  <div className="mt-12">
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
