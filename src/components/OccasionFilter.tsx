interface Props {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export function OccasionFilter({ options, value, onChange }: Props) {
  return (
    <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 sm:mx-0 sm:px-0" data-testid="occasion-filter">
      {['All occasions', ...options].map((o) => {
        const v = o === 'All occasions' ? '' : o;
        const active = value === v;
        return (
          <button
            key={o}
            onClick={() => onChange(v)}
            data-testid={`occasion-chip-${o.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
            className={`shrink-0 border px-3.5 py-1.5 text-[12px] tracking-wide transition-colors duration-300 ${
              active ? 'border-gold bg-gold text-ink' : 'border-ink/15 text-ink/75 hover:border-gold hover:text-ink'
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
