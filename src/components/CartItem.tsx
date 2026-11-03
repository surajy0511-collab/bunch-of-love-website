import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useCart, type CartItem as Item } from '../context/CartContext';
import { bouquetSrc } from '../lib/utils';
import { Price } from './Price';
import { SmartImage } from './SmartImage';

export function CartItem({ item }: { item: Item }) {
  const { inc, dec, remove } = useCart();
  const { product: p, qty } = item;
  return (
    <motion.li
      layout
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40, transition: { duration: 0.25 } }}
      className="flex gap-4 border-b border-ink/10 py-5"
      data-testid={`cart-item-${p.id}`}
    >
      <SmartImage src={bouquetSrc(p.image)} alt={p.name} className="aspect-[4/5] w-20 shrink-0 sm:w-24" />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-lg leading-tight text-ink">{p.name}</h3>
          <button onClick={() => remove(p.id)} aria-label={`Remove ${p.name}`} data-testid={`cart-remove-${p.id}`} className="p-1 text-ink/50 transition-colors hover:text-ink">
            <Trash2 className="h-4 w-4" strokeWidth={1.4} />
          </button>
        </div>
        <p className="mt-1 font-serif text-base text-ink/80"><Price value={p.price} /></p>
        <div className="mt-auto flex items-center justify-between pt-3">
          <div className="flex items-center border border-ink/20">
            <button onClick={() => dec(p.id)} aria-label="Decrease quantity" data-testid={`cart-decrease-${p.id}`} className="flex h-9 w-9 items-center justify-center hover:bg-beige">
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-8 text-center text-sm" data-testid={`cart-qty-${p.id}`}>{qty}</span>
            <button onClick={() => inc(p.id)} aria-label="Increase quantity" data-testid={`cart-increase-${p.id}`} className="flex h-9 w-9 items-center justify-center hover:bg-beige">
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <span className="font-serif text-base font-medium text-ink" data-testid={`cart-line-total-${p.id}`}><Price value={p.price * qty} /></span>
        </div>
      </div>
    </motion.li>
  );
}
