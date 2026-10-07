import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <div class="code">404</div>
      <h1>יצאת מהמסלול</h1>
      <p class="muted">
        הכתובת <code dir="ltr">{{ url() }}</code> לא קיימת בגראז' שלנו.
      </p>
      <div class="actions">
        <button type="button" class="btn btn-primary" (click)="goHome()">🏠 חזרה לדף הבית</button>
        <a class="btn btn-ghost" routerLink="/garage">לגראז'</a>
      </div>
    </div>
  `,
  styles: `
    .not-found {
      text-align: center;
      padding: 3rem 1rem;
    }
    .code {
      font-size: clamp(5rem, 18vw, 9rem);
      font-weight: 900;
      line-height: 1;
      background: linear-gradient(135deg, var(--accent), var(--accent-2));
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
    }
    h1 {
      margin: 0.5rem 0;
    }
    code {
      background: var(--surface-2);
      padding: 0.15rem 0.5rem;
      border-radius: 6px;
    }
    .actions {
      justify-content: center;
      margin-top: 1.5rem;
    }
  `,
})
export class NotFound {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  // ניווט בין שתי כתובות שגויות משתמש באותו מופע של הקומפוננטה,
  // לכן מאזינים לשינויי ה-URL של הנתיב במקום לקרוא אותו פעם אחת
  protected readonly url = toSignal(
    inject(ActivatedRoute).url.pipe(map(() => this.location.path())),
    { initialValue: this.location.path() },
  );

  // ניווט מתוך קוד (ולא דרך routerLink)
  goHome(): void {
    this.router.navigate(['/']);
  }
}
