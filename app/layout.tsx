import type { Metadata } from 'next';
import { Julius_Sans_One, Inter, IBM_Plex_Mono } from 'next/font/google';
import { SITE } from '@/lib/defaults';
import './globals.css';

const display = Julius_Sans_One({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '400',
});
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'North Praxis | Strategy for mission-driven work',
    template: '%s | North Praxis',
  },
  description:
    'North Praxis helps nonprofits, foundations, DAFs, and impact investors turn values into clear plans and working systems.',
  openGraph: {
    siteName: SITE.name,
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body className="bg-paper font-sans text-night antialiased">{children}</body>
    </html>
  );
}
