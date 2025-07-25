import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';

export class AlertPopupRef {
  private readonly _closed$ = new Subject<void>();

  closed: Observable<void> = this._closed$.asObservable();

  constructor(private readonly _overlay: OverlayRef) {}

  close(): void {
    this._closed$.next();
    this._overlay.dispose();
  }
}
