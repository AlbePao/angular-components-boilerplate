import { Directive, HostBinding, InjectionToken } from '@angular/core';

export const APP_ERROR = new InjectionToken<ErrorDirective>('AppError');

@Directive({
  selector: 'app-error, [appError]',
  providers: [{ provide: APP_ERROR, useExisting: ErrorDirective }],
})
export class ErrorDirective {
  @HostBinding('class') classes = 'text-danger';
}
