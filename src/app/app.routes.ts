import { Routes } from '@angular/router';
import { carResolver, carTitleResolver, garageTitleResolver } from '../routing/car-resolver';
import { unsavedChangesGuard } from '../routing/unsaved-changes-guard';

// כל דף נטען בעצלות (lazy loading) - הקוד שלו יורד לדפדפן רק כשנכנסים אליו.
export const routes: Routes = [
  {
    path: '',
    title: 'דף הבית',
    loadComponent: () => import('../components/home/home').then((m) => m.Home),
  },
  { path: 'garage', redirectTo: 'garage/all', pathMatch: 'full' },
  {
    path: 'garage/:brand',
    title: garageTitleResolver,
    loadComponent: () => import('../components/garage/garage').then((m) => m.Garage),
  },
  {
    path: 'car/:id',
    title: carTitleResolver,
    resolve: { car: carResolver },
    loadComponent: () => import('../components/car-details/car-details').then((m) => m.CarDetails),
  },
  {
    path: 'test-drive',
    title: 'נסיעת מבחן',
    canDeactivate: [unsavedChangesGuard],
    loadComponent: () => import('../components/test-drive/test-drive').then((m) => m.TestDrive),
  },
  {
    path: '**',
    title: 'הדף לא נמצא',
    loadComponent: () => import('../components/not-found/not-found').then((m) => m.NotFound),
  },
];
