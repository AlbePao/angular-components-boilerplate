import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { AuthService } from '@lib/services/auth.service';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent, IconComponent],
  templateUrl: './navbar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  private readonly _authService = inject(AuthService);

  onClickSignOut(): void {
    this._authService.logout();
  }
}
