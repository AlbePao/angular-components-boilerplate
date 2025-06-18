import {
  HorizontalConnectionPos,
  OriginConnectionPosition,
  Overlay,
  OverlayConnectionPosition,
  OverlayPositionBuilder,
  OverlayRef,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, booleanAttribute, inject } from '@angular/core';
import { isArray } from '@lib/utils/value-checking';
import { TooltipComponent } from './tooltip.component';

interface TooltipOffset {
  offsetX: number;
  offsetY: number;
}

interface TooltipPositionInverted {
  x: HorizontalConnectionPos;
  y: VerticalConnectionPos;
}

export type TooltipPosition = 'left' | 'right' | 'above' | 'below';

@Directive({
  selector: '[appTooltip]',
  host: {
    '(mouseenter)': 'show()',
    '(focus)': 'hide()',
    '(mouseleave)': 'hide()',
    '(blur)': 'hide()',
  },
})
export class TooltipDirective implements OnInit, OnDestroy {
  private readonly _overlay = inject(Overlay);
  private readonly _overlayPositionBuilder = inject(OverlayPositionBuilder);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  private _overlayRef?: OverlayRef;

  @Input() appTooltip?: string | string[] | null = null;
  @Input() appTooltipClass: string | null = null;
  @Input() appTooltipPosition: TooltipPosition = 'left';
  @Input({ transform: booleanAttribute }) appTooltipDisabled = false;

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  ngOnInit(): void {
    const origin = this._getOrigin();
    const overlay = this._getOverlayPosition();
    const offset = this._getOffset();
    const positionStrategy = this._overlayPositionBuilder.flexibleConnectedTo(this._elementRef).withPositions([
      { ...origin.main, ...overlay.main, ...offset },
      { ...origin.fallback, ...overlay.fallback, ...offset },
    ]);

    this._overlayRef = this._overlay.create({ positionStrategy });
  }

  ngOnDestroy(): void {
    this.hide();
  }

  protected show(): void {
    if (!this.appTooltipDisabled && this._overlayRef && this.appTooltip && this.appTooltip?.length > 0) {
      const tooltipRef: ComponentRef<TooltipComponent> = this._overlayRef.attach(new ComponentPortal(TooltipComponent));
      tooltipRef.instance.tooltipText = isArray(this.appTooltip) ? this.appTooltip : [this.appTooltip];

      if (this.appTooltipClass && this.appTooltipClass.length > 0) {
        tooltipRef.instance.tooltipClass = this.appTooltipClass;
      }
    }
  }

  protected hide(): void {
    this._overlayRef?.detach();
  }

  private _getOrigin(): { main: OriginConnectionPosition; fallback: OriginConnectionPosition } {
    const position = this.appTooltipPosition;
    let originPosition: OriginConnectionPosition = { originX: 'start', originY: 'center' };

    if (position === 'above' || position === 'below') {
      originPosition = { originX: 'center', originY: position === 'above' ? 'top' : 'bottom' };
    } else if (position === 'left') {
      originPosition = { originX: 'start', originY: 'center' };
    } else if (position === 'right') {
      originPosition = { originX: 'end', originY: 'center' };
    }

    const { x, y } = this._invertPosition(originPosition.originX, originPosition.originY);

    return {
      main: originPosition,
      fallback: { originX: x, originY: y },
    };
  }

  private _getOverlayPosition(): { main: OverlayConnectionPosition; fallback: OverlayConnectionPosition } {
    const position = this.appTooltipPosition;
    let overlayPosition: OverlayConnectionPosition = { overlayX: 'start', overlayY: 'center' };

    if (position === 'above' || position === 'below') {
      overlayPosition = { overlayX: 'center', overlayY: position === 'above' ? 'bottom' : 'top' };
    } else if (position === 'left') {
      overlayPosition = { overlayX: 'end', overlayY: 'center' };
    } else if (position === 'right') {
      overlayPosition = { overlayX: 'start', overlayY: 'center' };
    }

    const { x, y } = this._invertPosition(overlayPosition.overlayX, overlayPosition.overlayY);

    return {
      main: overlayPosition,
      fallback: { overlayX: x, overlayY: y },
    };
  }

  private _getOffset(): TooltipOffset {
    const position = this.appTooltipPosition;

    if (position === 'above' || position === 'below') {
      return { offsetX: 0, offsetY: position === 'above' ? -8 : 8 };
    }

    return { offsetX: position === 'left' ? -8 : 8, offsetY: 0 };
  }

  private _invertPosition(x: HorizontalConnectionPos, y: VerticalConnectionPos): TooltipPositionInverted {
    if (this.appTooltipPosition === 'above' || this.appTooltipPosition === 'below') {
      if (y === 'top') {
        y = 'bottom';
      } else if (y === 'bottom') {
        y = 'top';
      }
    } else if (x === 'end') {
      x = 'start';
    } else if (x === 'start') {
      x = 'end';
    }

    return { x, y };
  }
}
