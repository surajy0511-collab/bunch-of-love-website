import { Camera, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { BRAND, INSTAGRAM_URL } from '../config';
import { useSectionNav } from '../lib/scroll';
import { openWhatsApp } from '../lib/utils';
import { Logo } from './Logo';

export function Footer() {
  const goSection = useSectionNav();
  const linkCls = 'text-sm text-ink/75 transition-colors hover:text-gold-deep text-left';
  return (
    <footer className="border-t border-gold/25 bg-cream" data-testid="site-footer">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo className="h-40 sm:h-44" />
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink/75">{BRAND.tagline}</p>
        </div>
        <nav className="flex flex-col gap-3 md:col-span-3" aria-label="Footer">
          <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-gold-deep">Explore</p>
          <Link to="/" className={linkCls} data-testid="footer-link-home">Home</Link>
          <button onClick={() => goSection('collections')} className={linkCls} data-testid="footer-link-collections">Collections</button>
          <Link to="/about" className={linkCls} data-testid="footer-link-about">About Us</Link>
          <button onClick={() => goSection('custom')} className={linkCls} data-testid="footer-link-custom">Custom Bouquets</button>
          <button onClick={() => goSection('bulk')} className={linkCls} data-testid="footer-link-bulk">Bulk Bookings</button>
        </nav>
        <div className="flex flex-col gap-3 md:col-span-4">
          <p className="mb-1 text-[11px] uppercase tracking-[0.25em] text-gold-deep">Connect</p>
          <button onClick={() => openWhatsApp('Hi Bunch of Love!')} className={`${linkCls} flex items-center gap-2`} data-testid="footer-whatsapp-link">
            <MessageCircle className="h-4 w-4" strokeWidth={1.4} /> Chat on WhatsApp
          </button>
          <a href={INSTAGRAM_URL} className={`${linkCls} flex items-center gap-2`} data-testid="footer-instagram-link">
            <Camera className="h-4 w-4" strokeWidth={1.4} /> Instagram
          </a>
          <p className="text-sm text-ink/65">{BRAND.city}, India</p>
        </div>
      </div>
      <div className="border-t border-ink/10">
        <p className="mx-auto max-w-[1320px] px-5 py-6 text-xs text-ink/60 sm:px-8">
          © {new Date().getFullYear()} Bunch of Love. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
