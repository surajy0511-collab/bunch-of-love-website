import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BulkBookingSection } from '../components/BulkBookingSection';
import { CustomBouquetSection } from '../components/CustomBouquetSection';
import { HeroSection } from '../components/HeroSection';
import { Marquee } from '../components/Marquee';
import { NewLaunchesSection } from '../components/NewLaunchesSection';
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
    const targetId = target ?? (location.pathname === '/new-launches' ? 'new-launches' : null);
    if (!targetId) return;
    const t = setTimeout(() => scrollToId(targetId), 250);
    return () => clearTimeout(t);
  }, [location.state, location.pathname]);

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
      <NewLaunchesSection />
      <ProductGrid category={category} setCategory={setCategory} />
      <CustomBouquetSection />
      <TestimonialsSection />
      <BulkBookingSection />
    </>
  );
}
