import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChildren,
  EventEmitter,
  InjectionToken,
  Input,
  Output,
  QueryList,
} from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';
import { TabComponent } from './tab.component';

export interface TabChangeEvent {
  index: number;
  tab: TabComponent;
}

export const APP_TAB_GROUP = new InjectionToken<TabGroupComponent>('TabGroupComponent');

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './tab-group.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: APP_TAB_GROUP,
      useExisting: TabGroupComponent,
    },
  ],
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs = new QueryList<TabComponent>();

  @Input() appearance: 'labels' | 'pills' = 'labels';

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
