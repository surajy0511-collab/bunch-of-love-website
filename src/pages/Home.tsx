import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BulkBookingSection } from '../components/BulkBookingSection';
import { CustomBouquetSection } from '../components/CustomBouquetSection';
import { HeroSection } from '../components/HeroSection';
import { Marquee } from '../components/Marquee';
import { PriceCategorySection } from '../components/PriceCategorySection';
import { ProductGrid } from '../components/ProductGrid';
import { TestimonialsSection } from '../components/TestimonialsSection';
import type { Category } from '../data/products';
import { scrollToId } from '../lib/scroll';

export default function Home() {
  const [category, setCategory] = useState<Category | 'All'>('All');
  const location = useLocation();

  useEffect(() => {
    document.title = 'Bunch of Love | Premium Handcrafted Bouquets in Bengaluru';
  }, []);

  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (!target) return;
    const t = setTimeout(() => scrollToId(target), 150);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <>
      <HeroSection />
      <Marquee />
      <PriceCategorySection
        onSelect={(c) => {
          setCategory(c);
          scrollToId('collections');
        }}
      />
      <ProductGrid category={category} setCategory={setCategory} />
      <CustomBouquetSection />
      <TestimonialsSection />
      <BulkBookingSection />
    </>
  );
}
