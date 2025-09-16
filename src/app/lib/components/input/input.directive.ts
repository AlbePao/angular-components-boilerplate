import { Directive, DoCheck, ElementRef, EventEmitter, Input, Output, booleanAttribute, inject } from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { getUniqueId } from '@lib/utils/getUniqueId';

@Directive({
  selector: 'input[appInput], textarea[appInput]',
  providers: [provideFocusableItem(InputDirective)],
  host: {
    '[class]': 'classes',
    '[id]': 'id',
    '[attr.disabled]': 'disabled || null',
    '[attr.required]': 'required || null',
    // Following attribute prevents native autocomplete of the browser to be shown on the input field
    autocomplete: 'off',
    '[placeholder]': `' '`,
    '(focus)': 'elementFocus.emit()',
    '(blur)': 'elementBlur.emit()',
  },
})
export class InputDirective implements FocusableItem, DoCheck {
  private readonly _ngControl = inject(NgControl, { self: true, optional: true });
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  @Input() id = getUniqueId('app-input');

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input({ transform: booleanAttribute })
  get required(): boolean {
    return (this._required || this._ngControl?.control?.hasValidator(Validators.required)) ?? false;
  }
  set required(value: boolean) {
    this._required = value;
  }
  protected _required = false;

  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  get classes(): string {
    const borderColorClassesRequired = this.required
      ? 'placeholder-shown:border-gray-dark'
      : 'placeholder-shown:border-gray-light';

    const borderColorClasses = this.invalid
      ? 'border-danger focus:border-danger focus:ring-danger/40 '
      : `border-gray-darker ${borderColorClassesRequired} focus:border-primary focus:ring-primary/40`;

    return `block min-h-[40px] px-2.5 w-full text-sm text-black rounded-sm border appearance-none focus:ring-4 focus:ring-offset-0 peer select-none disabled:bg-gray-lighter disabled:opacity-50 ${borderColorClasses}`;
  }

  get hostElement(): HTMLInputElement {
    return this._elementRef.nativeElement;
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
