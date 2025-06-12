import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-toggle-fullscreen',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './toggle-fullscreen.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleFullscreenComponent {
  private readonly _document = inject(DOCUMENT);

  element = this._document.documentElement;

  @Input()
  get showLabel(): boolean {
    return this._showLabel;
  }
  set showLabel(showLabel: boolean) {
    this._showLabel = showLabel;
  }
  private _showLabel = false;

  get isFullscreenActive(): boolean {
    return this._isFullscreenActive;
  }
  private _isFullscreenActive = false;

  toggleFullscreen(): void {
    if (this.isFullscreenActive) {
      this._closeFullscreen();
    } else {
      this._openFullscreen();
    }

    this._isFullscreenActive = !this._isFullscreenActive;
  }

  private _openFullscreen(): void {
    if (this.element?.requestFullscreen) {
      void this.element.requestFullscreen();
    }
  }

  private _closeFullscreen(): void {
    if (this._document.exitFullscreen) {
      void this._document.exitFullscreen();
    }
  }
}
