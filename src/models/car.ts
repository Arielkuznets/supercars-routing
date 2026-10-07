export type BrandSlug = 'ferrari' | 'lamborghini' | 'porsche' | 'mclaren' | 'bugatti';

export interface Brand {
  slug: BrandSlug;
  name: string;
  country: string;
  color: string;
}

// קרדיט לצלם, כנדרש ברישיונות Creative Commons של התמונות
export interface PhotoCredit {
  author: string;
  license: string;
  source: string;
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
  photo: PhotoCredit;
}

export type SortKey = 'hp' | 'topSpeed' | 'zeroToHundred' | 'price';
