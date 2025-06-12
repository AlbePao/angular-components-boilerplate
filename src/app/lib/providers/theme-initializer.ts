import { inject, provideAppInitializer } from '@angular/core';
import { ThemeService } from '@lib/services/theme.service';

export const provideThemeInitializer = () =>
  provideAppInitializer(() => {
    const themeService = inject(ThemeService);
    themeService.init();
  });
