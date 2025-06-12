import { Provider } from '@angular/core';
import { NG_VALIDATORS } from '@angular/forms';

export const provideNgValidators = (useExisting: object): Provider => ({
  provide: NG_VALIDATORS,
  useExisting,
  multi: true,
});
