import { Component, inject } from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { LogoComponent } from '@lib/components/logo';
import { AuthService } from '@lib/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  imports: [LogoComponent, IconComponent, TranslatePipe],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly _authService = inject(AuthService);

  onClickSignOut(): void {
    this._authService.logout();
  }
}
