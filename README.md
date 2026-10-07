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
- **`withViewTransitions`** – אנימציית מעבר בין דפים. תמונת המכונית "עוברת" מהכרטיס לדף הרכב, והכרטיסים זזים למקומם החדש כשמשנים מיון.
- **`withPreloading(PreloadAllModules)`** – אחרי הטעינה הראשונה, שאר הדפים נטענים ברקע.
- **`Router.currentNavigation`** – signal שמפעיל פס טעינה בזמן ניווט.

בנוסף: Standalone Components, ‏Signals ‏(`signal`, ‏`computed`, ‏`input`), ‏control flow חדש (`@if`, ‏`@for`, ‏`@empty`) ואפליקציה בלי Zone.js (zoneless).

## קרדיט לתמונות

כל התמונות מ-Wikimedia Commons, ברישיונות Creative Commons. הוקטנו והומרו ל-WebP.
בדף של כל רכב מופיע קרדיט לצלם עם קישור למקור.

| רכב | צלם | רישיון | מקור |
| --- | --- | --- | --- |
| Ferrari SF90 Stradale | Calreyn88 | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ferrari_SF90_Stradale_Mayfair.jpg) |
| Ferrari 296 GTB | Alexander Migl | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Ferrari_296_GTB_1X7A6377.jpg) |
| Lamborghini Revuelto | Alexander-93 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lamborghini_Revuelto_IMG_0562.jpg) |
| Lamborghini Huracán STO | Calreyn88 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Lamborghini_Huracan_STO_23.jpg) |
| Porsche 911 GT3 RS | Alexander Migl | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Porsche_992_GT3_RS_MYLE_Festival_2025_DSC_9586_(cropped).jpg) |
| Porsche 918 Spyder | Thomas Wolf, www.foto-tw.de | CC BY-SA 3.0 de | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Porsche_918_Spyder_IAA_2013_(Zuschnitt).jpg) |
| McLaren 750S | Calreyn88 | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2024_McLaren_750S_2.jpg) |
| McLaren P1 | MrWalkr | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2013_McLaren_P1_MSO.jpg) |
| Bugatti Chiron Super Sport | Vauxford | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2021_Bugatti_Chiron_Super_Sport_8.0_Front.jpg) |
| Bugatti Tourbillon | MrWalkr | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Bugatti_Tourbillon.jpg) |

## הרצה

```bash
npm install
npm start
```

ואז לפתוח את `http://localhost:4200`.
