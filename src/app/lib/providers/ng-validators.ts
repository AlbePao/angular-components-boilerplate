import { Provider, Type } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

export const provideNgValidators = (useExisting: Type<unknown>): Provider => ({
  provide: NG_VALIDATORS,
  useExisting,
  multi: true,
});
