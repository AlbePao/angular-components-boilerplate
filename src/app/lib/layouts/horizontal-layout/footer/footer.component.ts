import { Component, inject } from '@angular/core';
import { LogoComponent } from '@lib/components/logo';
import { PACKAGE_JSON, providePackageJson } from '@lib/providers/package-json';

@Component({
  selector: 'app-footer',
  imports: [LogoComponent],
  providers: [providePackageJson()],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  readonly packageJson = inject(PACKAGE_JSON);
  readonly currentYear = new Date().getFullYear();
}
