import { Camera, Mail, MessageCircle, Phone, Truck } from 'lucide-react';
import type { ReactNode } from 'react';
import { CONTACT, DELIVERY_TIME, INSTAGRAM_HANDLE, INSTAGRAM_URL } from '../config';
import { whatsappLink } from '../lib/utils';
import { Eyebrow, Reveal } from './Reveal';

interface Card {
  label: string;
  value: string;
  href: string;
  icon: ReactNode;
  tone: string;
  id: string;
  external?: boolean;
}

const cards: Card[] = [
  { id: 'phone', label: `Call ${CONTACT.name}`, value: CONTACT.phoneDisplay, href: `tel:${CONTACT.phoneTel}`, icon: <Phone />, tone: 'bg-blush/45 text-[#8E2C3E]' },
  { id: 'email', label: 'Email', value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: <Mail />, tone: 'bg-sage/30 text-[#3E4A3A]' },
  { id: 'whatsapp', label: 'WhatsApp', value: 'Chat with us', href: whatsappLink('Hi Bunch of Love!'), icon: <MessageCircle />, tone: 'bg-sage/30 text-[#3E4A3A]', external: true },
  { id: 'instagram', label: 'Instagram', value: `@${INSTAGRAM_HANDLE}`, href: INSTAGRAM_URL, icon: <Camera />, tone: 'bg-blush/45 text-[#B0475F]', external: true },
];

export function ContactSection() {
  return (
    <section id="contact" className="border-t border-gold/20 bg-ivory py-20 lg:py-24" data-testid="contact-section">
      <div className="mx-auto grid max-w-[1320px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-4">
          <Eyebrow>Get in Touch</Eyebrow>
          <h2 className="mt-5 font-serif text-4xl leading-tight text-ink sm:text-5xl">
            We’d love to <em className="text-gold-deep">hear</em> from you
          </h2>
          <p className="mt-5 flex items-center gap-3 text-[15px] text-ink/75" data-testid="contact-delivery-note">
            <Truck className="h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.4} />
            {DELIVERY_TIME} across Bengaluru.
          </p>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {cards.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <a
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                data-testid={`contact-card-${c.id}`}
                className="group flex items-center gap-5 rounded-[28px] border border-ink/10 bg-white/60 px-6 py-5 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_18px_40px_-28px_rgba(23,18,15,0.4)] sm:px-7 sm:py-6"
              >
                <span className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full [&_svg]:h-[22px] [&_svg]:w-[22px] [&_svg]:stroke-[1.5] ${c.tone}`}>
                  {c.icon}
                </span>
                <span className="min-w-0">
                  <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-ink/60">{c.label}</span>
                  <span className="mt-1 block break-all text-[17px] font-medium text-ink sm:text-lg">{c.value}</span>
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
