import Link from 'next/link';
import { NAV_LINKS, SITE } from '@/lib/defaults';

export default function Footer() {
  return (
    <footer className="bg-night text-mist">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-mono text-sm tracking-[0.2em]">NORTH PRAXIS</p>
          <p className="mt-2 text-sm text-mid">
            Strategy and systems for mission-driven work.
          </p>
        </div>
        <nav className="flex gap-6">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-mist hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate/40">
        <p className="mx-auto max-w-5xl px-6 py-4 text-xs text-mid">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
