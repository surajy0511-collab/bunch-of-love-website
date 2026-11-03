import { Check, Maximize2, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import type { Product } from '../data/products';
import { bouquetSrc } from '../lib/utils';
import { Price } from './Price';
import { SmartImage } from './SmartImage';

export function ProductCard({ product }: { product: Product }) {
  const { add, setQuickView } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return;
    const t = setTimeout(() => setAdded(false), 1400);
    return () => clearTimeout(t);
  }, [added]);

  return (
    <article className="group flex flex-col" data-testid={`product-card-${product.id}`}>
      <button
        onClick={() => setQuickView(product)}
        aria-label={`View ${product.name} up close`}
        data-testid={`quick-view-open-${product.id}`}
        className="relative block w-full overflow-hidden text-left transition-shadow duration-500 group-hover:shadow-[0_24px_50px_-28px_rgba(23,18,15,0.45)]"
      >
        <SmartImage
          src={bouquetSrc(product.image)}
          alt={`${product.name} bouquet by Bunch of Love`}
          className="aspect-[4/5] w-full"
          imgClassName="transition-transform duration-[1.1s] ease-out group-hover:scale-[1.06]"
        />
        <span className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center bg-ivory/90 text-ink transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" strokeWidth={1.5} />
        </span>
      </button>
      <div className="flex flex-1 flex-col pt-3">
        <h3 className="line-clamp-2 min-h-[2.5em] font-serif text-[15px] leading-tight text-ink sm:text-lg" data-testid={`product-name-${product.id}`}>
          {product.name}
        </h3>
        <p className="mt-1 font-serif text-base font-medium text-ink sm:text-[17px]" data-testid={`product-price-${product.id}`}>
          <Price value={product.price} />
        </p>
        <button
          onClick={() => {
            add(product.id);
            setAdded(true);
          }}
          data-testid={`add-to-cart-${product.id}`}
          className={`mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 border text-[10.5px] font-medium uppercase tracking-[0.18em] transition-colors duration-300 sm:h-10 sm:text-[11px] ${
            added ? 'border-ink bg-ink text-ivory' : 'border-ink/80 text-ink hover:bg-ink hover:text-ivory'
          }`}
        >
          {added ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
          {added ? 'Added' : 'Add to Cart'}
        </button>
      </div>
    </article>
  );
}
