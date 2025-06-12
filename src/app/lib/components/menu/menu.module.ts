import { NgModule } from '@angular/core';
import { MenuTriggerDirective } from './menu-trigger.directive';
import { MenuComponent } from './menu.component';

@NgModule({
  imports: [MenuComponent, MenuTriggerDirective],
  exports: [MenuComponent, MenuTriggerDirective],
})
export class MenuModule {}
