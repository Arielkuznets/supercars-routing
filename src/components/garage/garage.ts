import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SortKey } from '../../models/car';
import { CarsService } from '../../services/cars';
import { CarSilhouette } from '../car-silhouette/car-silhouette';

@Component({
  selector: 'app-garage',
  imports: [RouterLink, RouterLinkActive, DecimalPipe, CurrencyPipe, CarSilhouette],
  templateUrl: './garage.html',
  styleUrl: './garage.css',
})
export class Garage {
  private readonly carsService = inject(CarsService);

  // בזכות withComponentInputBinding:
  // brand מגיע מהנתיב /garage/:brand, ו-sort מה-query string ‏(?sort=price)
  readonly brand = input.required<string>();
  readonly sort = input<string>();

  protected readonly brands = this.carsService.brands;
  protected readonly sortOptions: { key: SortKey; label: string }[] = [
    { key: 'hp', label: 'כוח סוס' },
    { key: 'topSpeed', label: 'מהירות מרבית' },
    { key: 'zeroToHundred', label: 'תאוצה' },
    { key: 'price', label: 'מחיר' },
  ];

  protected readonly activeSort = computed(
    () => this.sortOptions.find((o) => o.key === this.sort()) ?? this.sortOptions[0],
  );
  protected readonly currentBrand = computed(() => this.carsService.getBrand(this.brand()));
  protected readonly cars = computed(() =>
    this.carsService.filter(this.brand(), this.activeSort().key),
  );

  protected brandName(slug: string): string {
    return this.carsService.getBrand(slug)?.name ?? slug;
  }
}
