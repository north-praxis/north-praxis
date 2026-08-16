import { ImageResponse } from 'next/og';

// Social share image: generated at the edge in the site's real look.
export const runtime = 'edge';
export const alt = 'North Praxis. Find your north.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

async function loadFont() {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@100&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0' } }
  ).then((r) => r.text());
  const url = css.match(/src: url\((.+?)\) format\('(?:woff2?|truetype|opentype)'\)/)?.[1];
  if (!url) return null;
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function OgImage() {
  const font = await loadFont();
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px',
          background: 'linear-gradient(172deg, #030407 0%, #06081A 45%, #0C102B 85%, #131538 100%)',
          position: 'relative',
        }}
      >
        <svg
          width="1200"
          height="630"
          viewBox="0 0 1200 630"
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          <path
            d="M920 120 L860 180 L800 232 L742 280"
            stroke="#44618B"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M742 280 L652 312 L672 392 L766 366 L742 280"
            stroke="#44618B"
            strokeWidth="1"
            fill="none"
            opacity="0.6"
          />
          <circle cx="860" cy="180" r="3" fill="#C3D2E5" />
          <circle cx="800" cy="232" r="2.6" fill="#C3D2E5" />
          <circle cx="742" cy="280" r="3.2" fill="#C3D2E5" />
          <circle cx="652" cy="312" r="2.8" fill="#C3D2E5" />
          <circle cx="672" cy="392" r="3.4" fill="#C3D2E5" />
          <circle cx="766" cy="366" r="3.6" fill="#C3D2E5" />
          <circle cx="920" cy="120" r="5" fill="#E2C084" />
          <circle cx="920" cy="120" r="20" fill="none" stroke="#D8A75B" strokeWidth="1.2" opacity="0.5" />
          <circle cx="180" cy="500" r="2" fill="#8FA6C0" opacity="0.4" />
          <circle cx="360" cy="90" r="2" fill="#8FA6C0" opacity="0.4" />
          <circle cx="1080" cy="420" r="2" fill="#8FA6C0" opacity="0.35" />
          <circle cx="520" cy="540" r="1.8" fill="#8FA6C0" opacity="0.3" />
        </svg>
        <div
          style={{
            fontSize: 130,
            color: '#F2EAD9',
            letterSpacing: '0.08em',
            fontFamily: font ? 'BigShoulders' : 'sans-serif',
            display: 'flex',
          }}
        >
          FIND YOUR&nbsp;<span style={{ color: '#D8A75B' }}>NORTH</span>
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 26,
            color: '#8FA6C0',
            letterSpacing: '0.35em',
            display: 'flex',
          }}
        >
          NORTH PRAXIS · PRAXISNORTH.COM
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font
        ? [{ name: 'BigShoulders', data: font, style: 'normal', weight: 100 }]
        : undefined,
    }
  );
}
