import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { APP_LANGS } from '@lib/constants';
import { storage } from '@lib/storage';
import { TranslateService } from '@ngx-translate/core';

export const provideLangInitializer = (): EnvironmentProviders =>
  provideAppInitializer(() => {
    const translateService = inject(TranslateService);
    translateService.addLangs(APP_LANGS);

    const userLang = storage.getItem('appLang');
    const browserLang = translateService.getBrowserLang();
    const defaultLang = translateService.getFallbackLang();

    const lang = userLang ?? browserLang ?? defaultLang;

    if (lang) {
      storage.setItem('appLang', lang);
      void translateService.use(lang);
    }
  });
