import { inject } from '@angular/core';
import { RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Car } from '../models/car';
import { CarsService } from '../services/cars';

// טוען את הרכב לפני שהדף מוצג. אם ה-id לא קיים - מציג 404 במקום דף ריק.
// skipLocationChange משאיר בשורת הכתובת את מה שהמשתמש הקליד.
export const carResolver: ResolveFn<Car> = (route) => {
  const car = inject(CarsService).getById(route.paramMap.get('id'));
  return (
    car ?? new RedirectCommand(inject(Router).parseUrl('/not-found'), { skipLocationChange: true })
  );
};

export const carTitleResolver: ResolveFn<string> = (route) =>
  inject(CarsService).getById(route.paramMap.get('id'))?.model ?? 'רכב לא נמצא';

export const garageTitleResolver: ResolveFn<string> = (route) => {
  const brand = inject(CarsService).getBrand(route.paramMap.get('brand'));
  return brand ? `הגראז' - ${brand.name}` : "הגראז'";
};
