import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';
import { asset } from '../lib/utils';
import { scrollToId } from '../lib/scroll';

const ease = [0.22, 1, 0.36, 1] as const;

const lines = [
  <>Flowers That</>,
  <>Speak What</>,
  <><em className="text-gold-light">Words</em> Cannot.</>,
];

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.06, reduce ? 1.06 : 1.16]);

  return (
    <section ref={ref} data-testid="hero-section" className="relative flex min-h-[100svh] items-end overflow-hidden bg-[#141a14] md:items-center">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { clipPath: 'inset(0 0 0 100%)' }}
        animate={{ clipPath: 'inset(0 0 0 0%)' }}
        transition={{ duration: 1.6, ease }}
      >
        <motion.div style={{ y, scale }} className="absolute inset-0">
          <img
            src={asset('images/hero/hero-bouquet.jpg')}
            alt="A luxurious hand-tied bouquet of blush garden roses, peonies and ranunculus wrapped in champagne silk"
            fetchPriority="high"
            className="h-full w-full object-cover object-[72%_center]"
          />
        </motion.div>
        {/* translucent left fading into a clear right */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f140f]/90 via-[#0f140f]/55 to-transparent max-md:hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f140f]/95 via-[#0f140f]/60 to-[#0f140f]/10 md:hidden" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#0f140f]/40 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto w-full max-w-[1320px] px-5 pb-10 pt-28 sm:px-8 md:pb-0 lg:px-12">
        <div className="max-w-[760px]">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease }}
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.32em] text-ivory/85 sm:text-xs"
          >
            The Art of Floral Gifting
          </motion.p>
          <h1 className="font-serif text-[3.1rem] font-normal leading-[0.95] tracking-[-0.02em] text-white sm:text-7xl lg:text-[6.4rem]">
            {lines.map((l, i) => (
              <span key={i} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1.1, delay: 0.85 + i * 0.13, ease }}
                >
                  {l}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.4, ease }}
          >
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-ivory/90 sm:text-lg">
              Thoughtfully handcrafted bouquets, created to turn your most beautiful moments into unforgettable memories.
            </p>
          <p className="mt-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-gold-light sm:text-xs">
              Handcrafted in Bengaluru <span className="text-gold">·</span> Delivered in 24–48 hours
            </p>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-10">
              <button onClick={() => scrollToId('collections')} className="btn-gold group gap-3" data-testid="hero-explore-collection-btn">
                Explore Our Collection
                <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => scrollToId('custom')}
                className="group inline-flex items-center gap-2 self-start text-[12px] font-medium uppercase tracking-[0.2em] text-white sm:self-auto"
                data-testid="hero-custom-bouquet-btn"
              >
                <span className="relative">
                  Create a Custom Bouquet
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-gold-light transition-transform duration-500 group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <button
        onClick={() => scrollToId('shop-by-price')}
        aria-label="Scroll down"
        data-testid="hero-scroll-cue"
        className="absolute bottom-8 right-8 z-10 hidden h-20 w-20 items-center justify-center rounded-full border border-ivory/60 text-ivory transition-colors hover:bg-ivory hover:text-ink md:flex"
      >
        <ArrowDown className="h-5 w-5" strokeWidth={1.2} />
      </button>
    </section>
  );
}
