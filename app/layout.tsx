import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Phan Vinh — Product-minded Developer',
  description: 'Portfolio của Phan Vinh — developer, system thinker và người xây những trải nghiệm số rõ ràng hơn.',
  openGraph: {
    title: 'Phan Vinh — Product-minded Developer',
    description: 'Selected work, approach and experiments by Phan Vinh.',
    type: 'website',
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
