import { NgModule } from '@angular/core';
import { InputDirective } from '@lib/components/input';
import { AutocompleteTriggerDirective } from './autocomplete-trigger.directive';
import { AutocompleteComponent } from './autocomplete.component';

/**
 * ATTENTION!!!
 * This module imports also InputDirective to ensure that AutocompleteTriggerDirective is
 * declared AFTER InputDirective to make FormFocusHandlerDirective aware that its ContentChildren
 * is targeting an InputDirective with an AutocompleteTriggerDirective associated to it, so
 * FormFocusHandlerDirective triggers FocusableItem methods on right component
 */
@NgModule({
  imports: [InputDirective, AutocompleteComponent, AutocompleteTriggerDirective],
  exports: [InputDirective, AutocompleteComponent, AutocompleteTriggerDirective],
})
export class AutocompleteModule {}
