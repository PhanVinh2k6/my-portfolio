import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Phan Vinh Portfolio',
    short_name: 'Phan Vinh',
    description: 'Product-minded developer portfolio and experiments.',
    start_url: '/',
    display: 'standalone',
    background_color: '#111313',
    theme_color: '#3157c7',
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
