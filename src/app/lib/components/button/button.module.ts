import { NgModule } from '@angular/core';
import { FocusTriggerDirective } from '@lib/directives/focus-trigger.directive';
import { ButtonComponent } from './button.component';
import { IconButtonComponent } from './icon-button.component';
import { RoundedButtonComponent } from './rounded-button.component';

@NgModule({
  imports: [ButtonComponent, IconButtonComponent, RoundedButtonComponent, FocusTriggerDirective],
  exports: [ButtonComponent, IconButtonComponent, RoundedButtonComponent, FocusTriggerDirective],
})
export class ButtonModule {}
