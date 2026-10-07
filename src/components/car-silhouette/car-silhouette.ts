import { Component, input } from '@angular/core';

let nextId = 0;

// ציור SVG של מכונית ספורט בצבע שמתקבל מבחוץ.
// transitionName מאפשר לדפדפן "להעביר" את אותה מכונית בין דף לדף באנימציה.
@Component({
  selector: 'app-car-silhouette',
  host: { '[style.view-transition-name]': 'transitionName()' },
  template: `
    <svg viewBox="0 0 240 90" role="img" aria-hidden="true">
      <defs>
        <linearGradient [attr.id]="shineId" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#fff" stop-opacity="0.45" />
          <stop offset="0.55" stop-color="#fff" stop-opacity="0" />
          <stop offset="1" stop-color="#000" stop-opacity="0.35" />
        </linearGradient>
      </defs>

      <ellipse cx="122" cy="81" rx="108" ry="5" fill="#000" opacity="0.45" />

      <g>
        <path [attr.fill]="color()" [attr.d]="body" />
        <path [attr.fill]="'url(#' + shineId + ')'" [attr.d]="body" />
        <path
          d="M70 39 Q98 22 128 20 Q146 20 160 29 L150 37 L78 41 Z"
          fill="#0b1220"
          opacity="0.85"
        />
        <path d="M96 52 L156 47" stroke="#000" stroke-opacity="0.35" stroke-width="2" />
        <path d="M214 45 L229 51 L216 49 Z" fill="#fff" opacity="0.9" />
        <rect x="12" y="46" width="7" height="4" rx="1" fill="#ff2d2d" />
      </g>

      @for (x of wheels; track x) {
        <circle [attr.cx]="x" cy="66" r="14" fill="#0d0f13" />
        <circle [attr.cx]="x" cy="66" r="8.5" fill="#9ca3af" />
        <circle [attr.cx]="x" cy="66" r="3" fill="#0d0f13" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: block;
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      overflow: visible;
    }
  `,
})
export class CarSilhouette {
  readonly color = input.required<string>();
  readonly transitionName = input<string>();

  protected readonly shineId = `shine-${nextId++}`;
  protected readonly wheels = [58, 186];
  protected readonly body =
    'M14 64 L12 52 Q12 44 22 42 L60 38 Q92 18 128 16 Q150 15 166 26 L214 40 Q230 44 232 54 ' +
    'L230 62 Q228 66 222 66 L203 66 A17 17 0 0 0 169 66 L75 66 A17 17 0 0 0 41 66 Z';
}
