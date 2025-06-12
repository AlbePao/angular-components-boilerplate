import { InjectionToken } from '@angular/core';

export interface AlertPopupData {
  message: string;
  icon: string;
  duration?: number;
}

export const ALERT_POPUP_DATA = new InjectionToken<AlertPopupData>('AlertPopupData');
