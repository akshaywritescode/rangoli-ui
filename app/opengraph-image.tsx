import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Rangoli - UI Component Library';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #000000 0%, #1a0a1a 50%, #000000 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Decorative dots pattern */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0.1,
            background: 'radial-gradient(circle, rgba(236,72,153,0.4) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        {/* Logo (simplified version) */}
        <div
          style={{
            display: 'flex',
            width: '180px',
            height: '180px',
            marginBottom: '40px',
          }}
        >
          <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" fill="#ec4899" opacity="0.2" />
            <circle cx="50" cy="50" r="30" fill="#ec4899" opacity="0.4" />
            <circle cx="50" cy="50" r="15" fill="#ec4899" />
          </svg>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 'bold',
            background: 'linear-gradient(to right, #ffffff, rgba(255,255,255,0.6))',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            marginBottom: '20px',
          }}
        >
          Rangoli
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.7)',
            textAlign: 'center',
          }}
        >
          Beautiful UI components. New component every week.
        </div>

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            marginTop: '40px',
            padding: '12px 24px',
            background: 'rgba(236,72,153,0.1)',
            border: '1px solid rgba(236,72,153,0.3)',
            borderRadius: '999px',
            fontSize: 18,
            color: '#ec4899',
          }}
        >
          Free & Open Source
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
