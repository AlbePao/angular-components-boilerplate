import { Directive, ElementRef, EventEmitter, HostBinding, Input, OnInit, Output, inject } from '@angular/core';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { fromEvent, merge, takeUntil, tap } from 'rxjs';

let nextUniqueId = 0;

@Directive({
  selector: '[appFocus]',
  providers: [provideFocusableItem(FocusTriggerDirective)],
})
export class FocusTriggerDirective implements FocusableItem, OnInit {
  private readonly _elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  private readonly _destroy$ = injectDestroy();
  private _uniqueId = `app-focus-trigger-${++nextUniqueId}`;

  @Input({ alias: 'appFocus' }) appFocusTrigger?: HTMLInputElement;
  @Input() id = this._uniqueId;

  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  @HostBinding('attr.tabindex') tabindex = '-1';
  @HostBinding('attr.appFocusable') appFocusable = true;

  get disabled(): boolean {
    return !!this.appFocusTrigger?.disabled;
  }

  get hostElement(): HTMLButtonElement {
    return this._elementRef.nativeElement;
  }

  readonly required = false;
  readonly shouldSkipFocus = true;

  ngOnInit(): void {
    merge(
      fromEvent<FocusEvent>(this.hostElement, 'focus').pipe(tap(() => this.elementFocus.emit())),
      fromEvent<FocusEvent>(this.hostElement, 'blur').pipe(tap(() => this.elementBlur.emit())),
      fromEvent<PointerEvent>(this.hostElement, 'click').pipe(tap(() => this._focusTarget())),
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  focusItem(): void {
    if (!this.disabled) {
      this.hostElement.focus();
    }
  }

  private _focusTarget(): void {
    if (this.appFocusTrigger && !this.disabled) {
      this.appFocusTrigger.focus();
    }
  }
}
