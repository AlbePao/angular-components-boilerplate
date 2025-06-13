import { CdkMenuTrigger } from '@angular/cdk/menu';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appMenuTriggerFor]',
  hostDirectives: [
    {
      directive: CdkMenuTrigger,
      inputs: ['cdkMenuTriggerFor: appMenuTriggerFor', 'cdkMenuPosition: appMenuPosition'],
    },
  ],
})
export class MenuTriggerDirective {}
