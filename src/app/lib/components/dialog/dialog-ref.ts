import { ESCAPE } from '@angular/cdk/keycodes';
import { OverlayRef } from '@angular/cdk/overlay';
import { filter, merge, Observable, Subject, takeUntil } from 'rxjs';

export class DialogRef<R = unknown, C = unknown> {
  private readonly _destroy$ = new Subject<void>();
  private readonly _closed$ = new Subject<R | void>();

  readonly componentInstance: C | null = null;

  closed: Observable<R | void> = this._closed$.asObservable();

  constructor(
    private readonly _overlay: OverlayRef,
    disableClose?: boolean,
  ) {
    merge(
      this._overlay.backdropClick(),
      this._overlay.keydownEvents().pipe(filter(({ keyCode }) => keyCode === ESCAPE)),
    )
      .pipe(
        filter(() => !disableClose),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        this.close();
      });
  }

  close(result?: R): void {
    this._closed$.next(result);
    this._destroy$.next();
    this._destroy$.complete();
    (this as { componentInstance: C | null }).componentInstance = null;
    this._overlay.dispose();
  }
}
