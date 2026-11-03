import { createContext, useContext, useEffect, useMemo, useReducer, useState, type ReactNode } from 'react';
import { PRODUCT_MAP, type Product } from '../data/products';

type Line = { id: string; qty: number };
type Action = { type: 'add' | 'inc' | 'dec' | 'remove'; id: string };

const KEY = 'bunch-of-love-cart';
const NOTE_KEY = 'bunch-of-love-gift-note';
const DELIVERY_KEY = 'bunch-of-love-delivery';
export type Delivery = { date: string; slot: string };
export const GIFT_NOTE_MAX = 250;

function reducer(state: Line[], { type, id }: Action): Line[] {
  const exists = state.some((l) => l.id === id);
  switch (type) {
    case 'add':
    case 'inc':
      return exists ? state.map((l) => (l.id === id ? { ...l, qty: l.qty + 1 } : l)) : [...state, { id, qty: 1 }];
    case 'dec':
      return state.flatMap((l) => (l.id !== id ? [l] : l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []));
    case 'remove':
      return state.filter((l) => l.id !== id);
  }
}

function load(): Line[] {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    return Array.isArray(raw)
      ? raw.filter((l) => l && PRODUCT_MAP[l.id] && Number.isInteger(l.qty) && l.qty > 0)
      : [];
  } catch {
    return [];
  }
}

export type CartItem = { product: Product; qty: number };

interface CartValue {
  items: CartItem[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  giftNote: string;
  delivery: Delivery;
  setDelivery: (d: Delivery) => void;
  setGiftNote: (v: string) => void;
  quickView: Product | null;
  setQuickView: (p: Product | null) => void;
  open: () => void;
  close: () => void;
  add: (id: string) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
}

const CartContext = createContext<CartValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, dispatch] = useReducer(reducer, [], load);
  const [isOpen, setOpen] = useState(false);
  const [giftNote, setGiftNote] = useState(() => (localStorage.getItem(NOTE_KEY) || '').slice(0, GIFT_NOTE_MAX));
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [delivery, setDelivery] = useState<Delivery>(() => {
    try {
      const d = JSON.parse(localStorage.getItem(DELIVERY_KEY) || '{}');
      const today = new Date().toLocaleDateString('en-CA');
      return { date: typeof d.date === 'string' && d.date >= today ? d.date : '', slot: typeof d.slot === 'string' ? d.slot : '' };
    } catch {
      return { date: '', slot: '' };
    }
  });

  useEffect(() => {
    localStorage.setItem(DELIVERY_KEY, JSON.stringify(delivery));
  }, [delivery]);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    localStorage.setItem(NOTE_KEY, giftNote);
  }, [giftNote]);

  const value = useMemo<CartValue>(() => {
    const items = lines.map((l) => ({ product: PRODUCT_MAP[l.id], qty: l.qty }));
    return {
      items,
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.qty * i.product.price, 0),
      isOpen,
      giftNote,
      delivery,
      setDelivery,
      setGiftNote: (v) => setGiftNote(v.slice(0, GIFT_NOTE_MAX)),
      quickView,
      setQuickView,
      open: () => setOpen(true),
      close: () => setOpen(false),
      add: (id) => dispatch({ type: 'add', id }),
      inc: (id) => dispatch({ type: 'inc', id }),
      dec: (id) => dispatch({ type: 'dec', id }),
      remove: (id) => dispatch({ type: 'remove', id }),
    };
  }, [lines, isOpen, giftNote, quickView, delivery]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
