import { EnvironmentProviders, inject, provideAppInitializer } from '@angular/core';
import { APP_LANGS } from '@lib/constants';
import { StorageService } from '@lib/services/storage.service';
import { TranslateService } from '@ngx-translate/core';

export const provideLangInitializer = (): EnvironmentProviders =>
  provideAppInitializer(() => {
    const translateService = inject(TranslateService);
    const storageService = inject(StorageService);

    translateService.addLangs(APP_LANGS);

    const userLang = storageService.getItem('appLang');
    const browserLang = translateService.getBrowserLang();
    const defaultLang = translateService.getFallbackLang();

    const lang = userLang ?? browserLang ?? defaultLang;

    if (lang) {
      storageService.setItem('appLang', lang);
      void translateService.use(lang);
    }
  });
