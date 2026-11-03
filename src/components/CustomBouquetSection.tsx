import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { bouquetSrc, MESSAGES, openWhatsApp } from '../lib/utils';
import { Eyebrow, Reveal } from './Reveal';
import { SmartImage } from './SmartImage';

export function CustomBouquetSection() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section ref={ref} id="custom" className="relative overflow-hidden bg-ink py-24 text-ivory lg:py-32" data-testid="custom-bouquet-section">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 sm:px-8 md:grid-cols-12">
        <Reveal className="md:col-span-6 lg:col-span-5">
          <Eyebrow light>Custom Bouquets</Eyebrow>
          <h2 className="mt-6 font-serif text-5xl leading-[1] sm:text-6xl lg:text-7xl">
            Dream It.
            <br />
            <em className="text-gold-light">We’ll Bloom It.</em>
          </h2>
          <p className="mt-8 text-base leading-relaxed text-ivory/85 sm:text-lg">
            Have something special in mind? Whether it’s a bouquet inspired by your favourite colours, a meaningful arrangement, or a
            one-of-a-kind floral surprise, we’d love to bring your vision to life.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-ivory/70">
            Every idea is special to us. Share your inspiration with Bunch of Love, and let us create something beautiful just for you.
          </p>
          <button onClick={() => openWhatsApp(MESSAGES.custom)} className="btn-gold mt-10" data-testid="custom-bouquet-whatsapp-btn">
            Create Your Custom Bouquet
          </button>
        </Reveal>

        <div className="relative md:col-span-6 lg:col-span-6 lg:col-start-7">
          <div className="relative mx-auto w-full max-w-[460px]">
            <div className="absolute -inset-3 rounded-t-full border border-gold/40 sm:-inset-5" aria-hidden="true" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-t-full">
              <motion.div style={{ y }} className="absolute -inset-y-[8%] inset-x-0">
                <SmartImage
                  src={bouquetSrc('Rose Petal & Lily Reverie-4499-Above2000.jpg')}
                  alt="A custom floral arrangement by Bunch of Love"
                  className="h-full w-full !bg-[#2a221d]"
                />
              </motion.div>
            </div>
            <p className="mt-6 text-center font-serif text-lg italic text-ivory/70">Your colours. Your story. Our hands.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
