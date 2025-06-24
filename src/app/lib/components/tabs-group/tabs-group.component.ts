import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  InjectionToken,
  Output,
  QueryList,
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
  @ContentChildren(TabComponent) tabs = new QueryList<TabComponent>();

  @Output() readonly tabChange = new EventEmitter<TabChangeEvent>();

  // contentChildren are set
  ngAfterContentInit(): void {
    // get the active tab
    const activeTab = this.tabs.find((tab) => tab.active);

    // if there is no active tab set, activate the first
    if (!activeTab) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(selectedTab: TabComponent): void {
    const tabs = this.tabs.toArray();
    const selectedTabIndex = tabs.findIndex((tab) => tab.id === selectedTab.id);

    // deactivate all tabs
    tabs.forEach((tab) => (tab.active = false));

    // activate the tab the user has clicked on.
    selectedTab.active = true;

    // emit currently selected tab
    this.tabChange.emit({ index: selectedTabIndex, tab: selectedTab });
  }
}
