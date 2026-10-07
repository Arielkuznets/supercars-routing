# SuperCars – Angular Routing

אתר מכוניות ספורט שנבנה ב-Angular 21 כתרגיל בניתוב (Routing).

## הדפים

| נתיב | דף | מה מודגם |
| --- | --- | --- |
| `/` | דף הבית | `routerLink`, ‏`@defer (on viewport)` |
| `/garage/:brand` | הגראז' – סינון לפי יצרן | פרמטר בנתיב + query param ‏(`?sort=price`) |
| `/car/:id` | דף רכב | Resolver, כותרת דינמית, שימוש חוזר בקומפוננטה |
| `/test-drive` | הזמנת נסיעת מבחן | Reactive Forms + ‏`canDeactivate` guard |
| `**` | 404 | ניווט מתוך קוד עם `Router.navigate` |

## יכולות ניתוב

- **Lazy loading** – כל דף נטען עם `loadComponent` ומקבל chunk משלו.
- **`withComponentInputBinding`** – פרמטרים מה-URL נכנסים ישירות ל-`input()` של הקומפוננטה, בלי `ActivatedRoute`.
- **Resolver** – דף הרכב מקבל את הנתונים לפני שהוא מוצג. אם ה-id לא קיים, מוחזר `RedirectCommand` לדף 404.
- **Guard** – יציאה מטופס שמולא חלקית דורשת אישור.
- **`redirectTo`** – הכתובת `/garage` מפנה ל-`/garage/all`.
- **`TitleStrategy`** – כותרת הטאב משתנה לפי הדף, כולל שם הרכב או היצרן.
- **`withViewTransitions`** – אנימציית מעבר בין דפים. המכונית "עוברת" מהכרטיס לדף הרכב, ומחליפה מקום כשמשנים מיון.
- **`withPreloading(PreloadAllModules)`** – אחרי הטעינה הראשונה, שאר הדפים נטענים ברקע.
- **`Router.currentNavigation`** – signal שמפעיל פס טעינה בזמן ניווט.

בנוסף: Standalone Components, ‏Signals ‏(`signal`, ‏`computed`, ‏`input`), ‏control flow חדש (`@if`, ‏`@for`, ‏`@empty`) ואפליקציה בלי Zone.js (zoneless).

## הרצה

```bash
npm install
npm start
```

ואז לפתוח את `http://localhost:4200`.
