import { Component, computed, input } from '@angular/core';
import { Car } from '../../models/car';

// תמונת הרכב. לכל רכב יש שני קבצים (600 ו-1200 פיקסלים), והדפדפן בוחר לפי sizes
// את הקטן ביותר שמספיק - כך כרטיס קטן לא מוריד תמונה גדולה.
// view-transition-name מאפשר לדפדפן "להעביר" את אותה תמונה בין דף לדף באנימציה.
@Component({
  selector: 'app-car-photo',
  host: { '[style.view-transition-name]': "'car-' + car().id" },
  template: `
    <!-- loading ו-srcset לפני src, אחרת הדפדפן מתחיל להוריד לפני שהוא יודע מה לבחור -->
    <img
      [attr.loading]="priority() ? 'eager' : 'lazy'"
      [attr.fetchpriority]="priority() ? 'high' : 'auto'"
      [sizes]="sizes()"
      [srcset]="srcset()"
      [src]="large()"
      [alt]="car().model"
      decoding="async"
    />
  `,
  styles: `
    :host {
      display: block;
      aspect-ratio: 16 / 10;
      overflow: hidden;
      background: var(--surface-2);
    }
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
})
export class CarPhoto {
  readonly car = input.required<Car>();
  readonly sizes = input('(max-width: 600px) 100vw, 360px');
  readonly priority = input(false);

  protected readonly large = computed(() => `cars/${this.car().id}.webp`);
  protected readonly srcset = computed(
    () => `cars/${this.car().id}-600.webp 600w, ${this.large()} 1200w`,
  );
}
