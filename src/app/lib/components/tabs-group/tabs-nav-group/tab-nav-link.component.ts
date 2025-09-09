import { ChangeDetectionStrategy, Component, OnInit, inject, input } from '@angular/core';
import { RouterLinkActive } from '@angular/router';
import { getUniqueId } from '@lib/utils/getUniqueId';
import { APP_TABS_NAV_GROUP } from './tabs-nav-group.component';

@Component({
  selector: '[app-tab-nav-link], [appTabNavLink]',
  templateUrl: './tab-nav-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [RouterLinkActive],
})
export class TabNavLinkComponent implements OnInit {
  private readonly _tabsNavGroup = inject(APP_TABS_NAV_GROUP, { optional: true });
  private readonly _routerLinkActive = inject(RouterLinkActive);
  private readonly _uniqueId = getUniqueId('app-tab-nav-link');

  readonly name = input<string>(this._uniqueId);
  readonly id = input<string>(this._uniqueId);

  get isActive(): boolean {
    return this._routerLinkActive.isActive;
  }

  ngOnInit(): void {
    if (!this._tabsNavGroup) {
      throw new Error('TabNavLinkComponent: app-tab-nav-link component must be inside an app-tabs-nav-group');
    }
  }
}
