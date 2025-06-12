import { NgModule } from '@angular/core';
import { InputDirective } from '@lib/components/input';
import { MultiselectTriggerDirective } from './multiselect-trigger.directive';
import { MultiselectComponent } from './multiselect.component';

/**
 * ATTENTION!!!
 * This module imports also InputDirective to ensure that MultiselectTriggerDirective is
 * declared AFTER InputDirective to make FormFocusHandlerDirective aware that its ContentChildren
 * is targeting an InputDirective with an MultiselectTriggerDirective associated to it, so
 * FormFocusHandlerDirective triggers FocusableItem methods on right component
 */
@NgModule({
  imports: [InputDirective, MultiselectComponent, MultiselectTriggerDirective],
  exports: [InputDirective, MultiselectComponent, MultiselectTriggerDirective],
})
export class MultiselectModule {}
