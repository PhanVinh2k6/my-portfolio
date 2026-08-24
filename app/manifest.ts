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
    icons: [{ src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' }],
  };
}
