import { InjectionToken } from '@angular/core';

export interface DialogConfig<D> {
  data?: D;
  disableClose?: boolean;
  width?: number | string;
  height?: number | string;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
}

export const DIALOG_DATA = new InjectionToken<unknown>('DialogData');
