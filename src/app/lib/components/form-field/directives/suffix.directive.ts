import { Directive, InjectionToken, Input } from '@angular/core';

export const APP_SUFFIX = new InjectionToken<SuffixDirective>('AppSuffix');

@Directive({
  selector: '[appSuffix], [appIconSuffix], [appTextSuffix]',
  providers: [{ provide: APP_SUFFIX, useExisting: SuffixDirective }],
})
export class SuffixDirective {
  @Input({ alias: 'appTextSuffix' })
  set isTextSelector(value: '') {
    this.isText = true;
  }

  isText = false;
}
