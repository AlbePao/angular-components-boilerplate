import { Directive, InjectionToken } from '@angular/core';

export const APP_LABEL = new InjectionToken<LabelDirective>('AppError');

@Directive({
  selector: 'app-label, [appLabel]',
  standalone: true,
  providers: [{ provide: APP_LABEL, useExisting: LabelDirective }],
})
export class LabelDirective {}
