import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { jwtInterceptor } from '@lib/interceptors/jwt.interceptor';
import { serverErrorInterceptor } from '@lib/interceptors/server-error.interceptor';
import { provideLangInitializer } from '@lib/providers/lang-initializer';
import { provideThemeInitializer } from '@lib/providers/theme-initializer';
import { provideTitleStrategy } from '@lib/providers/title-strategy';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([serverErrorInterceptor, jwtInterceptor]), withFetch()),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideThemeInitializer(),
    provideTitleStrategy(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: './i18n/', suffix: '.json' }),
    }),
    provideLangInitializer(),
  ],
};
