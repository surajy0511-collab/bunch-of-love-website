import { WHATSAPP_NUMBER } from '../config';

export const inr = (n: number) => `₹${new Intl.NumberFormat('en-IN').format(n)}`;

export const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

export const bouquetSrc = (file: string) => asset(`images/bouquets/${encodeURIComponent(file)}`);

export const LOGO_SRC = asset('images/brand/Bunch_of_Love_Logo.png');

export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

export const openWhatsApp = (text: string) => {
  window.open(whatsappLink(text), '_blank', 'noopener,noreferrer');
};

export const MESSAGES = {
  custom:
    "Hi Bunch of Love! I'd love to create a custom bouquet. I have an idea in mind and would like to discuss the flowers, design, and pricing.",
  bulk: [
    "Hi Bunch of Love! I'd like to enquire about a bulk flower booking.",
    '',
    'Event type: ',
    'Required flower arrangements: ',
    'Quantity: ',
    'Preferred date: ',
    'Additional requirements: ',
    '',
    'Thank you!',
  ].join('\n'),
};
