import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { MenuItem, MenuModule } from '@lib/components/menu';
import { LogoComponent } from '@lib/layouts/horizontal-layout/logo/logo.component';
import { AuthService } from '@lib/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [LogoComponent, RouterLink, ButtonModule, IconComponent, MenuModule, AsyncPipe],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class HeaderComponent {
  private readonly _authService = inject(AuthService);

  menuItems: MenuItem<'logout'>[] = [
    {
      icon: 'logout',
      label: 'Logout',
      action: 'logout',
    },
  ];

  username$ = this._authService.getUserName();
  email$ = this._authService.getUserEmail();

  doUserMenuAction(event: string): void {
    if (event === 'logout') {
      this._authService.logout();
    }
  }
}
