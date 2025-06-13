import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  inject,
} from '@angular/core';
import { APP_TAB_GROUP, TabGroupComponent } from './tab-group.component';

let nextUniqueId = 0;

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabComponent implements OnInit {
  private readonly _tabsGroup = inject<TabGroupComponent>(APP_TAB_GROUP, { optional: true });
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _uniqueId = `app-tab-${++nextUniqueId}`;

  @Input() label = '';
  @Input() name = this._uniqueId;
  @Input() id = this._uniqueId;

  @Input()
  get active(): boolean {
    return this._active;
  }
  set active(active: BooleanInput) {
    this._active = coerceBooleanProperty(active);
    this._changeDetectorRef.markForCheck();
  }
  private _active = false;

  @HostBinding('class') classes = 'block';

  ngOnInit(): void {
    if (!this._tabsGroup) {
      throw new Error('TabComponent: app-tab component must be inside an app-tab-group');
    }
  }
}
