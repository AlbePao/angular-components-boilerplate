import { Directive, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';

let nextUniqueId = 0;

@Directive({
  selector: '[appFocus]',
  providers: [provideFocusableItem(FocusTriggerDirective)],
  host: {
    'attr.tabindex': '-1',
    '[attr.appFocusable]': 'appFocusable',
    '(focus)': 'elementFocus.emit()',
    '(blur)': 'elementBlur.emit()',
    '(click)': 'focusTarget()',
  },
})
export class FocusTriggerDirective implements FocusableItem {
  private readonly _elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  private readonly _uniqueId = `app-focus-trigger-${++nextUniqueId}`;

  @Input({ alias: 'appFocus' }) appFocusTrigger?: HTMLInputElement;
  @Input() id = this._uniqueId;

  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  appFocusable = true;

  get disabled(): boolean {
    return !!this.appFocusTrigger?.disabled;
  }

  get hostElement(): HTMLButtonElement {
    return this._elementRef.nativeElement;
  }

  readonly required = false;
  readonly shouldSkipFocus = true;

  focusItem(): void {
    if (!this.disabled) {
      this.hostElement.focus();
    }
  }

  protected focusTarget(): void {
    if (this.appFocusTrigger && !this.disabled) {
      this.appFocusTrigger.focus();
    }
  }
}
