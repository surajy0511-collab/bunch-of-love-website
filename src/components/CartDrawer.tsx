import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, X } from 'lucide-react';
import { useEffect } from 'react';
import { GIFT_NOTE_MAX, useCart, type CartItem as Item, type Delivery } from '../context/CartContext';
import { getLenis, useSectionNav } from '../lib/scroll';
import { inr, openWhatsApp } from '../lib/utils';
import { BloomMark } from './BloomMark';
import { CartItem } from './CartItem';
import { Price } from './Price';
import { DeliveryPicker, formatDeliveryDate } from './DeliveryPicker';

export function buildOrderMessage(items: Item[], subtotal: number, giftNote = '', delivery: Delivery = { date: '', slot: '' }) {
  const lines = items.map(
    ({ product: p, qty }, i) =>
      `${i + 1}. ${p.name}\n   Price: ${inr(p.price)}\n   Quantity: ${qty}\n   Total: ${inr(p.price * qty)}`,
  );
  return [
    'Hi Bunch of Love!',
    '',
    "I'd like to place an order for the following bouquets:",
    '',
    lines.join('\n\n'),
    '',
    `Subtotal: ${inr(subtotal)}`,
    '',
    ...(delivery.date || delivery.slot
      ? [
          'Preferred delivery:',
          ...(delivery.date ? [`Date: ${formatDeliveryDate(delivery.date)}`] : []),
          ...(delivery.slot ? [`Time slot: ${delivery.slot}`] : []),
          '',
        ]
      : []),
    ...(giftNote.trim() ? ['Gift card message:', `"${giftNote.trim()}"`, ''] : []),
    'Please confirm availability and delivery details.',
    '',
    'Thank you!',
  ].join('\n');
}

export function CartDrawer() {
  const { items, subtotal, count, isOpen, close, giftNote, setGiftNote, delivery } = useCart();
  const goSection = useSectionNav();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    getLenis()?.stop();
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      getLenis()?.start();
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
          <motion.div
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            data-testid="cart-backdrop"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-[90vw] flex-col bg-ivory shadow-2xl md:w-[40vw] md:min-w-[420px] md:max-w-[560px]"
            data-testid="cart-drawer"
          >
            <div className="flex items-center justify-between border-b border-gold/25 px-6 py-5 sm:px-8">
              <h2 className="font-serif text-3xl text-ink">
                Your Cart <span className="text-base text-ink/55">({count})</span>
              </h2>
              <button onClick={close} aria-label="Close cart" data-testid="cart-close-button" className="flex h-10 w-10 items-center justify-center text-ink transition-transform duration-300 hover:rotate-90">
                <X strokeWidth={1.3} />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center" data-testid="cart-empty-state">
                <BloomMark className="h-14 w-14 text-gold" />
                <p className="mt-6 max-w-xs font-serif text-3xl italic leading-tight text-ink">Your cart is waiting for something beautiful.</p>
                <button
                  onClick={() => {
                    close();
                    goSection('collections');
                  }}
                  className="btn-primary mt-8"
                  data-testid="cart-explore-bouquets-btn"
                >
                  Explore Our Bouquets
                </button>
              </div>
            ) : (
              <>
                <ul className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-8" data-lenis-prevent data-testid="cart-items-list">
                  <AnimatePresence initial={false}>
                    {items.map((it) => <CartItem key={it.product.id} item={it} />)}
                  </AnimatePresence>
                  <li className="list-none">
                    <DeliveryPicker />
                  </li>
                  <li className="list-none py-6">
                    <label htmlFor="gift-note" className="flex items-baseline justify-between text-xs uppercase tracking-[0.22em] text-ink/70">
                      <span>Gift card message <span className="normal-case tracking-normal text-ink/50">(optional)</span></span>
                      <span className="tracking-normal text-ink/50" data-testid="gift-note-counter">{giftNote.length}/{GIFT_NOTE_MAX}</span>
                    </label>
                    <textarea
                      id="gift-note"
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      maxLength={GIFT_NOTE_MAX}
                      rows={3}
                      placeholder="Write a few words for the card that goes with your bouquet…"
                      data-testid="gift-note-input"
                      className="mt-3 w-full resize-none border border-ink/15 bg-white px-4 py-3 font-serif text-lg italic leading-snug text-ink outline-none placeholder:text-ink/40 focus:border-gold"
                    />
                  </li>
                </ul>
                <div className="border-t border-gold/25 bg-beige/60 px-6 py-6 sm:px-8">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs uppercase tracking-[0.22em] text-ink/70">Subtotal</span>
                    <span className="font-serif text-3xl text-ink" data-testid="cart-subtotal"><Price value={subtotal} /></span>
                  </div>
                  <p className="mt-2 text-xs text-ink/60" data-testid="cart-delivery-note">Delivered within 24–48 hours. Availability is confirmed with you on WhatsApp.</p>
                  <button
                    onClick={() => openWhatsApp(buildOrderMessage(items, subtotal, giftNote, delivery))}
                    className="btn-primary mt-5 w-full gap-2"
                    data-testid="cart-whatsapp-checkout-btn"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> Checkout on WhatsApp
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
