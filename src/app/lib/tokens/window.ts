import { DOCUMENT } from '@angular/common';
import { inject, InjectionToken } from '@angular/core';

// The WINDOW injection token is taken from https://github.com/taiga-family/ng-web-apis/tree/main/libs/common
export const WINDOW = new InjectionToken<Window>('Window', {
  factory: (): Window => {
    const { defaultView } = inject(DOCUMENT);

    if (!defaultView) {
      throw new Error('Window is not available');
    }

    return defaultView;
  },
});
