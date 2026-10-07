import { DatePipe, DecimalPipe, formatDate } from '@angular/common';
import { Component, OnInit, computed, inject, input, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HasUnsavedChanges } from '../../routing/unsaved-changes-guard';
import { CarsService } from '../../services/cars';
import { CarPhoto } from '../car-photo/car-photo';

interface Booking {
  name: string;
  car: string;
  date: string;
}

@Component({
  selector: 'app-test-drive',
  imports: [ReactiveFormsModule, RouterLink, DatePipe, DecimalPipe, CarPhoto],
  templateUrl: './test-drive.html',
  styleUrl: './test-drive.css',
})
export class TestDrive implements OnInit, HasUnsavedChanges {
  private readonly fb = inject(NonNullableFormBuilder);
  private readonly carsService = inject(CarsService);

  // ?car=sf90-stradale - מגיע מכפתור "הזמנת נסיעת מבחן" בדף הרכב
  readonly car = input<string>();

  protected readonly cars = this.carsService.all;
  protected readonly today = formatDate(new Date(), 'yyyy-MM-dd', 'en');
  protected readonly booking = signal<Booking | null>(null);

  protected readonly form = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^05\d{8}$/)]],
    carId: ['', Validators.required],
    date: ['', Validators.required],
  });

  // הופך את ה-Observable של הטופס ל-signal, כדי להציג תצוגה מקדימה של הרכב שנבחר
  private readonly selectedId = toSignal(this.form.controls.carId.valueChanges, {
    initialValue: '',
  });
  protected readonly selectedCar = computed(() => this.carsService.getById(this.selectedId()));

  ngOnInit(): void {
    const id = this.car();
    if (this.carsService.getById(id)) {
      this.form.controls.carId.setValue(id!);
    }
  }

  hasUnsavedChanges(): boolean {
    return this.form.dirty;
  }

  // <option> לא יכול להכיל <bdi>, לכן עוטפים בתווי בידוד של Unicode (FSI...PDI)
  // כדי ש-"918 Spyder" לא יוצג הפוך בתוך טקסט מימין לשמאל
  protected isolate(text: string): string {
    return `\u2068${text}\u2069`;
  }

  protected showError(control: AbstractControl): boolean {
    return control.invalid && control.touched;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { fullName, carId, date } = this.form.getRawValue();
    this.booking.set({ name: fullName, car: this.carsService.getById(carId)!.model, date });
    this.form.reset();
  }
}
