import { ChangeDetectionStrategy, Component, InjectionToken } from '@angular/core';
import { TabNavLinkComponent } from './tab-nav-link.component';

export interface TabNavChangeEvent {
  index: number;
  tabNav: TabNavLinkComponent;
}

export const APP_TAB_NAV_GROUP = new InjectionToken<TabNavGroupComponent>('TabNavGroupComponent');

@Component({
  selector: 'app-tab-nav-group',
  standalone: true,
  templateUrl: './tab-nav-group.component.html',
  providers: [
    {
      provide: APP_TAB_NAV_GROUP,
      useExisting: TabNavGroupComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabNavGroupComponent {}
