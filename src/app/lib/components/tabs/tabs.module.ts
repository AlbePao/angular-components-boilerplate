import { NgModule } from '@angular/core';
import { TabGroupComponent } from './tab-group.component';
import { TabNavGroupComponent } from './tab-nav-group/tab-nav-group.component';
import { TabNavLinkComponent } from './tab-nav-group/tab-nav-link.component';
import { TabComponent } from './tab.component';

@NgModule({
  imports: [TabComponent, TabGroupComponent, TabNavGroupComponent, TabNavLinkComponent],
  exports: [TabComponent, TabGroupComponent, TabNavGroupComponent, TabNavLinkComponent],
})
export class TabsModule {}
