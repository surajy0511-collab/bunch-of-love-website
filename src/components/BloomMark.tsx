export function BloomMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.2" className={className} aria-hidden="true">
      <path d="M24 26c-4-6-10-7-12-3s3 9 12 9c9 0 14-5 12-9s-8-3-12 3Z" />
      <path d="M24 26c-3-7-2-14 0-16 2 2 3 9 0 16Z" />
      <path d="M24 32v10M24 38c-3-2-6-2-8-1M24 40c3-2 6-2 8-1" />
    </svg>
  );
}
