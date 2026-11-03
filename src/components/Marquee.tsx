const words = ['Handcrafted in Bengaluru', 'Delivered within 24–48 hours', 'Flowers for every feeling', 'Custom creations', 'Bulk bookings for every occasion', 'Made with love'];

export function Marquee() {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden="true">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-8 font-serif text-3xl italic text-ink/80 sm:text-5xl">{w}</span>
          <span className="text-lg text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="overflow-hidden border-y border-gold/25 bg-ivory py-6 sm:py-8" data-testid="editorial-marquee">
      <span className="sr-only">{words.join(', ')}</span>
      <div className="marquee-track flex w-max">
        {row}
        {row}
      </div>
    </div>
  );
}
