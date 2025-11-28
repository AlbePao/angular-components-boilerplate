import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window';

// The LOCAL_STORAGE injection token is taken from https://github.com/taiga-family/ng-web-apis/tree/main/libs/common
export const LOCAL_STORAGE = new InjectionToken<Storage>('[WA_LOCAL_STORAGE]', {
  factory: (): Storage => inject(WINDOW).localStorage,
});
