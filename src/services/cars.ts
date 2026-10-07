import { Injectable, computed, signal } from '@angular/core';
import { Brand, Car, SortKey } from '../models/car';

const BRANDS: Brand[] = [
  { slug: 'ferrari', name: 'פרארי', country: 'איטליה', color: '#dc2626' },
  { slug: 'lamborghini', name: 'למבורגיני', country: 'איטליה', color: '#eab308' },
  { slug: 'porsche', name: 'פורשה', country: 'גרמניה', color: '#cbd5e1' },
  { slug: 'mclaren', name: 'מקלארן', country: 'בריטניה', color: '#f97316' },
  { slug: 'bugatti', name: 'בוגאטי', country: 'צרפת', color: '#3b82f6' },
];

const CARS: Car[] = [
  {
    id: 'sf90-stradale',
    brand: 'ferrari',
    model: 'SF90 Stradale',
    year: 2020,
    engine: 'V8 טווין-טורבו 4.0L + 3 מנועים חשמליים',
    hp: 986,
    topSpeed: 340,
    zeroToHundred: 2.5,
    price: 525000,
    color: '#dc2626',
    description: 'הפרארי ההיברידית הראשונה לייצור סדרתי, עם הנעה כפולה ו-25 ק"מ נסיעה חשמלית שקטה.',
    photo: {
      author: 'Calreyn88',
      license: 'CC BY 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Ferrari_SF90_Stradale_Mayfair.jpg',
    },
  },
  {
    id: '296-gtb',
    brand: 'ferrari',
    model: '296 GTB',
    year: 2022,
    engine: 'V6 טווין-טורבו 3.0L היברידי',
    hp: 819,
    topSpeed: 330,
    zeroToHundred: 2.9,
    price: 320000,
    color: '#eab308',
    description: 'מנוע V6 ראשון בפרארי כביש מאז הדינו, עם צליל שזכה לכינוי "ה-V12 הקטן".',
    photo: {
      author: 'Alexander Migl',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Ferrari_296_GTB_1X7A6377.jpg',
    },
  },
  {
    id: 'revuelto',
    brand: 'lamborghini',
    model: 'Revuelto',
    year: 2024,
    engine: 'V12 אטמוספרי 6.5L + 3 מנועים חשמליים',
    hp: 1001,
    topSpeed: 350,
    zeroToHundred: 2.5,
    price: 608000,
    color: '#e5e7eb',
    description: 'יורשת האוונטדור: V12 בלי טורבו ומעל 1,000 כ"ס בזכות שלושה מנועים חשמליים.',
    photo: {
      author: 'Alexander-93',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Lamborghini_Revuelto_IMG_0562.jpg',
    },
  },
  {
    id: 'huracan-sto',
    brand: 'lamborghini',
    model: 'Huracán STO',
    year: 2021,
    engine: 'V10 אטמוספרי 5.2L',
    hp: 631,
    topSpeed: 310,
    zeroToHundred: 3.0,
    price: 330000,
    color: '#0ea5e9',
    description: 'מכונית מסלול עם לוחית רישוי, שפותחה על בסיס מכוניות המרוץ Super Trofeo.',
    photo: {
      author: 'Calreyn88',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Lamborghini_Huracan_STO_23.jpg',
    },
  },
  {
    id: '911-gt3-rs',
    brand: 'porsche',
    model: '911 GT3 RS',
    year: 2023,
    engine: 'בוקסר 6 צילינדרים 4.0L',
    hp: 518,
    topSpeed: 296,
    zeroToHundred: 3.2,
    price: 241000,
    color: '#94a3b8',
    description: 'כנף אחורית מתכווננת (DRS) ו-860 ק"ג כוח הצמדה ב-285 קמ"ש.',
    photo: {
      author: 'Alexander Migl',
      license: 'CC BY-SA 4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:Porsche_992_GT3_RS_MYLE_Festival_2025_DSC_9586_(cropped).jpg',
    },
  },
  {
    id: '918-spyder',
    brand: 'porsche',
    model: '918 Spyder',
    year: 2015,
    engine: 'V8 4.6L + 2 מנועים חשמליים',
    hp: 887,
    topSpeed: 345,
    zeroToHundred: 2.6,
    price: 845000,
    color: '#cbd5e1',
    description: 'אחת משלוש ההייפרקארים ההיברידיות המקוריות. יוצרו רק 918 יחידות.',
    photo: {
      author: 'Thomas Wolf, www.foto-tw.de',
      license: 'CC BY-SA 3.0 de',
      source: 'https://commons.wikimedia.org/wiki/File:Porsche_918_Spyder_IAA_2013_(Zuschnitt).jpg',
    },
  },
  {
    id: '750s',
    brand: 'mclaren',
    model: '750S',
    year: 2023,
    engine: 'V8 טווין-טורבו 4.0L',
    hp: 740,
    topSpeed: 332,
    zeroToHundred: 2.8,
    price: 330000,
    color: '#f97316',
    description: 'שלדת מונוקוק מסיבי פחמן ויחס הספק-משקל מהגבוהים בקטגוריה.',
    photo: {
      author: 'Calreyn88',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:2024_McLaren_750S_2.jpg',
    },
  },
  {
    id: 'p1',
    brand: 'mclaren',
    model: 'P1',
    year: 2014,
    engine: 'V8 טווין-טורבו 3.8L היברידי',
    hp: 903,
    topSpeed: 350,
    zeroToHundred: 2.8,
    price: 1150000,
    color: '#7c3aed',
    description: 'יורשת רוחנית של ה-F1, עם מצב Race שמנמיך את המכונית ב-50 מ"מ.',
    photo: {
      author: 'MrWalkr',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:2013_McLaren_P1_MSO.jpg',
    },
  },
  {
    id: 'chiron-super-sport',
    brand: 'bugatti',
    model: 'Chiron Super Sport',
    year: 2022,
    engine: 'W16 קוואד-טורבו 8.0L',
    hp: 1578,
    topSpeed: 440,
    zeroToHundred: 2.4,
    price: 3900000,
    color: '#e5e7eb',
    description: 'גרסת הזנב הארוך של השירון, שתוכננה לשבירת שיאי מהירות.',
    photo: {
      author: 'Vauxford',
      license: 'CC BY-SA 4.0',
      source:
        'https://commons.wikimedia.org/wiki/File:2021_Bugatti_Chiron_Super_Sport_8.0_Front.jpg',
    },
  },
  {
    id: 'tourbillon',
    brand: 'bugatti',
    model: 'Tourbillon',
    year: 2026,
    engine: 'V16 אטמוספרי 8.3L + 3 מנועים חשמליים',
    hp: 1775,
    topSpeed: 445,
    zeroToHundred: 2.0,
    price: 4100000,
    color: '#7dd3fc',
    description: 'הבוגאטי הראשונה בעידן ההיברידי, עם לוח מחוונים מכני בהשראת שעוני יוקרה.',
    photo: {
      author: 'MrWalkr',
      license: 'CC BY-SA 4.0',
      source: 'https://commons.wikimedia.org/wiki/File:Bugatti_Tourbillon.jpg',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class CarsService {
  private readonly cars = signal<Car[]>(CARS);

  readonly brands = BRANDS;
  readonly all = this.cars.asReadonly();

  readonly records = computed(() => {
    const list = this.cars();
    return {
      maxHp: Math.max(...list.map((c) => c.hp)),
      maxTopSpeed: Math.max(...list.map((c) => c.topSpeed)),
      bestZeroToHundred: Math.min(...list.map((c) => c.zeroToHundred)),
    };
  });

  getById(id: string | null | undefined): Car | undefined {
    return this.cars().find((c) => c.id === id);
  }

  getBrand(slug: string | null | undefined): Brand | undefined {
    return this.brands.find((b) => b.slug === slug);
  }

  filter(brand: string, sort: SortKey): Car[] {
    const list = brand === 'all' ? this.cars() : this.cars().filter((c) => c.brand === brand);
    // 0-100: נמוך יותר = טוב יותר, לכן ממיינים בסדר עולה. בשאר המדדים - יורד.
    const direction = sort === 'zeroToHundred' ? 1 : -1;
    return [...list].sort((a, b) => (a[sort] - b[sort]) * direction);
  }
}
