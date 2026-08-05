import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Constellation from '@/components/Constellation';

export default function NotFound() {
  return (
    <>
      <Nav dark />
      <main className="relative overflow-hidden bg-night-wash">
        <Constellation />
        <div className="relative mx-auto max-w-3xl px-6 py-40 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-mid">404</p>
          <h1 className="mt-4 font-display text-4xl text-paper">
            This page is off the map
          </h1>
          <p className="mx-auto mt-4 max-w-md text-mist">
            The page you are looking for does not exist or has moved.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded bg-star px-6 py-3 text-sm font-medium text-night transition hover:brightness-110"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
