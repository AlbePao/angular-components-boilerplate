import { ENTER } from '@angular/cdk/keycodes';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { getUniqueId } from '@lib/utils/getUniqueId';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideFocusableItem(CheckboxComponent), provideNgValueAccessor(CheckboxComponent)],
  host: {
    '[class]': 'classes',
    '(keydown)': 'toggleOnKeyDown($event)',
    '(click)': 'toggleOnClick($event)',
  },
})
export class CheckboxComponent<T> implements ControlValueAccessor, FocusableItem {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _hasInnerFocus = false;

  @ViewChild('inputCheckbox') inputCheckbox?: ElementRef<HTMLInputElement>;

  readonly labelPosition = input<'before' | 'after'>('after');

  @Input() id = getUniqueId('app-checkbox');

  value = input<T | null>(null);

  @Input({ transform: booleanAttribute })
  get checked(): boolean {
    return this._checked;
  }
  set checked(checked: boolean) {
    const isChecked = checked;

    if (isChecked !== this.checked) {
      this._checked = isChecked;
      this._changeDetectorRef.markForCheck();
    }
  }
  private _checked = false;

  @Input({ transform: booleanAttribute })
  get indeterminate(): boolean {
    return this._indeterminate;
  }
  set indeterminate(indeterminate: boolean) {
    this._indeterminate = indeterminate;
    this._syncIndeterminate(this._indeterminate);
  }
  private _indeterminate = false;

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    const disabledNewValue = disabled;

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

  @Output() readonly valueChange = new EventEmitter<boolean | null>();
  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  get classes(): string {
    const flexRowClass = this.labelPosition() === 'after' ? 'flex-row' : 'flex-row-reverse';
    const disabledClass = this.disabled ? 'opacity-50' : 'cursor-pointer';

    return `inline-flex min-h-[40px] items-center gap-3 text-base/5 font-semibold ${flexRowClass} ${disabledClass}`;
  }

  onChange = (value: boolean | null): void => {};
  onTouched = (): void => {};

  required = true;
  touched = false;
  readonly shouldPreventNextItemFocus = true;

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  protected toggleOnKeyDown(event: KeyboardEvent): void {
    if (event.keyCode === ENTER) {
      this._toggleChange();
    }
  }

  protected toggleOnClick(event: MouseEvent): void {
    // If user clicks on checkbox, this observable (which is bound to host element) is triggered twice, so
    // we must prevent its emission and consequent double toggle by checking if user has clicked on checkbox
    const inputCheckbox = this.inputCheckbox?.nativeElement;
    const clickTarget = event.target as HTMLElement;
    const isNotOrigin = clickTarget !== inputCheckbox;

    if (isNotOrigin) {
      this._toggleChange();
    }
  }

  focusItem(): void {
    if (!this.disabled && !!this.inputCheckbox) {
      this.inputCheckbox.nativeElement.focus();
    }
  }

  protected changeInnerFocus(isFocused: boolean): void {
    if (isFocused !== this._hasInnerFocus) {
      this._hasInnerFocus = isFocused;

      if (this._hasInnerFocus) {
        this.elementFocus.emit();
      } else {
        this.markAsTouched();
        this.elementBlur.emit();
      }
    }
  }

  writeValue(value: boolean | null): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean | null) => void): void {
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
  }

  onChangeEvent(event: Event): void {
    event.stopPropagation();
    this._toggleChange();
  }

  private _toggleChange(): void {
    this.markAsTouched();

    if (!this.disabled) {
      this.checked = !this.checked;
      this.focusItem();
      this.onChange(this.checked);
      this.valueChange.emit(this.checked);
    }
  }

  private _syncIndeterminate(value: boolean): void {
    const nativeCheckbox = this.inputCheckbox;

    if (nativeCheckbox) {
      nativeCheckbox.nativeElement.indeterminate = value;
    }
  }
}
