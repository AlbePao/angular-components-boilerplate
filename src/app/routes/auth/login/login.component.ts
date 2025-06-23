import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ButtonComponent } from '@lib/components/button';
import { AuthService } from '@lib/services/auth.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private readonly _authService = inject(AuthService);

  @Input() returnUrl = '';

  login(): void {
    this._authService.login({
      returnUrl: this.returnUrl,
    });
  }
}
