import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { SHOWCASE_ITEMS } from './sidebar-items';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-sidebar',
  imports: [TranslatePipe, RouterLink, RouterLinkActive, ButtonModule, IconComponent, ToggleThemeComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }
  private _isOpen = true;

  readonly sidebarItems = SHOWCASE_ITEMS;

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}
