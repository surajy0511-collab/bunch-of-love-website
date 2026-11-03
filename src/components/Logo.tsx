import { useState } from 'react';
import { LOGO_SRC } from '../lib/utils';
import { BloomMark } from './BloomMark';

// Uses the official logo file; shows a text wordmark only if the file is missing.
export function Logo({ className = 'h-10' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <span className="flex items-center gap-2 text-ink">
        <BloomMark className="h-7 w-7 text-gold" />
        <span className="font-serif text-xl leading-none tracking-wide sm:text-2xl">
          Bunch <em className="text-gold">of</em> Love
        </span>
      </span>
    );
  return <img src={LOGO_SRC} alt="Bunch of Love" className={`w-auto object-contain ${className}`} onError={() => setFailed(true)} />;
}
