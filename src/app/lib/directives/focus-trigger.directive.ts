import { Directive, ElementRef, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { IdGeneratorService } from '@lib/services/id-generator.service';

@Directive({
  selector: '[appFocus]',
  providers: [provideFocusableItem(FocusTriggerDirective)],
  host: {
    tabindex: '-1',
    '[attr.appFocusable]': 'appFocusable || null',
    '(focus)': 'elementFocus.emit()',
    '(blur)': 'elementBlur.emit()',
    '(click)': 'focusTarget()',
  },
})
export class FocusTriggerDirective implements FocusableItem {
  private readonly _elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  readonly appFocusTrigger = input.required<HTMLInputElement>({ alias: 'appFocus' });
  @Input() id = inject(IdGeneratorService).getId('app-focus-trigger');

  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  appFocusable = true;

  get disabled(): boolean {
    return this.appFocusTrigger().disabled;
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
    if (!this.disabled) {
      this.appFocusTrigger().focus();
    }
  }
}
