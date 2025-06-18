import { NgModule } from '@angular/core';
import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupDirective } from './radio-group.directive';

@NgModule({
  imports: [RadioGroupDirective, RadioButtonComponent],
  exports: [RadioGroupDirective, RadioButtonComponent],
})
export class RadioGroupModule {}
