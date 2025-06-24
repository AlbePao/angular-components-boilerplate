import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  booleanAttribute,
  inject,
} from '@angular/core';
import { APP_TABS_GROUP, TabsGroupComponent } from './tabs-group.component';

let nextUniqueId = 0;

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
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private readonly _uniqueId = `app-tab-${++nextUniqueId}`;

  @Input() label = '';
  @Input() name = this._uniqueId;
  @Input() id = this._uniqueId;

  @Input({ transform: booleanAttribute })
  get active(): boolean {
    return this._active;
  }
  set active(active: boolean) {
    this._active = active;
    this._changeDetectorRef.markForCheck();
  }
  private _active = false;

  ngOnInit(): void {
    if (!this._tabsGroup) {
      throw new Error('TabComponent: app-tab component must be inside an app-tabs-group');
    }
  }
}
