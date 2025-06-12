import { Directive, InjectionToken, Input } from '@angular/core';

export const APP_PREFIX = new InjectionToken<PrefixDirective>('AppPrefix');

@Directive({
  selector: '[appPrefix], [appIconPrefix], [appTextPrefix]',
  standalone: true,
  providers: [{ provide: APP_PREFIX, useExisting: PrefixDirective }],
})
export class PrefixDirective {
  @Input({ alias: 'appTextPrefix' })
  set isTextSelector(value: '') {
    this.isText = true;
  }

  isText = false;
}
