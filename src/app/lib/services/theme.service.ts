import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { DEFAULT_BASE_THEME } from '@lib/constants';
import { storage } from '@lib/storage';
import { WINDOW } from '@lib/tokens/window';
import { AppTheme } from '@lib/types/theme';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { BehaviorSubject, fromEventPattern, Observable, takeUntil } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly _document = inject(DOCUMENT);
  private readonly _window = inject(WINDOW);
  private readonly _destroy$ = injectDestroy();
  private readonly _mediaQuery = this._window.matchMedia('(prefers-color-scheme: dark)');

  private readonly _currentTheme$ = new BehaviorSubject<AppTheme | null>(this._storedTheme);

  public get currentTheme(): AppTheme | null {
    return this._currentTheme$.getValue();
  }

  public get systemTheme(): AppTheme {
    return this._mediaQuery.matches ? 'dark' : 'light';
  }

  private get _storedTheme(): AppTheme | null {
    return storage.getItem('appTheme');
  }

  private set _storedTheme(theme: AppTheme | null) {
    if (theme) {
      storage.setItem('appTheme', theme);
    }
  }

  init(): void {
    this.setTheme(this._storedTheme ?? DEFAULT_BASE_THEME);
    this._listenForMediaQueryChanges();
  }

  getTheme(): Observable<AppTheme | null> {
    return this._currentTheme$.asObservable();
  }

  setTheme(theme: AppTheme): void {
    this._clearThemes();
    this._storedTheme = theme;

    let bodyClass = theme;
    this._currentTheme$.next(bodyClass);

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
