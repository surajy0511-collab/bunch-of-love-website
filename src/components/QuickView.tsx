import { AnimatePresence, motion } from 'framer-motion';
import { Check, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { CATEGORIES } from '../data/products';
import { getLenis } from '../lib/scroll';
import { bouquetSrc } from '../lib/utils';
import { Price } from './Price';
import { SmartImage } from './SmartImage';

const ease = [0.22, 1, 0.36, 1] as const;

export function QuickView() {
  const { quickView: p, setQuickView, add } = useCart();
  const [added, setAdded] = useState(false);
  const close = () => setQuickView(null);

  useEffect(() => {
    if (!p) return;
    setAdded(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setQuickView(null);
    };
    window.addEventListener('keydown', onKey);
    getLenis()?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      getLenis()?.start();
      document.body.style.overflow = '';
    };
  }, [p, setQuickView]);

  return (
    <AnimatePresence>
      {p && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true" aria-label={p.name}>
          <motion.div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close} data-testid="quick-view-backdrop" />
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.5, ease }}
            className="relative flex max-h-[92svh] w-full max-w-[980px] flex-col overflow-y-auto bg-ivory shadow-2xl md:grid md:grid-cols-[1.1fr_1fr]"
            data-lenis-prevent
            data-testid="quick-view-modal"
          >
            <button onClick={close} aria-label="Close quick view" data-testid="quick-view-close" className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-ivory/90 text-ink transition-transform duration-300 hover:rotate-90">
              <X strokeWidth={1.3} />
            </button>
            <SmartImage src={bouquetSrc(p.image)} alt={`${p.name} bouquet by Bunch of Love`} eager className="aspect-square w-full shrink-0 md:aspect-[4/5]" />
            <div className="flex shrink-0 flex-col justify-center p-6 sm:p-10">
              <p className="text-[11px] uppercase tracking-[0.25em] text-gold-deep">{CATEGORIES.find((c) => c.key === p.category)?.label}</p>
              <h2 className="mt-3 font-serif text-3xl leading-tight text-ink sm:text-4xl" data-testid="quick-view-name">{p.name}</h2>
              <p className="mt-3 font-serif text-2xl font-medium text-ink" data-testid="quick-view-price"><Price value={p.price} /></p>
              {p.occasionTags.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-ink/60">Perfect for</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.occasionTags.map((t) => (
                      <span key={t} className="border border-gold/40 px-3 py-1 text-xs text-ink/80">{t}</span>
                    ))}
                  </div>
                </div>
              )}
              <p className="mt-6 text-sm leading-relaxed text-ink/70">Handcrafted to order by Bunch of Love in Bengaluru and delivered within 24–48 hours. Availability is confirmed with you on WhatsApp.</p>
              <button
                onClick={() => {
                  add(p.id);
                  setAdded(true);
                }}
                className="btn-primary mt-8 w-full gap-2"
                data-testid="quick-view-add-to-cart"
              >
                {added ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {added ? 'Added — Add Another' : 'Add to Cart'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
