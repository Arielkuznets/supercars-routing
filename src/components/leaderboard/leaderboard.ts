import { DecimalPipe } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CarsService } from '../../services/cars';

@Component({
  selector: 'app-leaderboard',
  imports: [RouterLink, DecimalPipe],
  template: `
    <section class="card board">
      <h2>🏁 טבלת תאוצה 0-100</h2>
      <ol>
        @for (car of top(); track car.id; let i = $index) {
          <li>
            <span class="rank">{{ i + 1 }}</span>
            <a [routerLink]="['/car', car.id]"
              ><bdi>{{ car.model }}</bdi></a
            >
            <span class="bar"
              ><span [style.width.%]="(best() / car.zeroToHundred) * 100"></span
            ></span>
            <strong>{{ car.zeroToHundred | number: '1.1-1' }}s</strong>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    .board {
      padding: 1.5rem;
    }
    h2 {
      margin-bottom: 1rem;
    }
    ol {
      list-style: none;
      margin: 0;
      padding: 0;
      display: grid;
      gap: 0.75rem;
    }
    li {
      display: grid;
      grid-template-columns: 2rem 11rem 1fr 3rem;
      align-items: center;
      gap: 0.75rem;
    }
    .rank {
      color: var(--muted);
      font-weight: 700;
    }
    a {
      text-decoration: none;
      font-weight: 500;
    }
    a:hover {
      color: var(--accent);
    }
    .bar {
      height: 8px;
      background: var(--surface-2);
      border-radius: 999px;
      overflow: hidden;
    }
    .bar span {
      display: block;
      height: 100%;
      background: linear-gradient(90deg, var(--accent-2), var(--accent));
      border-radius: inherit;
    }
    strong {
      direction: ltr;
      text-align: left;
    }
    @media (max-width: 600px) {
      li {
        grid-template-columns: 1.5rem 1fr 3rem;
      }
      .bar {
        display: none;
      }
    }
  `,
})
export class Leaderboard {
  private readonly carsService = inject(CarsService);

  protected readonly top = computed(() =>
    this.carsService.filter('all', 'zeroToHundred').slice(0, 5),
  );
  protected readonly best = computed(() => this.carsService.records().bestZeroToHundred);
}
