import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from '@lib/layouts/main-layout';
import { WelcomeLayoutComponent } from '@lib/layouts/welcome-layout';
import { AuthService } from '@lib/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainLayoutComponent, WelcomeLayoutComponent, AsyncPipe],
  templateUrl: './app.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  isAuthenticated$ = inject(AuthService).isAuthenticated$;
}
