import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Car } from '../../models/car';
import { CarsService } from '../../services/cars';
import { CarPhoto } from '../car-photo/car-photo';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink, DecimalPipe, CurrencyPipe, CarPhoto],
  templateUrl: './car-details.html',
  styleUrl: './car-details.css',
})
export class CarDetails {
  private readonly carsService = inject(CarsService);

  // מגיע מה-resolver שמוגדר בנתיב (resolve: { car: carResolver })
  readonly car = input.required<Car>();

  protected readonly brand = computed(() => this.carsService.getBrand(this.car().brand));

  // ניווט מ-car/a ל-car/b משתמש באותו מופע של הקומפוננטה - רק ה-input מתעדכן
  protected readonly nextCar = computed(() => {
    const all = this.carsService.all();
    const index = all.findIndex((c) => c.id === this.car().id);
    return all[(index + 1) % all.length];
  });

  // אחוז מתוך השיא בגראז', בשביל פסי ההשוואה
  protected readonly stats = computed(() => {
    const car = this.car();
    const records = this.carsService.records();
    return [
      {
        label: 'כוחות סוס',
        value: car.hp,
        digits: '1.0-0',
        unit: 'כ"ס',
        percent: (car.hp / records.maxHp) * 100,
      },
      {
        label: 'מהירות מרבית',
        value: car.topSpeed,
        digits: '1.0-0',
        unit: 'קמ"ש',
        percent: (car.topSpeed / records.maxTopSpeed) * 100,
      },
      {
        label: 'תאוצה 0-100',
        value: car.zeroToHundred,
        digits: '1.1-1',
        unit: 'שניות',
        percent: (records.bestZeroToHundred / car.zeroToHundred) * 100,
      },
    ];
  });
}
