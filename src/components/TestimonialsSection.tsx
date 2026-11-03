import { Quote } from 'lucide-react';
import { Eyebrow, Reveal } from './Reveal';

// PLACEHOLDERS ONLY — replace with real customer words when available.
const placeholders = [1, 2, 3];

export function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-[1320px] px-5 py-24 sm:px-8 lg:py-32" data-testid="testimonials-section">
      <Reveal className="text-center">
        <div className="flex justify-center">
          <Eyebrow>Kind Words</Eyebrow>
        </div>
        <h2 className="mt-6 font-serif text-4xl text-ink sm:text-5xl lg:text-6xl">
          Love, <em className="text-gold-deep">Wrapped</em> in Flowers
        </h2>
      </Reveal>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {placeholders.map((n, i) => (
          <Reveal key={n} delay={i * 0.1}>
            <figure className="relative h-full border border-dashed border-gold/50 bg-white/60 p-8" data-testid={`testimonial-placeholder-${n}`}>
              <span className="absolute right-4 top-4 bg-sage/25 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-ink/70">
                Placeholder
              </span>
              <Quote className="h-7 w-7 text-gold" strokeWidth={1.2} />
              <blockquote className="mt-5 font-serif text-xl italic leading-snug text-ink/60">
                Your customer’s testimonial will appear here once it has been shared with Bunch of Love.
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-ink/50">— Customer name · Occasion</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
      <p className="mt-8 text-center text-xs text-ink/55">These are placeholder cards, not real customer reviews.</p>
    </section>
  );
}
