import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { jwtInterceptor } from '@lib/interceptors/jwt.interceptor';
import { serverErrorInterceptor } from '@lib/interceptors/server-error.interceptor';
import { provideThemeInitializer } from '@lib/providers/theme-initializer';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withInterceptors([serverErrorInterceptor, jwtInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideThemeInitializer(),
  ],
};
