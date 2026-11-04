export type Category = 'Below1000' | '1000to2000' | 'Above2000';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  occasionTags: string[];
}

export const CATEGORIES: { key: Category; label: string; short: string }[] = [
  { key: 'Below1000', label: 'Below ₹1,000', short: 'Under ₹1,000' },
  { key: '1000to2000', label: '₹1,000 to ₹2,000', short: '₹1,000 – ₹2,000' },
  { key: 'Above2000', label: 'Above ₹2,000', short: 'Above ₹2,000' },
];

export const OCCASIONS: Record<Category, string[]> = {
  Below1000: ['Farewell', 'Graduation', 'Welcome Guests', 'Corporate'],
  '1000to2000': ['Birthday', 'Romantic', 'Congratulations', 'Thank You'],
  Above2000: ['Anniversary', 'Bride-to-be', 'Groom-to-be', 'Luxurious', "Unique Valentine's Day", 'Christmas'],
};

const slug = (s: string) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

const p = (name: string, price: number, category: Category, image: string, occasionTags: string[]): Product => ({
  id: slug(name),
  name,
  price,
  category,
  image,
  occasionTags,
});

// Filenames are the source of truth. Images live in public/images/bouquets/
export const PRODUCTS: Product[] = [
  // Below ₹1,000
  p('Sunshine Gerbera Posy', 899, 'Below1000', 'Sunshine Gerbera Posy-899-Below1000.jpg', ['Graduation', 'Farewell', 'Welcome Guests']),
  p('Magenta Mum Burst', 849, 'Below1000', 'Magenta Mum Burst-849-Below1000.jpg', ['Farewell', 'Graduation']),
  p('Pure White Alstroemeria Whisper', 799, 'Below1000', 'Pure White Alstroemeria Whisper-799-Below1000.jpg', ['Corporate', 'Welcome Guests']),
  p('Violet Aster Meadow', 750, 'Below1000', 'Violet Aster Meadow-999-Below1000.jpg', ['Farewell', 'Graduation']),
  p('Rosy Alstroemeria Cone', 849, 'Below1000', 'Rosy Alstroemeria Cone-849-Below1000.jpg', ['Farewell', 'Welcome Guests']),
  p('Peach Blush Gerbera Cloud', 999, 'Below1000', 'Peach Blush Gerbera Cloud-999-Below1000.jpg', ['Graduation', 'Farewell']),
  p('Petal Pink Alstroemeria Wrap', 899, 'Below1000', 'Petal Pink Alstroemeria Wrap-899-Below1000.jpg', ['Farewell', 'Welcome Guests']),
  p('Rose Speckle Alstroemeria', 949, 'Below1000', 'Rose Speckle Alstroemeria-949-Below1000.jpg', ['Welcome Guests', 'Farewell']),
  p('Candy Pink Gerbera Posy', 799, 'Below1000', 'Candy Pink Gerbera Posy-799-Below1000.jpg', ['Graduation', 'Welcome Guests']),
  p('Monochrome Daisy Mums', 899, 'Below1000', 'Monochrome Daisy Mums-899-Below1000.jpg', ['Corporate', 'Welcome Guests']),
  p('Snow Spider Chrysanthemum', 1000, 'Below1000', 'Snow Spider Chrysanthemum Bunch-599-Below1000.jpg', ['Corporate', 'Welcome Guests']),
  p('Ivory Cushion Mum Bunch', 1000, 'Below1000', 'Ivory Cushion Mum Bunch-549-Below1000.jpg', ['Corporate', 'Welcome Guests']),
  p('Swan in Love', 750, 'Below1000', 'Pure Ivory Rose Stems-599-Below1000.jpg', ['Corporate', 'Farewell']),
  p('Harvest Sunflower & Rose Bouquet', 800, 'Below1000', 'Harvest Sunflower & Rose Bouquet-1699-1000to2000.jpg', ['Birthday', 'Congratulations']),
  p('Fuchsia Halo Roses', 850, 'Below1000', 'Fuchsia Halo Roses-2499-Above2000.jpg', ["Unique Valentine's Day", 'Christmas']),

  // ₹1,000 to ₹2,000
  p('Memory Lane Carnation Photo Bouquet', 1199, '1000to2000', 'Memory Lane Carnation Photo Bouquet-1199-1000to2000.jpg', ['Birthday', 'Romantic']),
  p('Lavender Cloud Hydrangea', 1299, '1000to2000', 'Lavender Cloud Hydrangea-1299-1000to2000.jpg', ['Thank You', 'Congratulations']),
  p('Crimson Passion Mixed Bouquet', 1499, '1000to2000', 'Crimson Passion Mixed Bouquet-1499-1000to2000.jpg', ['Romantic', 'Birthday']),
  p('Golden Hour Sunflowers', 1199, '1000to2000', 'Golden Hour Sunflowers-1199-1000to2000.jpg', ['Congratulations', 'Birthday']),
  p('Blush Alstroemeria Garden', 1299, '1000to2000', 'Blush Alstroemeria Garden-1299-1000to2000.jpg', ['Thank You', 'Birthday']),
  p('Blushing Calla Elegance', 1699, '1000to2000', 'Blushing Calla Elegance-1699-1000to2000.jpg', ['Congratulations', 'Romantic']),
  p('Stargazer Blush Lily Bouquet', 1499, '1000to2000', 'Stargazer Blush Lily Bouquet-1499-1000to2000.jpg', ['Birthday', 'Congratulations']),
  p('Lavender Mist White Roses', 1199, '1000to2000', 'Lavender Mist White Roses-1199-1000to2000.jpg', ['Romantic', 'Thank You']),
  p('Violet Statice Dream', 1099, '1000to2000', 'Violet Statice Dream-1099-1000to2000.jpg', ['Thank You', 'Birthday']),
  p('Rustic Sunflower Gypsophila Charm', 1399, '1000to2000', 'Rustic Sunflower Gypsophila Charm-1399-1000to2000.jpg', ['Congratulations', 'Thank You']),
  p('Emerald Sunburst Sunflower Mix', 1299, '1000to2000', 'Emerald Sunburst Sunflower Mix-1299-1000to2000.jpg', ['Congratulations', 'Birthday']),
  p('Lilac Mum & Ivory Rose Posy', 1399, '1000to2000', 'Lilac Mum & Ivory Rose Posy-1399-1000to2000.jpg', ['Thank You', 'Romantic']),
  p('Butter Yellow Alstroemeria Cascade', 1799, '1000to2000', 'Butter Yellow Alstroemeria Cascade-1799-1000to2000.jpg', ['Congratulations', 'Birthday']),
  p('Garden Rose Mum Basket', 1599, '1000to2000', 'Garden Rose Mum Basket-1599-1000to2000.jpg', ['Thank You', 'Congratulations']),
  p('Amethyst Mum Gypsophila Bouquet', 1199, '1000to2000', 'Amethyst Mum Gypsophila Bouquet-1199-1000to2000.jpg', ['Birthday', 'Thank You']),
  p('Rose & Carnation Verse Basket', 1899, '1000to2000', 'Rose & Carnation Verse Basket-1899-1000to2000.jpg', ['Romantic', 'Birthday']),
  p('Lavender Dusk Rose Basket', 1799, '1000to2000', 'Lavender Dusk Rose Basket-1799-1000to2000.jpg', ['Romantic', 'Thank You']),
  p('Love You Chocolate Surprise Bouquet', 1199, '1000to2000', 'Love You Chocolate Surprise Bouquet-1199-1000to2000.jpg', ['Romantic', 'Birthday']),
  p('Cloud Pompon Chrysanthemums', 1399, '1000to2000', 'Cloud Pompon Chrysanthemums-1399-1000to2000.jpg', ['Thank You', 'Congratulations']),
  p('Periwinkle Hydrangea Haze', 1599, '1000to2000', 'Periwinkle Hydrangea Haze-1599-1000to2000.jpg', ['Thank You', 'Congratulations']),
  p('Scarlet Snow Rose Grandeur', 1500, '1000to2000', 'Scarlet Snow Rose Grandeur-1500-1000to2000.jpg', ['Romantic', 'Birthday', 'Congratulations']),

  // Above ₹2,000
  p('Lotus Calligraphy Dream', 2499, 'Above2000', 'Lotus Calligraphy Dream-2499-Above2000.jpg', ["Unique Valentine's Day", 'Anniversary']),
  p('Midnight Orchid Galaxy', 3299, 'Above2000', 'Midnight Orchid Galaxy-3299-Above2000.jpg', ['Groom-to-be', 'Luxurious', "Unique Valentine's Day"]),
  p('Burgundy Bloom Cascade', 2999, 'Above2000', 'Burgundy Bloom Cascade-2999-Above2000.jpg', ['Anniversary', 'Christmas', 'Luxurious']),
  p('Noir Snow Tulips', 2199, 'Above2000', 'Noir Snow Tulips-2199-Above2000.jpg', ['Groom-to-be', 'Christmas']),
  p('Royal Blue Orchid Basket', 2899, 'Above2000', 'Royal Blue Orchid Basket-2899-Above2000.jpg', ['Groom-to-be', 'Luxurious']),
  p('Champagne Grandeur 100 Roses', 6999, 'Above2000', 'Champagne Grandeur 100 Roses-6999-Above2000.jpg', ['Luxurious', 'Anniversary', 'Bride-to-be']),
  p('Sunny Cloud Rose Sunflower', 2499, 'Above2000', 'Sunny Cloud Rose Sunflower-2499-Above2000.jpg', ['Bride-to-be', 'Anniversary']),
  p('Cloud Nine Hydrangea Basket', 5499, 'Above2000', 'Cloud Nine Hydrangea Basket-5499-Above2000.jpg', ['Bride-to-be', 'Luxurious']),
  p('Velvet Rose & Tulip Duet', 2199, 'Above2000', 'Velvet Rose & Tulip Duet-2199-Above2000.jpg', ["Unique Valentine's Day", 'Anniversary']),
  p('Ruby Romance Rose Cloud', 3999, 'Above2000', 'Ruby Romance Rose Cloud-3999-Above2000.jpg', ["Unique Valentine's Day", 'Anniversary', 'Luxurious']),
  p('Hot Pink Sweetheart Roses', 2299, 'Above2000', 'Hot Pink Sweetheart Roses-2299-Above2000.jpg', ["Unique Valentine's Day", 'Bride-to-be']),
  p('Sorbet Rose Medley', 3299, 'Above2000', 'Sorbet Rose Medley-3299-Above2000.jpg', ['Bride-to-be', 'Anniversary']),
  p('Royal Red Rose Tulip Grandeur', 7499, 'Above2000', 'Royal Red Rose Tulip Grandeur-7499-Above2000.jpg', ['Luxurious', "Unique Valentine's Day", 'Christmas']),
  p('Pearl Pink Rose Reverie', 2799, 'Above2000', 'Pearl Pink Rose Reverie-2799-Above2000.jpg', ['Bride-to-be', 'Anniversary']),
  p('Rose Petal & Lily Reverie', 4499, 'Above2000', 'Rose Petal & Lily Reverie-4499-Above2000.jpg', ['Anniversary', 'Luxurious', 'Bride-to-be']),
  p('Berry Oriental Lily Grandeur', 2999, 'Above2000', 'Berry Oriental Lily Grandeur-2999-Above2000.jpg', ['Anniversary', 'Luxurious', 'Bride-to-be']),
];

export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(PRODUCTS.map((x) => [x.id, x]));
