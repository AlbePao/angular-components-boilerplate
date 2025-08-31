import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';

export class AlertPopupRef {
  private readonly _closed$ = new Subject<void>();

  closed = this._closed$.asObservable();

  constructor(private readonly _overlay: OverlayRef) {}

  close(): void {
    this._closed$.next();
    this._overlay.dispose();
  }
}
