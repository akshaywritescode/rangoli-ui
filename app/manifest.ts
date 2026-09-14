import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Rangoli - UI Component Library',
    short_name: 'Rangoli',
    description: 'Beautiful UI components. New component every week.',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ec4899',
    icons: [
      {
        src: '/icon',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        src: '/apple-icon',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
