import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector, inject } from '@angular/core';
import { ALERT_POPUP_DATA, AlertPopupData } from './alert-popup-config';
import { AlertPopupRef } from './alert-popup-ref';
import { AlertPopupComponent } from './alert-popup.component';

@Injectable({
  providedIn: 'root',
})
export class AlertPopupService {
  private readonly _overlay = inject(Overlay);
  private readonly _parentInjector = inject(Injector);

  show(data: AlertPopupData): AlertPopupRef {
    const positionStrategy = this._getPositionStrategy();
    const overlayRef = this._overlay.create({
      positionStrategy,
      disposeOnNavigation: true,
    });

    const alertPopupRef = new AlertPopupRef(overlayRef);
    const injector = this._getInjector(data, alertPopupRef, this._parentInjector);
    const alertPopupPortal = new ComponentPortal(AlertPopupComponent, null, injector);

    overlayRef.attach(alertPopupPortal);

    return alertPopupRef;
  }

  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlay.position().global().centerHorizontally().centerVertically();
  }

  private _getInjector(data: AlertPopupData, alertPopupRef: AlertPopupRef, parentInjector: Injector): Injector {
    return Injector.create({
      parent: parentInjector,
      providers: [
        { provide: AlertPopupRef, useValue: alertPopupRef },
        { provide: ALERT_POPUP_DATA, useValue: data },
      ],
    });
  }
}
