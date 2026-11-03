import { motion, useReducedMotion } from 'framer-motion';
import { useEffect } from 'react';
import { BulkBookingSection } from '../components/BulkBookingSection';
import { Eyebrow, Reveal } from '../components/Reveal';
import { SmartImage } from '../components/SmartImage';
import { useSectionNav } from '../lib/scroll';
import { asset } from '../lib/utils';

const pillars = [
  {
    title: 'Floral Craftsmanship',
    text: 'Every bouquet is arranged by hand — each stem chosen, placed and wrapped with care, so that what arrives feels personal rather than produced.',
  },
  {
    title: 'Premium, Yet Affordable',
    text: 'We believe beautiful flowers should not be out of reach. Our bouquets are designed to feel premium and thoughtful, at prices that make gifting a joy.',
  },
  {
    title: 'Tradition Meets Modern Gifting',
    text: 'Rooted in a family-run floral business, Bunch of Love pairs the warmth of tradition with a fresh, modern approach to how we give flowers.',
  },
];

export default function About() {
  const reduce = useReducedMotion();
  const goSection = useSectionNav();

  useEffect(() => {
    document.title = 'About Us | Bunch of Love — Rooted in Flowers, Made with Love';
  }, []);

  return (
    <>
      <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-32 sm:px-8 lg:pb-24 lg:pt-44" data-testid="about-hero">
        <Eyebrow>Our Story</Eyebrow>
        <h1 className="mt-8 font-serif text-5xl leading-[0.98] tracking-tight text-ink sm:text-7xl lg:text-[7.5rem]">
          {['Rooted in Flowers.', 'Made with Love.'].map((l, i) => (
            <span key={l} className="block overflow-hidden pb-2">
              <motion.span
                className={`block ${i === 1 ? 'italic text-gold-deep lg:pl-[12%]' : ''}`}
                initial={reduce ? false : { y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              >
                {l}
              </motion.span>
            </span>
          ))}
        </h1>
      </section>

      <section className="mx-auto grid max-w-[1320px] items-start gap-12 px-5 pb-24 sm:px-8 md:grid-cols-12 lg:pb-32" data-testid="founder-section">
        <Reveal className="md:col-span-5">
          <SmartImage
            src={asset('images/founder/anjali-founder.jpg')}
            alt="Anjali, founder of Bunch of Love"
            className="aspect-[4/5] w-full rounded-t-full"
          />
          <p className="mt-4 text-xs uppercase tracking-[0.22em] text-ink/60">Anjali — Founder, Bunch of Love</p>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-6 md:col-start-7 md:pt-16">
          <Eyebrow>Meet the Founder</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-5xl">Anjali</h2>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-ink/80 sm:text-[17px]">
            <p>
              Anjali is a 21-year-old entrepreneur from Bengaluru, with a deep connection to flowers that began in her family’s flower
              business.
            </p>
            <p>
              Growing up surrounded by blooms, she came to appreciate not just their beauty, but the emotion and meaning carried in every
              stem.
            </p>
            <p>
              With Bunch of Love, she brings together her passion for floral gifting and her entrepreneurial vision — creating premium
              bouquets that are beautiful, thoughtful and affordable.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-[1320px] px-5 pb-24 pt-4 sm:px-8 lg:pb-32" data-testid="philosophy-section">
        <Reveal>
          <Eyebrow>Our Philosophy</Eyebrow>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <div className="border-t border-gold/50 pt-6">
                <span className="font-serif text-lg italic text-gold-deep">0{i + 1}</span>
                <h3 className="mt-3 font-serif text-3xl text-ink">{p.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/75">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <BulkBookingSection />

      <section className="mx-auto max-w-[1000px] px-5 py-24 text-center sm:px-8 lg:py-36" data-testid="about-closing">
        <Reveal>
          <p className="font-serif text-3xl italic leading-snug text-ink sm:text-5xl">
            “At Bunch of Love, we believe flowers are more than gifts. They are emotions, memories, and moments beautifully expressed.”
          </p>
          <button onClick={() => goSection('collections')} className="btn-primary mt-12" data-testid="about-explore-collections-btn">
            Explore Our Collections
          </button>
        </Reveal>
      </section>
    </>
  );
}
