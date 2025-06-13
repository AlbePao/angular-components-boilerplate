import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { ThemeService } from '@lib/services/theme.service';
import { AppTheme } from '@lib/types/theme';

@Component({
  selector: 'app-toggle-theme',
  imports: [AsyncPipe, IconComponent],
  templateUrl: './toggle-theme.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleThemeComponent {
  private readonly _themeService = inject(ThemeService);

  @Input()
  get showLabel(): boolean {
    return this._showLabel;
  }
  set showLabel(showLabel: boolean) {
    this._showLabel = showLabel;
  }
  private _showLabel = false;

  currentTheme$ = this._themeService.getTheme();

  toggleTheme(currentTheme: AppTheme): void {
    const theme = currentTheme === 'dark' ? 'light' : 'dark';
    this._themeService.setTheme(theme);
  }
}
