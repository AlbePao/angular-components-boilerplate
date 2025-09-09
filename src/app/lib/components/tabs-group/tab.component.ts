import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { getUniqueId } from '@lib/utils/getUniqueId';
import { APP_TABS_GROUP, TabsGroupComponent } from './tabs-group.component';

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class TabComponent implements OnInit {
  private readonly _tabsGroup = inject<TabsGroupComponent>(APP_TABS_GROUP, { optional: true });
  private readonly _uniqueId = getUniqueId('app-tab');

  readonly label = input<string>('');
  readonly name = input<string>(this._uniqueId);
  readonly id = input<string>(this._uniqueId);
  readonly active = input(false, { transform: booleanAttribute });

  readonly isActive = signal<boolean>(this.active());
  readonly isActivated = computed(() => this.active() || this.isActive());

  ngOnInit(): void {
    if (!this._tabsGroup) {
      throw new Error('TabComponent: app-tab component must be inside an app-tabs-group');
    }
  }
}
