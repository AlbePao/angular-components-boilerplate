import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  BACKSPACE,
  COMMA,
  DOWN_ARROW,
  EIGHT,
  ENTER,
  FIVE,
  FOUR,
  LEFT_ARROW,
  NINE,
  NUMPAD_EIGHT,
  NUMPAD_FIVE,
  NUMPAD_FOUR,
  NUMPAD_NINE,
  NUMPAD_ONE,
  NUMPAD_PERIOD,
  NUMPAD_SEVEN,
  NUMPAD_SIX,
  NUMPAD_THREE,
  NUMPAD_TWO,
  NUMPAD_ZERO,
  ONE,
  PERIOD,
  RIGHT_ARROW,
  SEVEN,
  SIX,
  TAB,
  THREE,
  TWO,
  UP_ARROW,
  ZERO,
} from '@angular/cdk/keycodes';
import { booleanAttribute, Directive, DoCheck, ElementRef, EventEmitter, inject, Input, Output } from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';

let nextUniqueId = 0;

const INPUT_NUMBER_ALLOWED_KEYS = [
  ONE,
  TWO,
  THREE,
  FOUR,
  FIVE,
  SIX,
  SEVEN,
  EIGHT,
  NINE,
  ZERO,
  NUMPAD_ONE,
  NUMPAD_TWO,
  NUMPAD_THREE,
  NUMPAD_FOUR,
  NUMPAD_FIVE,
  NUMPAD_SIX,
  NUMPAD_SEVEN,
  NUMPAD_EIGHT,
  NUMPAD_NINE,
  NUMPAD_ZERO,
  NUMPAD_PERIOD,
  UP_ARROW,
  DOWN_ARROW,
  LEFT_ARROW,
  RIGHT_ARROW,
  BACKSPACE,
  ENTER,
  COMMA,
  PERIOD,
  TAB,
];

@Directive({
  selector: 'input[appInput], textarea[appInput]',
  providers: [provideFocusableItem(InputDirective)],
  host: {
    '[class]': 'classes',
    '[attr.id]': 'id || null',
    '[attr.disabled]': 'disabled || null',
    '[attr.required]': 'required || null',
    // Following attribute prevents native autocomplete of the browser to be shown on the input field
    'attr.autocomplete': 'off',
    'attr.placeholder': ' ',
    '[attr.appFocusable]': 'appFocusable',
    '(focus)': 'elementFocus.emit()',
    '(blur)': 'elementBlur.emit()',
  },
})
export class InputDirective implements FocusableItem, DoCheck {
  private readonly _ngControl = inject(NgControl, { self: true, optional: true });
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id = `app-input-${nextUniqueId++}`;

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input()
  get required(): boolean {
    return (this._required || this._ngControl?.control?.hasValidator(Validators.required)) ?? false;
  }
  set required(value: BooleanInput) {
    this._required = coerceBooleanProperty(value);
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

  appFocusable = true;

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
