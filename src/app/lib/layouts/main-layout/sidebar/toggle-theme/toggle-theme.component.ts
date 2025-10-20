import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input } from '@angular/core';
import { RoundedButtonComponent } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { ThemeService } from '@lib/services/theme.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-toggle-theme',
  imports: [RoundedButtonComponent, IconComponent, TranslatePipe],
  templateUrl: './toggle-theme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleThemeComponent {
  private readonly _themeService = inject(ThemeService);

  readonly showLabel = input(false, { transform: booleanAttribute });

  currentTheme = this._themeService.getTheme();

  toggleTheme(): void {
    const theme = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this._themeService.setTheme(theme);
  }
}
