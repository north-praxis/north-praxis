'use client';

import Link from 'next/link';
import { useState } from 'react';
import { NAV_LINKS } from '@/lib/defaults';

export default function Nav({ dark = false }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const text = dark ? 'text-mist' : 'text-slate';
  const hover = dark ? 'hover:text-white' : 'hover:text-night';

  return (
    <header className={dark ? 'absolute inset-x-0 top-0 z-20' : 'bg-paper border-b border-pale'}>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className={`font-mono text-sm tracking-[0.2em] ${dark ? 'text-mist' : 'text-night'} ${hover}`}
        >
          NORTH PRAXIS
        </Link>
        <div className="hidden gap-8 sm:flex">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={`text-sm ${text} ${hover}`}>
              {l.label}
            </Link>
          ))}
        </div>
        <button
          className={`sm:hidden ${text}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>
      {open && (
        <div className={`sm:hidden ${dark ? 'bg-night/95' : 'bg-paper'} border-t border-slate/20 px-6 py-4`}>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`block py-3 text-base ${text} ${hover}`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
