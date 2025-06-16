import {
  CONTROL,
  DOWN_ARROW,
  ENTER,
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  SHIFT,
  TAB,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  EventEmitter,
  Injector,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
  booleanAttribute,
  inject,
  numberAttribute,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, ValidationErrors, Validator } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { provideNgValidators } from '@lib/providers/ng-validators';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { Option, OptionExtra } from '@lib/types/option';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Observable, filter, fromEvent, map, merge, of, take, takeUntil } from 'rxjs';
import { InputDirective } from '../input';
import { AutocompleteComponent } from './autocomplete.component';

const ESCAPE_KEYS = [LEFT_ARROW, RIGHT_ARROW, CONTROL, SHIFT];

export const AUTOCOMPLETE_INPUT_INVALID = 'autocompleteInputInvalid';

@Directive({
  selector: 'input[appAutocomplete]',
  providers: [
    provideFocusableItem(AutocompleteTriggerDirective),
    provideNgValueAccessor(AutocompleteTriggerDirective),
    provideNgValidators(AutocompleteTriggerDirective),
  ],
  host: {
    '[attr.appFocusable]': 'appFocusable',
    '[attr.role]': 'appAutocompleteDisabled ? null : "combobox"',
    '(focus)': 'handleFocus()',
    '(blur)': 'handleBlur()',
    '(keydown)': 'handleKeyDown($event)',
    '(keyup)': 'handleKeyUp($event)',
    '(click)': 'handleClick()',
  },
})
export class AutocompleteTriggerDirective<T, E extends OptionExtra = never>
  implements ControlValueAccessor, Validator, FocusableItem, OnInit
{
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _overlay = inject(Overlay);
  private readonly _document = inject(DOCUMENT);
  private readonly _injector = inject(Injector);
  private readonly _translateService = inject(TranslateService);
  private readonly _destroy$ = injectDestroy();

  private _input: InputDirective | null = null;
  private _overlayRef: OverlayRef | null = null;
  private _focusedByUser = false;
  private _focusedByFocusHandlerDirective = false;

  @Input({ required: true }) appAutocomplete!: AutocompleteComponent<T, E>;
  @Input({ transform: booleanAttribute }) appAutocompleteDisabled = false;
  @Input({ transform: numberAttribute }) appAutocompleteSearchAfterChars = -1;

  @Output() readonly valueChange = new EventEmitter<T | null>();
  @Output() readonly inputChange = new EventEmitter<string>();
  @Output() readonly extrasChange = new EventEmitter<E | null>();
  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  appFocusable = true;

  protected handleFocus(): void {
    this.elementFocus.emit();
    this.hostElement.select();
    this._focusedByUser = true;

    if (this._canOpen()) {
      this.openPanel();
    }
  }

  protected handleBlur(): void {
    this.elementBlur.emit();
    this.onTouched();
    this._focusedByUser = false;
    this._focusedByFocusHandlerDirective = false;
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    const { filteredOptions } = this.appAutocomplete;
    const { keyCode } = event;
    const isDownArrowKey = keyCode === DOWN_ARROW;
    const isUpArrowKey = keyCode === UP_ARROW;
    const isEscapeKey = keyCode === ESCAPE;
    const isEnterKey = keyCode === ENTER;
    const isTabKey = keyCode === TAB;

    if (ESCAPE_KEYS.includes(keyCode)) {
      return;
    }

    if (isEscapeKey) {
      this.closePanel();
    }

    if (this.isPanelOpen) {
      if (isDownArrowKey) {
        event.preventDefault();
        this.hostElement.select();
        this.appAutocomplete.highlightNextOption();
      } else if (isUpArrowKey) {
        event.preventDefault();
        this.hostElement.select();
        this.appAutocomplete.highlightPrevOption();
      } else if (isEnterKey || isTabKey) {
        if (isEnterKey) {
          event.preventDefault();
        }

        const { value } = filteredOptions[this.appAutocomplete.optionIndex] ?? {
          value: null,
        };

        this._setValueFromOption(value);
      }
    } else if (!this.isPanelOpen && !(isTabKey || isEscapeKey)) {
      this.openPanel();
    }
  }

  protected handleKeyUp(event: KeyboardEvent): void {
    const { keyCode, target } = event;
    const isArrowKey = keyCode === UP_ARROW || keyCode === DOWN_ARROW;
    const isTabKey = keyCode === TAB;

    if (ESCAPE_KEYS.includes(keyCode)) {
      return;
    }

    if (this.isPanelOpen && !isArrowKey && !isTabKey) {
      this._setValueFromInput((target as HTMLInputElement).value);
    }
  }

  protected handleClick(): void {
    if (this._canOpen() && !this.isPanelOpen) {
      this.openPanel();
    }
  }

  get isPanelOpen(): boolean {
    return this._overlayAttached;
  }
  private _overlayAttached = false;

  get hostElement(): HTMLInputElement {
    return this._elementRef.nativeElement;
  }

  get id(): string {
    return this.hostElement.id;
  }

  get inputValue(): string {
    return this.hostElement.value;
  }
  private set _inputValue(inputValue: string) {
    this.hostElement.value = inputValue;
  }

  get value(): T | null {
    return this._value;
  }
  private _value: T | null = null;

  get disabled(): boolean {
    return this.hostElement.disabled;
  }

  onChange = (value: T | null): void => {};
  onTouched = (): void => {};

  get required(): boolean {
    return this.hostElement.required;
  }

  get shouldPreventNextItemFocus(): boolean {
    return this.isPanelOpen;
  }

  ngOnInit(): void {
    this._input = this._injector.get(InputDirective);

    this._listenToUpdatedOptions();
  }

  _listenToUpdatedOptions(): void {
    this.appAutocomplete.optionsUpdated$.pipe(takeUntil(this._destroy$)).subscribe(() => {
      if (this.value) {
        // Sync updated autocomplete options with current value
        const optionValue = this._findOptionValue(this.value, 'value');
        const translatedLabel = this._getOptionTranslation(optionValue?.label);
        this._inputValue = translatedLabel ?? '';
        this.onChange(this.value);
        this.valueChange.emit(this.value);
        this.extrasChange.emit(optionValue?.extra);
        this.elementBlur.emit();
      }
    });
  }

  focusItem(): void {
    if (!this.disabled) {
      this._focusedByFocusHandlerDirective = true;
      this.hostElement.focus();
    }
  }

  validate(control: AbstractControl<T | null>): ValidationErrors | null {
    return control.value === null && !!this.inputValue
      ? {
          [AUTOCOMPLETE_INPUT_INVALID]: true,
        }
      : null;
  }

  writeValue(value: T | null): void {
    const optionValue = this._findOptionValue(value, 'value');
    const translatedLabel = this._getOptionTranslation(optionValue?.label);
    this._value = value;
    this._inputValue = translatedLabel ?? '';

    this.appAutocomplete.filteredOptions = this.appAutocomplete.options;
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.hostElement.disabled = disabled;
  }

  openPanel(): void {
    // Panel should display all options at panel open, user will filter them lately
    this.appAutocomplete.filteredOptions = this.appAutocomplete.options;

    this._attachOverlay();
  }

  closePanel(): void {
    if (!this._overlayAttached) {
      return;
    }

    if (this.isPanelOpen) {
      this.appAutocomplete.closed.emit();
    }

    this._overlayAttached = false;

    if (this._overlayRef?.hasAttached()) {
      this._overlayRef.detach();
      this._overlayRef = null;
      this.appAutocomplete.panel = null;
    }
  }

  private _setValueFromOption(value: T | null): void {
    const optionValue = this._findOptionValue(value, 'value');

    if (!this.disabled && !!optionValue && !optionValue.disabled) {
      this.appAutocomplete.filteredOptions = [optionValue];
      this.appAutocomplete.optionIndex = 0;
      this._setValue(optionValue);
    }

    this.closePanel();
  }

  private _setValueFromInput(value: string): void {
    const optionValue = this._findOptionValue(value, 'label');

    if (!this.disabled) {
      this.appAutocomplete.filteredOptions = this.appAutocomplete.options.filter((option) => {
        if (option.disabled) {
          return false;
        }

        const isKeyMatching = option.value?.toString().toLowerCase().includes(value.toLowerCase());
        const isTextMatching = option.label.toLowerCase().includes(value.toLowerCase());

        return isKeyMatching ?? isTextMatching;
      });

      this.appAutocomplete.optionIndex = 0;
      this._setValue(optionValue, value);
      this.inputChange.emit(value);
    }
  }

  private _findOptionValue(searchValue: T | string | null, searchBy: 'value' | 'label'): Option<T, E> | null {
    return (
      this.appAutocomplete.options.find(
        (option) =>
          (searchBy === 'value' && option.value === searchValue) ||
          (searchBy === 'label' && option.label === searchValue),
      ) ?? null
    );
  }

  private _setValue(optionValue: Option<T, E> | null, fallback = ''): void {
    const { extra } = optionValue ?? { extra: null };
    const translatedLabel = this._getOptionTranslation(optionValue?.label);
    this._value = optionValue?.value ?? null;
    this._inputValue = translatedLabel ?? fallback;

    this.onChange(this.value);
    this.valueChange.emit(this.value);
    this.extrasChange.emit(extra);
    this.onTouched();
  }

  private _canOpen(): boolean {
    if (this._focusedByFocusHandlerDirective) {
      // The appAutocomplete trigger directive was focused by FormFocusHandler directive, so we cannot open the panel
      this._focusedByFocusHandlerDirective = false;
      return false;
    }

    // If appAutocompleteSearchAfterChars length is more than 0, wait user to enters at least that number of characters to open panel
    const { hostElement, appAutocompleteDisabled, appAutocompleteSearchAfterChars } = this;

    return (
      !hostElement.readOnly &&
      !hostElement.disabled &&
      hostElement.value.length > appAutocompleteSearchAfterChars &&
      !appAutocompleteDisabled
    );
  }

  private _attachOverlay(): void {
    if (!this.appAutocomplete) {
      throw new Error('AutocompleteTriggerDirective: missing related app-autocomplete component');
    }

    let portal: TemplatePortal | null = null;
    let overlayRef = this._overlayRef;

    if (!overlayRef) {
      portal = new TemplatePortal(this.appAutocomplete.template, this._viewContainerRef);
      overlayRef = this._overlay.create({
        minWidth: getComputedStyle(this.hostElement).width,
        maxHeight: 248,
        scrollStrategy: this._overlay.scrollStrategies.reposition(),
        positionStrategy: this._getPositionStrategy(),
      });

      this._overlayRef = overlayRef;
    }

    if (portal && overlayRef && !overlayRef.hasAttached()) {
      overlayRef.attach(portal);
      this.appAutocomplete.panel = this._document.getElementById(this.appAutocomplete.id);
      this.appAutocomplete.scrollToValueOption(this.value);
      this._subscribeToClosingActions();
    }

    const wasOpen = this.isPanelOpen;

    this._overlayAttached = true;

    if (this.isPanelOpen && wasOpen !== this.isPanelOpen) {
      this.appAutocomplete.opened.emit();
    }
  }

  private _subscribeToClosingActions(): void {
    merge(
      this.appAutocomplete.optionChange,
      this._getOutsideClickStream().pipe(map(() => null)),
      this._overlayRef
        ? this._overlayRef.detachments().pipe(
            filter(() => this._overlayAttached),
            map(() => null),
          )
        : of(null),
    )
      .pipe(take(1))
      .subscribe((value) => {
        this._setValueFromOption(value);
      });
  }

  private _getPositionStrategy(): FlexibleConnectedPositionStrategy {
    const positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'bottom',
        overlayX: 'start',
        overlayY: 'top',
        offsetY: 8,
      },
      {
        originX: 'end',
        originY: 'bottom',
        overlayX: 'end',
        overlayY: 'top',
        offsetY: 8,
      },
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'bottom',
        offsetY: -8,
      },
      {
        originX: 'end',
        originY: 'top',
        overlayX: 'end',
        overlayY: 'bottom',
        offsetY: -8,
      },
    ];

    return this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withPositions(positions)
      .withFlexibleDimensions(true)
      .withPush(false);
  }

  private _getOutsideClickStream(): Observable<MouseEvent | TouchEvent> {
    return merge(
      fromEvent<MouseEvent>(this._document, 'click'),
      fromEvent<MouseEvent>(this._document, 'auxclick'),
      fromEvent<TouchEvent>(this._document, 'touchend'),
    ).pipe(
      filter(({ target }) => {
        if (this._focusedByUser) {
          // The input field was focused by user, so this observable should not be triggered
          this._focusedByUser = false;
          return false;
        }

        const overlayRef = this._overlayRef;
        const origin = this.hostElement;
        const clickTarget = target as HTMLElement;
        const isNotOrigin = clickTarget !== origin;
        const isNotOverlay = !!overlayRef && overlayRef.overlayElement.contains(clickTarget) === false;

        return isNotOrigin && isNotOverlay;
      }),
    );
  }

  private _getOptionTranslation(label?: string): string | null {
    return label ? (this._translateService.instant(label) as string) : null;
  }
}
