import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/defaults';

export default function Footer() {
  return (
    <footer className="bg-night text-mist">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-xl tracking-wide text-paper">North Praxis</p>
          <p className="mt-2 text-sm font-light text-mid">
            We reflect. We discern. And then we act.
          </p>
        </div>
        <nav className="flex gap-8">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] uppercase tracking-[0.18em] text-mist transition hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-mist/10">
        <p className="mx-auto max-w-5xl px-6 py-5 text-xs font-light text-mid">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
