import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="45" fill="#ec4899" opacity="0.3" />
          <circle cx="50" cy="50" r="30" fill="#ec4899" opacity="0.6" />
          <circle cx="50" cy="50" r="15" fill="#ec4899" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
