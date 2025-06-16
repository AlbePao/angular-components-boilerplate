import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { FocusableItem } from '@lib/providers/focusable-item';
import { Option } from '@lib/types/option';

export interface ToggleOption<T> extends Omit<Option<T>, 'label'> {
  label?: string;
}

let nextUniqueId = 0;

@Directive({
  host: {
    '[class]': 'classes',
    '[attr.id]': 'toggleId',
    '[attr.appFocusable]': 'appFocusable',
  },
})
export class ToggleBase<T> implements FocusableItem {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _hasInnerFocus = false;

  @ViewChild('appToggle') appToggle?: ElementRef<HTMLDivElement>;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id = `app-toggle-${nextUniqueId++}`;

  @Input()
  get options(): ToggleOption<T>[] {
    return this._options;
  }
  set options(options: ToggleOption<T>[] | null) {
    this._options = options ?? [];
  }
  private _options: ToggleOption<T>[] = [];

  @Input()
  get value(): T | null {
    return this._value;
  }
  set value(value: T | null) {
    this._value = value;
  }
  private _value: T | null = null;

  @Input()
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: BooleanInput) {
    const disabledNewValue = coerceBooleanProperty(disabled);

    if (disabledNewValue !== this.disabled) {
      this._disabled = disabledNewValue;
      this._changeDetectorRef.markForCheck();
    }

    if (this._hasInnerFocus) {
      this._hasInnerFocus = false;
      this.elementBlur.emit();
    }
  }
  private _disabled = false;

  @Output() readonly valueChange = new EventEmitter<T | null>();
  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  appFocusable = true;

  get classes(): string {
    return `inline-block${this.disabled ? ' opacity-50 pointer-events-none' : ''}`;
  }

  get toggleId(): string | null {
    return this.id || null;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const { keyCode } = event;
    const isLeftArrowKey = keyCode === LEFT_ARROW;
    const isRightArrowKey = keyCode === RIGHT_ARROW;
    const isSpaceKey = keyCode === SPACE;

    if (isLeftArrowKey) {
      event.preventDefault();
      this.setPrevValue();
    } else if (isRightArrowKey || isSpaceKey) {
      event.preventDefault();
      this.setNextValue();
    }
  }

  onChange = (value: T | null): void => {};
  onTouched = (): void => {};

  required = true;
  touched = false;

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  focusItem(): void {
    if (!this.disabled && !!this.appToggle) {
      this.appToggle.nativeElement.focus();
    }
  }

  protected changeInnerFocus(isFocused: boolean): void {
    this.markAsTouched();

    if (isFocused !== this._hasInnerFocus) {
      this._hasInnerFocus = isFocused;

      if (this._hasInnerFocus) {
        this.elementFocus.emit();
      } else {
        this.elementBlur.emit();
      }
    }
  }

  writeValue(value: T | null): void {
    this.value = value;
    this._changeDetectorRef.detectChanges();
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    this._changeDetectorRef.detectChanges();
  }

  setValue(value: T | null): void {
    this.markAsTouched();
    const optionValue = this.options.find((option) => option.value === value);

    if (!this.disabled && !!optionValue && !optionValue.disabled) {
      this.value = value;
      this.onChange(this.value);
      this.valueChange.emit(value);
    }
  }

  setNextValue(): void {
    const currentIndex = this._getCurrentOptionIndex();
    const length = this.options.length - 1;

    // Increase the current option index to access next option
    let nextIndex = currentIndex < length ? currentIndex + 1 : 0;
    let nextOption = this.options[nextIndex];
    let isDisabled = true;

    // Find first option that isn't disabled
    while (isDisabled) {
      nextOption = this.options[nextIndex];
      isDisabled = !!nextOption?.disabled;

      if (isDisabled) {
        nextIndex = nextIndex < length ? nextIndex + 1 : 0;
      }
    }

    this.setValue(nextOption?.value ?? null);
  }

  setPrevValue(): void {
    const currentIndex = this._getCurrentOptionIndex();
    const length = this.options.length - 1;

    // Decrease the current option index to access prev option
    let prevIndex = currentIndex > 0 ? currentIndex - 1 : length;
    let prevOption = this.options[prevIndex];
    let isDisabled = true;

    // Find first option that isn't disabled
    while (isDisabled) {
      prevOption = this.options[prevIndex];
      isDisabled = !!prevOption?.disabled;

      if (isDisabled) {
        prevIndex = prevIndex > 0 ? prevIndex - 1 : length;
      }
    }

    this.setValue(prevOption?.value ?? null);
  }

  private _getCurrentOptionIndex(): number {
    return this.options.findIndex(({ value: value }) => value === this.value);
  }
}
