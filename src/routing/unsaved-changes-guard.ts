import { CanDeactivateFn } from '@angular/router';

export interface HasUnsavedChanges {
  hasUnsavedChanges(): boolean;
}

// נקרא כשמנסים לעזוב את הדף. מחזיר false = הניווט מבוטל והמשתמש נשאר בדף.
export const unsavedChangesGuard: CanDeactivateFn<HasUnsavedChanges> = (component) =>
  !component.hasUnsavedChanges() || confirm('יש פרטים בטופס שעוד לא נשלחו. לצאת בכל זאת?');
