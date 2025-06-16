import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import {
  A,
  BACKSPACE,
  C,
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
  V,
  X,
  ZERO,
} from '@angular/cdk/keycodes';
import {
  booleanAttribute,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostAttributeToken,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { fromEvent, merge, takeUntil, tap } from 'rxjs';

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
    '[attr.id]': 'inputId',
    '[attr.disabled]': 'isDisabled',
    '[attr.required]': 'isRequired',
    // Following attribute prevents native autocomplete of the browser to be shown on the input field
    'attr.autocomplete': 'off',
    'attr.placeholder': ' ',
    '[attr.appFocusable]': 'appFocusable',
  },
})
export class InputDirective implements FocusableItem, OnInit, DoCheck {
  private readonly _type = inject(new HostAttributeToken('type'), { optional: true });
  private readonly _ngControl = inject(NgControl, { self: true, optional: true });
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly _destroy$ = injectDestroy();

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id = `app-input-${nextUniqueId++}`;

  @Input({ transform: booleanAttribute }) disabled = false;
  @Input({ transform: booleanAttribute }) appInputUppercase = true;

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
    const uppercaseClass = this.appInputUppercase ? ' uppercase' : '';

    const borderColorClassesRequired = this.required
      ? 'placeholder-shown:border-gray-dark'
      : 'placeholder-shown:border-gray-light';

    const borderColorClasses = this.invalid
      ? 'border-danger focus:border-danger focus:ring-danger/40 '
      : `border-gray-darker ${borderColorClassesRequired} focus:border-primary focus:ring-primary/40`;

    return `block min-h-[40px] px-2.5 w-full text-sm text-black rounded border appearance-none focus:ring-4 focus:ring-offset-0 peer select-none disabled:bg-gray-lighter disabled:opacity-50 ${borderColorClasses}${uppercaseClass}`;
  }

  get inputId(): string | null {
    return this.id || null;
  }

  get isDisabled(): true | null {
    return this.disabled || null;
  }

  get isRequired(): true | null {
    return this.required || null;
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

  ngOnInit(): void {
    merge(
      fromEvent<KeyboardEvent>(this.hostElement, 'keydown').pipe(tap((event) => this._handleKeyDown(event))),
      fromEvent<InputEvent>(this.hostElement, 'input').pipe(tap((event) => this._handleInput(event))),
      fromEvent<FocusEvent>(this.hostElement, 'focus').pipe(tap(() => this.elementFocus.emit())),
      fromEvent<FocusEvent>(this.hostElement, 'blur').pipe(tap(() => this.elementBlur.emit())),
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe();
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

  private _handleKeyDown(event: KeyboardEvent): void {
    // HACK: handle cmd on macOS
    const isCtrlC = event.ctrlKey && event.keyCode === C;
    const isCtrlV = event.ctrlKey && event.keyCode === V;
    const isCtrlA = event.ctrlKey && event.keyCode === A;
    const isCtrlX = event.ctrlKey && event.keyCode === X;

    if (
      this._type === 'number' &&
      !INPUT_NUMBER_ALLOWED_KEYS.includes(event.keyCode) &&
      !(isCtrlA || isCtrlC || isCtrlV || isCtrlX)
    ) {
      event.preventDefault();
    }
  }

  private _handleInput(event: InputEvent): void {
    if (this.appInputUppercase) {
      const input = event.target as HTMLInputElement;
      const caretPos = input.selectionStart;
      const uppercasedValue = input.value.toUpperCase();

      if (this.control) {
        this.control.setValue(uppercasedValue);
      } else {
        this.hostElement.value = uppercasedValue;
      }

      // When "type" is not declared, its value is null and we treat it as type="text"
      if (['text', 'search', 'password', 'tel', 'url', null].includes(this._type)) {
        input.setSelectionRange(caretPos, caretPos);
      }
    }
  }
}
