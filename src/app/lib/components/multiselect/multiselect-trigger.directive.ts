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
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewContainerRef,
  booleanAttribute,
  inject,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { Observable, filter, fromEvent, merge, of, take, takeUntil, tap } from 'rxjs';
import { FlatMultiselectOption, MultiselectComponent } from './multiselect.component';

const ESCAPE_KEYS = [LEFT_ARROW, RIGHT_ARROW, CONTROL, SHIFT];

@Directive({
  selector: 'input[appMultiselect]',
  standalone: true,
  providers: [provideFocusableItem(MultiselectTriggerDirective), provideNgValueAccessor(MultiselectTriggerDirective)],
})
export class MultiselectTriggerDirective<T> implements ControlValueAccessor, FocusableItem, OnInit {
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _overlay = inject(Overlay);
  private readonly _document = inject(DOCUMENT);
  private readonly _destroy$ = injectDestroy();

  private _overlayRef: OverlayRef | null = null;
  private _focusedByUser = false;
  private _focusedByDirective = false;

  @Input({ required: true }) appMultiselect!: MultiselectComponent<T>;
  @Input({ transform: booleanAttribute }) appMultiselectDisabled = false;

  @Output() readonly valueChange = new EventEmitter<T[] | null>();
  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  @HostBinding('attr.appFocusable') appFocusable = true;

  @HostBinding('attr.role')
  get role(): 'combobox' | null {
    return this.appMultiselectDisabled ? null : 'combobox';
  }

  @HostListener('focus')
  handleFocus(): void {
    this.elementFocus.emit();
    this._focusedByUser = true;

    if (this._canOpen()) {
      this.openPanel();
    }
  }

  @HostListener('blur')
  handleBlur(): void {
    this.elementBlur.emit();
    this.onTouched();
    this._focusedByUser = false;
    this._focusedByDirective = false;
  }

  @HostListener('keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    const { keyCode } = event;
    const isDownArrowKey = keyCode === DOWN_ARROW;
    const isUpArrowKey = keyCode === UP_ARROW;
    const isEscapeKey = keyCode === ESCAPE;
    const isEnterKey = keyCode === ENTER;
    const isTabKey = keyCode === TAB;

    event.preventDefault();

    if (ESCAPE_KEYS.includes(keyCode)) {
      return;
    }

    if (isTabKey || isEscapeKey) {
      this.closePanel();
    }

    if (this.isPanelOpen) {
      if (isDownArrowKey) {
        this.appMultiselect.focusNextOption();
      } else if (isUpArrowKey) {
        this.appMultiselect.focusPrevOption();
      } else if (isEnterKey) {
        const { options, optionIndex } = this.appMultiselect;
        const option = options[optionIndex];

        if (option) {
          this.appMultiselect.toggleSelection(option, optionIndex);
          this._emitSelection();
        }
      }
    } else if (!this.isPanelOpen && !(isTabKey || isEscapeKey)) {
      this.openPanel();
    }
  }

  @HostListener('click')
  handleClick(): void {
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

  get inputValue(): string {
    return this.hostElement.value;
  }
  private set _inputValue(inputValue: string) {
    this.hostElement.value = inputValue;
  }

  get id(): string {
    return this.hostElement.id;
  }

  get value(): T[] | null {
    return this._value;
  }
  private _value: T[] | null = null;

  get disabled(): boolean {
    return this.hostElement.disabled;
  }

  onChange = (value: T[] | null): void => {};
  onTouched = (): void => {};

  get required(): boolean {
    return this.hostElement.required;
  }

  get shouldPreventNextItemFocus(): boolean {
    return this.isPanelOpen;
  }

  ngOnInit(): void {
    merge(
      // Sync updated multiselect options with current value
      this.appMultiselect.optionsUpdated$.pipe(tap(() => this.writeValue(this.value))),
      this.appMultiselect.selectionChange.pipe(tap(() => this._emitSelection())),
    )
      .pipe(takeUntil(this._destroy$))
      .subscribe();
  }

  focusItem(): void {
    if (!this.disabled) {
      this._focusedByDirective = true;
      this.hostElement.focus();
    }
  }

  writeValue(value: T[] | null): void {
    const selectedOptions = value
      ? this.appMultiselect.options.filter((option) => value.includes(option.value) && !option.disabled)
      : [];

    this._value = value;
    this.appMultiselect.selectValues(selectedOptions);
    this._inputValue = this._getOptionsLabel(selectedOptions);

    if (!value) {
      this.appMultiselect.clearSelection();
    }
  }

  registerOnChange(fn: (value: T[] | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(disabled: boolean): void {
    this.hostElement.disabled = disabled;
  }

  openPanel(): void {
    this._attachOverlay();
  }

  closePanel(): void {
    if (!this._overlayAttached) {
      return;
    }

    if (this.isPanelOpen) {
      this.appMultiselect.closed.emit();
    }

    this._overlayAttached = false;

    if (this._overlayRef?.hasAttached()) {
      this._overlayRef.detach();
      this._overlayRef = null;
      this.appMultiselect.panel = null;
    }
  }

  private _emitSelection(): void {
    const selectedValues = this.appMultiselect.selectedValues;

    if (!this.disabled) {
      this._value = selectedValues.map((option) => option.value);
      this._inputValue = this._getOptionsLabel(selectedValues);

      this.onChange(this.value);
      this.valueChange.emit(this.value);
      this.onTouched();
    }
  }

  private _canOpen(): boolean {
    if (this._focusedByDirective) {
      // The appMultiselect trigger directive was focused by FormFocusHandler directive, so we cannot open the panel
      this._focusedByDirective = false;
      return false;
    }

    const { hostElement, appMultiselectDisabled } = this;
    return !hostElement.readOnly && !hostElement.disabled && !appMultiselectDisabled;
  }

  private _attachOverlay(): void {
    if (!this.appMultiselect) {
      throw new Error('MultiselectTriggerDirective: missing related app-multiselect component');
    }

    let portal: TemplatePortal | null = null;
    let overlayRef = this._overlayRef;

    if (!overlayRef) {
      portal = new TemplatePortal(this.appMultiselect.template, this._viewContainerRef);
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
      this.appMultiselect.panel = this._document.getElementById(this.appMultiselect.id);
      this._subscribeToClosingActions();
    }

    const wasOpen = this.isPanelOpen;

    this._overlayAttached = true;

    if (this.isPanelOpen && wasOpen !== this.isPanelOpen) {
      this.appMultiselect.opened.emit();
    }
  }

  private _subscribeToClosingActions(): void {
    merge(
      this._getOutsideClickStream(),
      this._overlayRef ? this._overlayRef.detachments().pipe(filter(() => this._overlayAttached)) : of(),
    )
      .pipe(take(1))
      .subscribe(() => {
        this.closePanel();
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

  private _getOptionsLabel(options: FlatMultiselectOption<T>[]): string {
    return options.map((option) => option.label).join(', ');
  }
}
