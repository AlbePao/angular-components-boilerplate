import { NgModule } from '@angular/core';
import { TabComponent } from './tab.component';
import { TabsGroupComponent } from './tabs-group.component';
import { TabNavLinkComponent } from './tabs-nav-group/tab-nav-link.component';
import { TabsNavGroupComponent } from './tabs-nav-group/tabs-nav-group.component';

@NgModule({
  imports: [TabComponent, TabsGroupComponent, TabsNavGroupComponent, TabNavLinkComponent],
  exports: [TabComponent, TabsGroupComponent, TabsNavGroupComponent, TabNavLinkComponent],
})
export class TabsGroupModule {}
