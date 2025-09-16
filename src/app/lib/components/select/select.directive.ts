import { Directive, DoCheck, ElementRef, EventEmitter, Input, Output, booleanAttribute, inject } from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { getUniqueId } from '@lib/utils/getUniqueId';

@Directive({
  selector: 'select[appSelect]',
  providers: [provideFocusableItem(SelectDirective)],
  host: {
    '[class]': 'classes',
    '[id]': 'id',
    '[attr.disabled]': 'disabled || null',
    placeholder: ' ',
    '(focus)': 'elementFocus.emit()',
    '(blur)': 'elementBlur.emit()',
  },
})
export class SelectDirective implements FocusableItem, DoCheck {
  private readonly _ngControl = inject(NgControl, { self: true, optional: true });
  private readonly _elementRef = inject<ElementRef<HTMLSelectElement>>(ElementRef);

  @Input() id = getUniqueId('app-select');

  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  get classes(): string {
    const borderColorClasses = this.invalid
      ? 'border-danger focus:border-danger focus:ring-danger/40'
      : 'border-gray-darker placeholder-shown:border-gray focus:border-primary focus:ring-primary/40';

    return `block min-h-[40px] pl-2.5 pr-8 w-full text-sm text-black rounded-sm border appearance-none focus:ring-4 focus:ring-offset-0 peer select-none disabled:bg-gray-lighter disabled:opacity-50 ${borderColorClasses}`;
  }

  get hostElement(): HTMLSelectElement {
    return this._elementRef.nativeElement;
  }

  get required(): boolean {
    return this.control?.hasValidator(Validators.required) ?? false;
  }

  get invalid(): boolean {
    return !!(this.control?.dirty ?? this.control?.touched) && !!this.control?.invalid;
  }

  get control(): AbstractControl<unknown, unknown> | null {
    return this._ngControl?.control ?? null;
  }

  ngDoCheck(): void {
    if (this._ngControl) {
      if (this._ngControl.disabled !== null && this._ngControl.disabled !== this.disabled) {
        this.disabled = this._ngControl.disabled;
      }
    }
  }

  focusItem(): void {
    if (!this.disabled) {
      this.hostElement.focus();
    }
  }
}
