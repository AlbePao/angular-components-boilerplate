import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { MenuItem } from '@lib/components/menu';
import { ToggleThemeComponent } from './toggle-theme/toggle-theme.component';

interface SidebarMenuOptions {
  link: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, ButtonModule, IconComponent, ToggleThemeComponent],
  templateUrl: './sidebar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  get isOpen(): boolean {
    return this._isOpen;
  }
  set isOpen(isOpen: boolean) {
    this._isOpen = isOpen;
  }
  private _isOpen = false;

  sidebarItems: MenuItem<SidebarMenuOptions>[] = [];

  toggleSidebar(): void {
    this.isOpen = !this.isOpen;
  }
}
