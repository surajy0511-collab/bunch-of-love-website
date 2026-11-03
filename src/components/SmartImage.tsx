import { useState, type ReactNode } from 'react';
import { BloomMark } from './BloomMark';

interface Props {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  fallback?: ReactNode;
}

// Shows an elegant empty frame until the real image exists at `src`.
export function SmartImage({ src, alt, className = '', imgClassName = '', eager, fallback }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-beige ${className}`}>
      {!loaded &&
        (fallback ?? (
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="absolute inset-2.5 border border-gold/30" />
            <BloomMark className="h-8 w-8 text-gold/50" />
          </div>
        ))}
      {!failed && (
        <img
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
        />
      )}
    </div>
  );
}
