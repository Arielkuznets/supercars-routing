import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import {
  PreloadAllModules,
  TitleStrategy,
  provideRouter,
  withComponentInputBinding,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';

import { routes } from './app.routes';
import { AppTitleStrategy } from '../routing/title-strategy';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      withComponentInputBinding(), // פרמטרים מה-URL נכנסים ישירות ל-input() של הקומפוננטה
      // אנימציית מעבר בין דפים (View Transitions API). בטעינה הראשונה אין ממה לעבור, אז מדלגים
      withViewTransitions({ skipInitialTransition: true }),
      withInMemoryScrolling({ scrollPositionRestoration: 'top' }),
      withPreloading(PreloadAllModules), // אחרי הטעינה הראשונה, שאר הדפים נטענים ברקע
    ),
    { provide: TitleStrategy, useClass: AppTitleStrategy },
  ],
};
