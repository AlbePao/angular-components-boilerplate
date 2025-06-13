import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { MenuItem, MenuModule } from '@lib/components/menu';
import { AuthService } from '@lib/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterModule, ButtonModule, IconComponent, MenuModule, AsyncPipe],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  private readonly _authService = inject(AuthService);

  @HostBinding('class') classes = 'block';

  menuItems: MenuItem<'logout'>[] = [
    {
      icon: 'logout',
      label: 'Logout',
      action: 'logout',
    },
  ];

  username$ = this._authService.getUserName();

  doUserMenuAction(event: string): void {
    if (event === 'logout') {
      this._authService.logout();
    }
  }
}
