import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../services/cars';
import { CarSilhouette } from '../car-silhouette/car-silhouette';
import { Leaderboard } from '../leaderboard/leaderboard';

@Component({
  selector: 'app-home',
  imports: [RouterLink, DecimalPipe, CarSilhouette, Leaderboard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  private readonly carsService = inject(CarsService);

  protected readonly records = this.carsService.records;
  protected readonly carCount = computed(() => this.carsService.all().length);
  protected readonly fastest = computed(() => this.carsService.filter('all', 'topSpeed')[0]);

  protected readonly brands = computed(() =>
    this.carsService.brands.map((brand) => ({
      ...brand,
      count: this.carsService.all().filter((car) => car.brand === brand.slug).length,
    })),
  );
}
