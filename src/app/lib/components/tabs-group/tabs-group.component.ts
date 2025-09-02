import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  contentChildren,
  InjectionToken,
  output,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TabComponent } from './tab.component';

export interface TabChangeEvent {
  index: number;
  tab: TabComponent;
}

export const APP_TABS_GROUP = new InjectionToken<TabsGroupComponent>('TabsGroupComponent');

@Component({
  selector: 'app-tabs-group',
  imports: [TranslatePipe],
  templateUrl: './tabs-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
  providers: [
    {
      provide: APP_TABS_GROUP,
      useExisting: TabsGroupComponent,
    },
  ],
})
export class TabsGroupComponent implements AfterContentInit {
  readonly tabs = contentChildren(TabComponent);

  readonly tabChange = output<TabChangeEvent>();

  // contentChildren are set
  ngAfterContentInit(): void {
    const tabs = this.tabs();

    // get the active tab
    const activeTab = tabs.find((tab) => tab.active());

    // if there is no active tab set, activate the first
    if (!activeTab && tabs[0]) {
      this.selectTab(tabs[0]);
    }
  }

  selectTab(selectedTab: TabComponent): void {
    const tabs = this.tabs();
    const selectedTabIndex = tabs.findIndex((tab) => tab.id === selectedTab.id);

    // deactivate all tabs
    tabs.forEach((tab) => tab.isActive.set(false));

    // activate the tab the user has clicked on.
    selectedTab.isActive.set(true);

    // emit currently selected tab
    this.tabChange.emit({ index: selectedTabIndex, tab: selectedTab });
  }
}
