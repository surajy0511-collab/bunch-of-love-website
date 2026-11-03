import { motion, useReducedMotion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CATEGORIES, OCCASIONS, PRODUCTS, type Category } from '../data/products';
import { OccasionFilter } from './OccasionFilter';
import { ProductCard } from './ProductCard';
import { Eyebrow, Reveal } from './Reveal';

type Sort = 'featured' | 'low' | 'high';

interface Props {
  category: Category | 'All';
  setCategory: (c: Category | 'All') => void;
}

export function ProductGrid({ category, setCategory }: Props) {
  const [query, setQuery] = useState('');
  const [occasion, setOccasion] = useState('');
  const [sort, setSort] = useState<Sort>('featured');
  const reduce = useReducedMotion();

  const occasionOptions = category === 'All' ? [...new Set(Object.values(OCCASIONS).flat())] : OCCASIONS[category];

  const groups = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => category === 'All' || c.key === category)
      .map((c) => {
        const items = PRODUCTS.filter(
          (p) => p.category === c.key && (!q || p.name.toLowerCase().includes(q)) && (!occasion || p.occasionTags.includes(occasion)),
        );
        if (sort !== 'featured') items.sort((a, b) => (sort === 'low' ? a.price - b.price : b.price - a.price));
        return { ...c, items };
      })
      .filter((g) => g.items.length);
  }, [category, query, occasion, sort]);

  const total = groups.reduce((s, g) => s + g.items.length, 0);
  const tabs: { key: Category | 'All'; label: string }[] = [{ key: 'All', label: 'All Bouquets' }, ...CATEGORIES.map((c) => ({ key: c.key, label: c.label }))];

  return (
    <section id="collections" className="bg-white/50 pb-20 pt-16 lg:pb-28 lg:pt-20" data-testid="collections-section">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>The Collection</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-none text-ink sm:text-5xl">Our Bouquets</h2>
          </div>
          <p className="text-sm text-ink/70" data-testid="catalogue-count">
            Showing {total} of {PRODUCTS.length} handcrafted bouquets
          </p>
        </Reveal>

        <div className="sticky top-[72px] z-20 -mx-5 mt-8 border-y border-gold/20 bg-ivory/95 px-5 py-3 backdrop-blur-md sm:mx-0 sm:px-4 lg:top-20">
          <div className="no-scrollbar -mx-5 flex gap-6 overflow-x-auto px-5 sm:mx-0 sm:px-0" role="tablist">
            {tabs.map((t) => (
              <button
                key={t.key}
                role="tab"
                aria-selected={category === t.key}
                onClick={() => {
                  setCategory(t.key);
                  setOccasion('');
                }}
                data-testid={`category-tab-${t.key}`}
                className={`relative shrink-0 py-1.5 text-[12px] uppercase tracking-[0.18em] transition-colors ${
                  category === t.key ? 'text-ink' : 'text-ink/55 hover:text-ink'
                }`}
              >
                {t.label}
                {category === t.key && <motion.span layoutId="tab-line" className="absolute inset-x-0 -bottom-0.5 h-px bg-gold" />}
              </button>
            ))}
          </div>
          <div className="mt-2.5 flex gap-2">
            <label className="flex flex-1 items-center gap-2 border border-ink/15 bg-white px-3 focus-within:border-gold">
              <Search className="h-4 w-4 shrink-0 text-ink/50" strokeWidth={1.5} />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search bouquets"
                aria-label="Search bouquets by name"
                data-testid="catalogue-search-input"
                className="h-9 w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink/45"
              />
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              aria-label="Sort by price"
              data-testid="catalogue-sort-select"
              className="h-[38px] border border-ink/15 bg-white px-2 text-[13px] text-ink outline-none focus:border-gold"
            >
              <option value="featured">Featured</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <OccasionFilter options={occasionOptions} value={occasion} onChange={setOccasion} />
        </div>

        {total === 0 && (
          <p className="py-20 text-center font-serif text-2xl text-ink/70" data-testid="catalogue-empty">
            No bouquets match your search — try another name or occasion.
          </p>
        )}

        {groups.map((g) => (
          <div key={g.key} className="mt-10 first-of-type:mt-6" data-testid={`catalogue-group-${g.key}`}>
            {category === 'All' && (
              <div className="mb-5 flex items-baseline gap-4">
                <h3 className="font-serif text-2xl italic text-ink sm:text-3xl">{g.label}</h3>
                <span className="h-px flex-1 bg-gold/30" />
                <span className="text-xs uppercase tracking-[0.2em] text-ink/60">{g.items.length} bouquets</span>
              </div>
            )}
            <div className="grid grid-cols-2 gap-x-3 gap-y-7 md:grid-cols-3 md:gap-x-5 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-9">
              {g.items.map((p, i) => (
                <motion.div
                  key={`${p.id}-${category}-${occasion}`}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: Math.min(i, 8) * 0.04, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
