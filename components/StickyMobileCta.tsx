import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function StickyMobileCta() {
  return (
    <div className="sticky-mobile-cta" aria-label="Quick contact action">
      <Link href="/#contact">Have a good problem? <ArrowUpRight size={15} /></Link>
    </div>
  );
}
