import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { PACKAGE_JSON, providePackageJson } from '@lib/providers/package-json';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent],
  providers: [providePackageJson()],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly packageJson = inject(PACKAGE_JSON);
  readonly currentYear = new Date().getFullYear();
}
