import { NgModule } from '@angular/core';
import { RadioButtonComponent } from './radio-button.component';
import { RadioGroupDirective } from './radio-group.directive';
import { RadioPillComponent } from './radio-pill.component';

@NgModule({
  imports: [RadioGroupDirective, RadioButtonComponent, RadioPillComponent],
  exports: [RadioGroupDirective, RadioButtonComponent, RadioPillComponent],
})
export class RadioGroupModule {}
