import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { Eyebrow, Reveal } from './Reveal';

const launchIds = [
  'bloom-and-brew',
  'petals-and-brownies',
];

export function NewLaunchesSection() {
  const [copied, setCopied] = useState(false);
  const launches = launchIds
    .map((id) => PRODUCTS.find((product) => product.id === id))
    .filter((product) => product !== undefined);

  const shareSection = async () => {
    const url = `${window.location.origin}${window.location.pathname}#/new-launches`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const input = document.createElement('textarea');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      input.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="new-launches" className="bg-ink py-20 text-ivory lg:py-28" data-testid="new-launches-section">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8">
        <Reveal className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow light>Fresh from the Studio</Eyebrow>
            <h2 className="mt-4 font-serif text-4xl leading-none sm:text-5xl">New Launches</h2>
          </div>
          <button
            onClick={shareSection}
            className="inline-flex items-center gap-3 self-start text-[12px] font-medium uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-ivory md:self-auto"
          >
            {copied ? 'Link copied' : 'Share'}
            {copied ? <Check className="h-4 w-4" strokeWidth={1.4} /> : <Share2 className="h-4 w-4" strokeWidth={1.4} />}
          </button>
        </Reveal>

        <div className="mx-auto mt-10 grid max-w-[620px] grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
          {launches.map((product) => (
            <div
              key={product.id}
              className="[&_[data-testid^='product-name']]:text-ivory [&_[data-testid^='product-price']]:text-ivory [&_button[data-testid^='add-to-cart']]:border-gold-light [&_button[data-testid^='add-to-cart']]:text-ivory"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
