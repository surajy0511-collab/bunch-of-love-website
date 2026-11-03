import { ArrowUpRight } from 'lucide-react';
import { MESSAGES, openWhatsApp } from '../lib/utils';
import { Eyebrow, Reveal } from './Reveal';

const events = ['Weddings', 'Corporate events & gifting', 'Celebrations', 'Special gatherings'];

export function BulkBookingSection() {
  return (
    <section id="bulk" className="bg-beige py-24 lg:py-32" data-testid="bulk-booking-section">
      <div className="mx-auto grid max-w-[1320px] gap-14 px-5 sm:px-8 md:grid-cols-12">
        <Reveal className="md:col-span-6">
          <Eyebrow>Bulk Bookings</Eyebrow>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Flowers for Every <em className="text-gold-deep">Grand</em> Occasion
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink/75 sm:text-lg">
            Planning a wedding, corporate event, celebration, or special gathering? Bunch of Love offers bulk flower bookings for your
            floral requirements.
          </p>
          <button onClick={() => openWhatsApp(MESSAGES.bulk)} className="btn-primary mt-10" data-testid="bulk-booking-whatsapp-btn">
            Enquire for Bulk Bookings
          </button>
        </Reveal>
        <Reveal delay={0.15} className="md:col-span-5 md:col-start-8">
          <ul className="border-t border-ink/15">
            {events.map((e, i) => (
              <li key={e} className="group flex items-center justify-between border-b border-ink/15 py-6">
                <span className="flex items-baseline gap-5">
                  <span className="text-xs text-gold-deep">0{i + 1}</span>
                  <span className="font-serif text-2xl text-ink transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">{e}</span>
                </span>
                <ArrowUpRight className="h-5 w-5 text-ink/40 transition-colors group-hover:text-gold-deep" strokeWidth={1.3} />
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-ink/65">Share your event details on WhatsApp and we’ll get back to you with options and a quote.</p>
        </Reveal>
      </div>
    </section>
  );
}
