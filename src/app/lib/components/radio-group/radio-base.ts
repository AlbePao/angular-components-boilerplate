import { UniqueSelectionDispatcher } from '@angular/cdk/collections';
import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  InjectionToken,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
  booleanAttribute,
  inject,
} from '@angular/core';
import { APP_RADIO_GROUP, RadioGroupDirective } from './radio-group.directive';

let nextUniqueId = 0;

export const APP_RADIO = new InjectionToken<RadioBase>('RadioBase');

@Directive({
  host: {
    class: 'inline-block',
  },
})
export class RadioBase implements OnInit, OnDestroy {
  private readonly _radioGroup = inject<RadioGroupDirective>(APP_RADIO_GROUP, { optional: true });
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _radioDispatcher = inject(UniqueSelectionDispatcher);

  private readonly _uniqueId = `app-radio-${++nextUniqueId}`;

  @ViewChild('inputRadio') inputRadio?: ElementRef<HTMLInputElement>;

  /** The unique ID for the radio button. */
  @Input() id: string = this._uniqueId;

  /** Analog to HTML 'name' attribute used to group radios for unique selection. */
  @Input() name = '';

  /** Used to set the 'aria-label' attribute on the underlying input element. */
  @Input('aria-label') ariaLabel: string | null = null;

  /** The 'aria-labelledby' attribute takes precedence as the element's text alternative. */
  @Input('aria-labelledby') ariaLabelledby: string | null = null;

  /** The 'aria-describedby' attribute is read after the element's label and field type. */
  @Input('aria-describedby') ariaDescribedby: string | null = null;

  /** Whether this radio button is checked. */
  @Input({ transform: booleanAttribute })
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    const isCheckedNewState = value;
    if (this._checked !== isCheckedNewState) {
      this._checked = isCheckedNewState;
      if (isCheckedNewState && this._radioGroup && this._radioGroup.value !== this.value) {
        this._radioGroup.selected = this;
      } else if (!isCheckedNewState && this._radioGroup && this._radioGroup.value === this.value) {
        // When unchecking the selected radio button, update the selected radio
        // property on the group.
        this._radioGroup.selected = null;
      }

      if (isCheckedNewState) {
        // Notify all radio buttons with the same name to un-check.
        this._radioDispatcher.notify(this.id, this.name);
      }
      this._changeDetectorRef.markForCheck();
    }
  }
  private _checked = false;

  /** The value of this radio button. */
  @Input()
  get value(): unknown {
    return this._value;
  }
  set value(value: unknown) {
    if (this._value !== value) {
      this._value = value;
      if (this._radioGroup !== null) {
        if (!this.checked) {
          // Update checked when the value changed to match the radio group's value
          this.checked = this._radioGroup.value === value;
        }
        if (this.checked) {
          this._radioGroup.selected = this;
        }
      }
    }
  }
  private _value: unknown = null;

  /** Whether the label should appear after or before the radio button. Defaults to 'after' */
  @Input()
  get labelPosition(): 'before' | 'after' {
    return this._labelPosition;
  }
  set labelPosition(value) {
    this._labelPosition = value;
  }
  private _labelPosition: 'before' | 'after' = 'after';

  /** Whether the radio button is disabled. */
  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled || !!this._radioGroup?.disabled;
  }
  set disabled(value: boolean) {
    this._setDisabled(value);
  }
  private _disabled = false;

  /** Whether the radio button is required. */
  @Input({ transform: booleanAttribute })
  get required(): boolean {
    return this._required || !!this._radioGroup?.required;
  }
  set required(value: boolean) {
    this._required = value;
  }
  private _required = false;

  @Output() readonly valueChange = new EventEmitter<unknown>();
  @Output() readonly focused = new EventEmitter<void>();
  @Output() readonly blurred = new EventEmitter<void>();

  /** Unregister function for _radioDispatcher */
  private _removeUniqueSelectionListener: () => void = () => {};

  /** ID of the native input element inside `<app-radio-button>` */
  get inputId(): string {
    return `${this.id || this._uniqueId}-input`;
  }

  get isFocused(): boolean {
    return this._isFocused;
  }
  set isFocused(isFocused: boolean) {
    this._isFocused = isFocused;
  }
  private _isFocused = false;

  ngOnInit(): void {
    if (this._radioGroup) {
      this.checked = this._radioGroup.value === this._value;

      if (this.checked) {
        this._radioGroup.selected = this;
      }

      // Copy name from parent radio group
      this.name = this._radioGroup.name;
    }

    this._removeUniqueSelectionListener = this._radioDispatcher.listen((id, name) => {
      if (id !== this.id && name === this.name) {
        this.checked = false;
      }
    });
  }

  ngOnDestroy(): void {
    this._removeUniqueSelectionListener();
  }

  onRadioFocus(): void {
    this.isFocused = true;
    this.focused.emit();
  }

  onRadioBlur(): void {
    this.isFocused = false;
    this.blurred.emit();
  }

  /**
   * Marks the radio button as needing checking for change detection.
   * This method is exposed because the parent radio group will directly
   * update bound properties of the radio button.
   */
  markForCheck(): void {
    // When group value changes, the button will not be notified. Use `markForCheck` to explicit
    // update radio button's status
    this._changeDetectorRef.markForCheck();
  }

  /** Triggered when the radio button receives an interaction from the user. */
  onInputInteraction(event: Event): void {
    // We always have to stop propagation on the change event.
    // Otherwise the change event, from the input element, will bubble up and
    // emit its event object to the `change` output.
    event.stopPropagation();

    if (!this.checked && !this.disabled) {
      const isGroupValueChanged = this._radioGroup && this.value !== this._radioGroup.value;
      this.checked = true;
      this._emitChangeEvent();

      if (this._radioGroup) {
        this._radioGroup.onChange(this._value);

        if (isGroupValueChanged) {
          this._radioGroup.emitChangeEvent();
        }
      }
    }
  }

  private _setDisabled(value: boolean): void {
    if (this._disabled !== value) {
      this._disabled = value;
      this._changeDetectorRef.markForCheck();
    }
  }

  private _emitChangeEvent(): void {
    this.valueChange.emit(this._value);
  }
}
