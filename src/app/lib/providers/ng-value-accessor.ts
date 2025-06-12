import { Provider, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

export const provideNgValueAccessor = (useExisting: object): Provider => ({
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => useExisting),
  multi: true,
});
