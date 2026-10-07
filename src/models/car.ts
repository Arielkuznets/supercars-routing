export type BrandSlug = 'ferrari' | 'lamborghini' | 'porsche' | 'mclaren' | 'bugatti';

export interface Brand {
  slug: BrandSlug;
  name: string;
  country: string;
  color: string;
}

export interface Car {
  id: string;
  brand: BrandSlug;
  model: string;
  year: number;
  engine: string;
  hp: number;
  topSpeed: number; // קמ"ש
  zeroToHundred: number; // שניות
  price: number; // דולר
  color: string;
  description: string;
}

export type SortKey = 'hp' | 'topSpeed' | 'zeroToHundred' | 'price';
