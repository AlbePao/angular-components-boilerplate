import { ChangeDetectionStrategy, Component, Input, OnInit, inject } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { APP_TAB_NAV_GROUP } from './tab-nav-group.component';

let nextUniqueId = 0;

@Component({
  selector: '[app-tab-nav-link], [appTabNavLink]',
  templateUrl: './tab-nav-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RouterLinkActive],
})
export class TabNavLinkComponent implements OnInit {
  private readonly _tabsGroup = inject(APP_TAB_NAV_GROUP, { optional: true });
  private readonly _routerLinkActive = inject(RouterLinkActive);

  private _uniqueId = `app-tab-nav-link-${++nextUniqueId}`;

  @Input() name = this._uniqueId;
  @Input() id = this._uniqueId;

  get isActive(): boolean {
    return this._routerLinkActive.isActive;
  }

  ngOnInit(): void {
    if (!this._tabsGroup) {
      throw new Error('TabNavLinkComponent: app-tab-nav-link component must be inside an app-tab-nav-group');
    }
  }
}
