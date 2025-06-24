import { ChangeDetectionStrategy, Component, InjectionToken } from '@angular/core';
import { TabNavLinkComponent } from './tab-nav-link.component';

export interface TabNavChangeEvent {
  index: number;
  tabNav: TabNavLinkComponent;
}

export const APP_TABS_NAV_GROUP = new InjectionToken<TabsNavGroupComponent>('TabsNavGroupComponent');

@Component({
  selector: 'app-tabs-nav-group',
  templateUrl: './tabs-nav-group.component.html',
  providers: [
    {
      provide: APP_TABS_NAV_GROUP,
      useExisting: TabsNavGroupComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsNavGroupComponent {}
