import { Component, computed, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly router = inject(Router);

  // currentNavigation הוא signal של הראוטר: לא null כל עוד יש ניווט בתהליך
  protected readonly isNavigating = computed(() => this.router.currentNavigation() !== null);
}
