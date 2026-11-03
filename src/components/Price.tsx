export function Price({ value }: { value: number }) {
  return (
    <span className="whitespace-nowrap">
      <span className="mr-[0.08em] font-sans text-[0.78em] font-normal">₹</span>
      {new Intl.NumberFormat('en-IN').format(value)}
    </span>
  );
}
