import { AnimatePresence, motion } from 'framer-motion';
import { Menu, ShoppingBag, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useSectionNav } from '../lib/scroll';
import { Logo } from './Logo';

export function Header() {
  const { count, open } = useCart();
  const goSection = useSectionNav();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { label: string; to?: string; section?: string }[] = [
    { label: 'Home', to: '/' },
    { label: 'Collections', section: 'collections' },
    { label: 'Custom Bouquets', section: 'custom' },
    { label: 'About Us', to: '/about' },
  ];

  const NavItem = ({ l, mobile }: { l: (typeof links)[number]; mobile?: boolean }) => {
    const cls = mobile
      ? 'block py-4 font-serif text-3xl text-ink border-b border-ink/10'
      : 'nav-link text-[12px] uppercase tracking-[0.2em] text-ink/80 hover:text-ink';
    const id = `nav-${mobile ? 'mobile-' : ''}${l.label.toLowerCase().replace(/\s+/g, '-')}`;
    return l.to ? (
      <Link to={l.to} className={cls} data-testid={id} onClick={() => setMenu(false)}>
        {l.label}
      </Link>
    ) : (
      <button className={`${cls} text-left`} data-testid={id} onClick={() => { setMenu(false); goSection(l.section!); }}>
        {l.label}
      </button>
    );
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow,border-color] duration-500 ${
        scrolled || menu ? 'border-b border-gold/25 bg-cream shadow-[0_10px_30px_-24px_rgba(23,18,15,0.35)]' : 'border-b border-gold/10 bg-cream'
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1320px] items-center justify-between px-5 sm:px-8 lg:h-20">
        <Link to="/" data-testid="header-logo-link" aria-label="Bunch of Love home" onClick={() => setMenu(false)}>
          <Logo className="h-16 lg:h-[76px]" />
        </Link>
        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {links.map((l) => <NavItem key={l.label} l={l} />)}
        </nav>
        <div className="flex items-center gap-1">
          <button
            onClick={open}
            data-testid="header-cart-button"
            aria-label={`Open cart, ${count} items`}
            className="relative flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-gold-deep"
          >
            <ShoppingBag className="h-[22px] w-[22px]" strokeWidth={1.4} />
            <motion.span
              key={count}
              initial={{ scale: 0.4 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              data-testid="header-cart-count"
              className="absolute right-0.5 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ink px-1 text-[10px] font-medium text-ivory"
            >
              {count}
            </motion.span>
          </button>
          <button
            className="flex h-11 w-11 items-center justify-center md:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-label="Toggle menu"
            aria-expanded={menu}
            data-testid="mobile-menu-toggle"
          >
            {menu ? <X strokeWidth={1.4} /> : <Menu strokeWidth={1.4} />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden bg-cream md:hidden"
            aria-label="Mobile"
            data-testid="mobile-menu"
          >
            <div className="px-6 pb-8 pt-2">
              {links.map((l) => <NavItem key={l.label} l={l} mobile />)}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
