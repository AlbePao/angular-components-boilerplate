import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@lib/components/icon';
import { ThemeService } from '@lib/services/theme.service';
import { AppTheme } from '@lib/types/theme';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, AsyncPipe, IconComponent, TranslatePipe],
  templateUrl: './home.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private readonly _themeService = inject(ThemeService);

  protected currentTheme$ = this._themeService.getTheme();

  handleThemeChange(theme: AppTheme): void {
    this._themeService.setTheme(theme);
  }
}
