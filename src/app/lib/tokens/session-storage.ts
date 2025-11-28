import { inject, InjectionToken } from '@angular/core';
import { WINDOW } from './window';

// The SESSION_STORAGE injection token is taken from https://github.com/taiga-family/ng-web-apis/tree/main/libs/common
export const SESSION_STORAGE = new InjectionToken<Storage>('[WA_SESSION_STORAGE]', {
  factory: (): Storage => inject(WINDOW).sessionStorage,
});
