import { DOCUMENT } from '@angular/common';
import { inject, Injectable, Signal, signal } from '@angular/core';
import { APP_DEFAULT_THEME } from '@lib/constants';
import { WINDOW } from '@lib/tokens/window';
import { AppTheme } from '@lib/types/theme';
import { injectDestroy } from '@lib/utils/injectDestroy';
import { fromEventPattern, takeUntil } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _window = inject(WINDOW);
  private readonly _storageService = inject(StorageService);
  private readonly _destroy$ = injectDestroy();
  private readonly _mediaQuery = this._window.matchMedia('(prefers-color-scheme: dark)');

  private readonly _currentTheme = signal<AppTheme>(this._storedTheme);

  public get currentTheme(): AppTheme {
    return this._currentTheme();
  }

  public get systemTheme(): AppTheme {
    return this._mediaQuery.matches ? 'dark' : 'light';
  }

  private get _storedTheme(): AppTheme {
    return this._storageService.getItem('appTheme') ?? 'system';
  }

  private set _storedTheme(theme: AppTheme) {
    if (theme) {
      this._storageService.setItem('appTheme', theme);
    }
  }

  init(): void {
    this.setTheme(this._storedTheme ?? APP_DEFAULT_THEME);
    this._listenForMediaQueryChanges();
  }

  getTheme(): Signal<AppTheme> {
    return this._currentTheme.asReadonly();
  }

  setTheme(theme: AppTheme): void {
    this._clearThemes();
    this._storedTheme = theme;

    let bodyClass = theme;
    this._currentTheme.set(bodyClass);

    if (theme === 'system') {
      bodyClass = this.systemTheme;
    }
    this._document.body.classList.add(bodyClass);
  }

  private _listenForMediaQueryChanges(): void {
    fromEventPattern<MediaQueryListEvent>(
      this._mediaQuery.addListener.bind(this._mediaQuery),
      this._mediaQuery.removeListener.bind(this._mediaQuery),
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        // Only applies changes when the current theme is "system"
        if (this._storedTheme === 'system') {
          this.setTheme('system');
        }
      });
  }

  private _clearThemes(): void {
    this._document.body.classList.remove('system', 'light', 'dark');
  }
}
