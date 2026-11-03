import { ArrowRight } from 'lucide-react';
import type { Category } from '../data/products';
import { bouquetSrc } from '../lib/utils';
import { Eyebrow, Reveal } from './Reveal';
import { SmartImage } from './SmartImage';

const cards: { key: Category; range: string; title: string; desc: string; cta: string; image: string }[] = [
  {
    key: 'Below1000',
    range: 'Under ₹1,000',
    title: 'Little Gestures, Big Feelings',
    desc: 'Beautiful blooms for everyday surprises and thoughtful moments.',
    cta: 'Explore Under ₹1,000',
    image: 'Sunshine Gerbera Posy-899-Below1000.jpg',
  },
  {
    key: '1000to2000',
    range: '₹1,000 – ₹2,000',
    title: 'Beautifully Thoughtful',
    desc: 'Elegant floral arrangements for moments worth celebrating.',
    cta: 'Explore the Collection',
    image: 'Lavender Cloud Hydrangea-1299-1000to2000.jpg',
  },
  {
    key: 'Above2000',
    range: 'Above ₹2,000',
    title: 'The Art of Luxury',
    desc: 'Statement bouquets designed to make extraordinary moments unforgettable.',
    cta: 'Discover Luxury',
    image: 'Royal Red Rose Tulip Grandeur-7499-Above2000.jpg',
  },
];

export function PriceCategorySection({ onSelect }: { onSelect: (c: Category) => void }) {
  return (
    <section id="shop-by-price" className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32" data-testid="shop-by-price-section">
      <Reveal className="grid gap-6 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <Eyebrow>Shop by Price</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Find Your <em className="text-gold-deep">Perfect</em> Bouquet
          </h2>
        </div>
        <p className="text-base leading-relaxed text-ink/70 md:col-span-5 md:text-lg">
          Every feeling deserves flowers. Discover something beautiful for every occasion and every budget.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6 lg:gap-10">
        {cards.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.12}>
            <button
              onClick={() => onSelect(c.key)}
              className="group block w-full text-left"
              data-testid={`price-category-card-${c.key}`}
            >
              <div className="relative">
                <SmartImage
                  src={bouquetSrc(c.image)}
                  alt={`${c.title} — bouquets ${c.range}`}
                  className="aspect-[4/5] w-full"
                  imgClassName="transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                />
                <span className="absolute left-4 top-4 bg-ivory/90 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.2em] text-ink backdrop-blur">
                  {c.range}
                </span>
                <span className="absolute bottom-4 right-4 font-serif text-5xl italic text-ivory/90 drop-shadow">0{i + 1}</span>
              </div>
              <h3 className="mt-6 font-serif text-2xl text-ink lg:text-[1.9rem]">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{c.desc}</p>
              <span className="mt-5 inline-flex items-center gap-3 text-[12px] font-medium uppercase tracking-[0.2em] text-ink">
                <span className="relative">
                  {c.cta}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-50 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <ArrowRight className="h-4 w-4 text-gold-deep transition-transform duration-500 group-hover:translate-x-1.5" strokeWidth={1.4} />
              </span>
            </button>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
