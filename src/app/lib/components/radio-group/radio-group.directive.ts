import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Input,
  Output,
  QueryList,
  booleanAttribute,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { injectDestroy } from '@lib/utils/injectDestroy';
import { Subject, merge, startWith, switchMap, takeUntil } from 'rxjs';
import { APP_RADIO, RadioButtonComponent } from './radio-button.component';

let nextUniqueId = 0;

export const APP_RADIO_GROUP = new InjectionToken<RadioGroupDirective>('RadioGroupDirective');

@Directive({
  selector: 'app-radio-group',
  providers: [
    provideFocusableItem(RadioGroupDirective),
    provideNgValueAccessor(RadioGroupDirective),
    {
      provide: APP_RADIO_GROUP,
      useExisting: RadioGroupDirective,
    },
  ],
  host: {
    class: 'flex gap-4',
    '[id]': 'id',
    '[attr.appFocusable]': 'appFocusable || null',
  },
})
export class RadioGroupDirective implements ControlValueAccessor, FocusableItem, AfterContentInit {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _destroy$ = injectDestroy();

  private readonly _uniqueId = `app-radio-group-${nextUniqueId++}`;

  private _focusableRadios: RadioButtonComponent[] = [];
  private readonly _focusableRadios$ = new Subject<RadioButtonComponent[]>();

  /** Whether the `value` has been set to its initial value. */
  private _isInitialized = false;

  // Child radio buttons
  @ContentChildren(forwardRef(() => APP_RADIO), { descendants: true })
  radioButtons = new QueryList<RadioButtonComponent>();

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id = this._uniqueId;

  /** Name of the radio button group. All radio buttons inside this group will use this name. */
  @Input()
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    this._updateRadioButtonNames();
  }
  private _name = this._uniqueId;

  /**
   * Value for the radio-group. Should equal the value of the selected radio button if there is
   * a corresponding radio button with a matching value. If there is not such a corresponding
   * radio button, this value persists to be applied in case a new radio button is added with a
   * matching value.
   */
  @Input()
  get value(): unknown {
    return this._value;
  }
  set value(newValue: unknown) {
    if (this._value !== newValue) {
      // Set this before proceeding to ensure no circular loop occurs with selection.
      this._value = newValue;

      this._updateSelectedRadioFromValue();
      this._checkSelectedRadioButton();
    }
  }
  private _value: unknown = null;

  /**
   * The currently selected radio button. If set to a new radio button, the radio group value
   * will be updated to match the new selected button.
   */
  @Input()
  get selected(): RadioButtonComponent | null {
    return this._selected;
  }
  set selected(selected: RadioButtonComponent | null) {
    this._selected = selected;
    this.value = selected ? selected.value : null;
    this._checkSelectedRadioButton();
  }
  private _selected: RadioButtonComponent | null = null;

  /** Whether the radio group is disabled */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    this._markRadiosForCheck();
  }
  private _disabled = false;

  /** Whether the radio group is required */
  @Input({ transform: booleanAttribute })
  get required(): boolean {
    return this._required;
  }
  set required(value: boolean) {
    this._required = value;
    this._markRadiosForCheck();
  }
  private _required = false;

  @Output() readonly valueChange = new EventEmitter<unknown>();
  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  appFocusable = true;

  onChange = (value: unknown): void => {};
  onTouched = (): void => {};

  touched = false;

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  ngAfterContentInit(): void {
    // Mark this component as initialized in AfterContentInit because the initial value can
    // possibly be set by NgModel on AppRadioGroup, and it is possible that the OnInit of the
    // NgModel occurs *after* the OnInit of the AppRadioGroup.
    this._isInitialized = true;

    this._focusableRadios$
      .pipe(
        switchMap((radioButtons) => merge(...radioButtons.map((radioButton) => radioButton.focused))),
        takeUntil(this._destroy$),
      )
      .subscribe(() => this.elementFocus.emit());

    this._focusableRadios$
      .pipe(
        switchMap((radioButtons) => merge(...radioButtons.map((radioButton) => radioButton.blurred))),
        takeUntil(this._destroy$),
      )
      .subscribe(() => {
        const areAllRadiosNotFocused = this._focusableRadios.every((radioButton) => !radioButton.isFocused);

        if (areAllRadiosNotFocused) {
          this.elementBlur.emit();
        }
      });

    // Clear the `selected` button when it's destroyed since the tabindex of the rest of the
    // buttons depends on it. Note that we don't clear the `value`, because the radio button
    // may be swapped out with a similar one and there are some internal apps that depend on
    // that behavior.
    this.radioButtons.changes.pipe(startWith(null), takeUntil(this._destroy$)).subscribe(() => {
      this._setFocusableRadios();

      if (this.selected && !this.radioButtons.find((radio) => radio === this.selected)) {
        this._selected = null;
      }
    });
  }

  private _setFocusableRadios(): void {
    this._focusableRadios = this.radioButtons.toArray();
    this._focusableRadios$.next(this._focusableRadios);
  }

  focusItem(): void {
    const { disabled, radioButtons, value } = this;

    if (!disabled && !!radioButtons.length) {
      if (value) {
        radioButtons.find((radioButton) => radioButton.value === value)?.inputRadio?.nativeElement.focus();
      } else {
        radioButtons.first.inputRadio?.nativeElement.focus();
      }
    }
  }

  writeValue(value: unknown): void {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: unknown) => void): void {
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

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  emitChangeEvent(): void {
    if (this._isInitialized) {
      this.valueChange.emit(this._value);
    }
  }

  private _updateSelectedRadioFromValue(): void {
    // If the value already matches the selected radio, do nothing.
    const isAlreadySelected = this._selected !== null && this._selected.value === this._value;

    if (this.radioButtons && !isAlreadySelected) {
      this._selected = null;
      this.radioButtons.forEach((radio) => {
        radio.checked = this.value === radio.value;
        if (radio.checked) {
          this._selected = radio;
        }
      });
    }
  }

  private _checkSelectedRadioButton(): void {
    if (this._selected && !this._selected.checked) {
      this._selected.checked = true;
    }
  }

  private _markRadiosForCheck(): void {
    if (this.radioButtons) {
      this.radioButtons.forEach((radio) => radio.markForCheck());
    }
  }

  private _updateRadioButtonNames(): void {
    if (this.radioButtons) {
      this.radioButtons.forEach((radio) => {
        radio.name = this.name;
        radio.markForCheck();
      });
    }
  }
}
