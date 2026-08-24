import type { Metadata, Viewport } from 'next';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import ArcadeLoader from '@/components/ArcadeLoader';

const siteUrl = 'https://phanvinh.id.vn';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Phan Vinh — Product-minded Developer',
    template: '%s | Phan Vinh',
  },
  description: 'Portfolio của Phan Vinh — developer, system thinker và người xây những trải nghiệm số rõ ràng hơn.',
  keywords: ['Phan Vinh', 'developer Vietnam', 'frontend developer', 'product design', 'AI research', 'ICTU'],
  authors: [{ name: 'Phan Vinh', url: siteUrl }],
  creator: 'Phan Vinh',
  alternates: { canonical: siteUrl },
  openGraph: {
    title: 'Phan Vinh — Product-minded Developer',
    description: 'Selected work, approach and experiments by Phan Vinh.',
    url: siteUrl,
    siteName: 'Phan Vinh',
    locale: 'vi_VN',
    type: 'website',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Phan Vinh — Product-minded Developer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phan Vinh — Product-minded Developer',
    description: 'Selected work, approach and experiments by Phan Vinh.',
    images: ['/twitter-image'],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f2f0eb' },
    { media: '(prefers-color-scheme: dark)', color: '#171817' },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { const saved = localStorage.getItem('portfolio-theme'); const preferred = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'; document.documentElement.classList.toggle('dark', (saved || preferred) === 'dark'); } catch (error) {}` }} />
      </head>
      <body>
        <ArcadeLoader />
        <GoogleAnalytics />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            { '@type': 'Person', name: 'Phan Vinh', url: siteUrl, jobTitle: 'Product-minded Developer', sameAs: ['https://github.com/PhanVinh2k6'] },
            { '@type': 'WebSite', name: 'Phan Vinh Portfolio', url: siteUrl, inLanguage: 'vi-VN' },
          ],
        }) }} />
      </body>
    </html>
  );
}
