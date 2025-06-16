import { GlobalPositionStrategy, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ComponentRef, Injectable, Injector, inject } from '@angular/core';
import { DIALOG_DATA, DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly _overlay = inject(Overlay);
  private readonly _parentInjector = inject(Injector);

  open<R = unknown, D = unknown, C = unknown>(component: ComponentType<C>, config: DialogConfig<D>): DialogRef<R, C> {
    const positionStrategy = this._getPositionStrategy();
    const overlayRef = this._overlay.create({
      disposeOnNavigation: true,
      ...config,
      positionStrategy,
      hasBackdrop: true,
      scrollStrategy: this._overlay.scrollStrategies.block(),
      panelClass: ['bg-white', 'rounded-sm'],
    });

    const dialogRef = new DialogRef<R, C>(overlayRef, config.disableClose);

    const injector = this._getInjector<R, D, C>(dialogRef, this._parentInjector, config.data);
    const dialogPortal = new ComponentPortal(component, null, injector);

    const componentRef: ComponentRef<C> = overlayRef.attach(dialogPortal);
    (dialogRef as { componentInstance: C }).componentInstance = componentRef.instance;

    return dialogRef;
  }

  private _getPositionStrategy(): GlobalPositionStrategy {
    return this._overlay.position().global().centerHorizontally().centerVertically();
  }

  private _getInjector<R, D, C>(dialogRef: DialogRef<R, C>, parentInjector: Injector, data?: D): Injector {
    return Injector.create({
      parent: parentInjector,
      providers: [
        { provide: DialogRef, useValue: dialogRef },
        { provide: DIALOG_DATA, useValue: data },
      ],
    });
  }
}
