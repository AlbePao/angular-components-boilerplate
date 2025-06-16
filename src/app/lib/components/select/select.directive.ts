import {
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { FocusableItem, provideFocusableItem } from '@lib/providers/focusable-item';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { fromEvent, merge, takeUntil, tap } from 'rxjs';

let nextUniqueId = 0;

@Directive({
  selector: 'select[appSelect]',
  providers: [provideFocusableItem(SelectDirective)],
  host: {
    '[class]': 'classes',
    '[attr.id]': 'selectId',
    '[attr.appFocusable]': 'appFocusable',
    'attr.placeholder': ' ',
    '[attr.disabled]': 'isDisabled',
  },
})
export class SelectDirective implements FocusableItem, OnInit, DoCheck {
  private readonly _ngControl = inject(NgControl, { self: true, optional: true });
  private readonly _elementRef = inject<ElementRef<HTMLSelectElement>>(ElementRef);
  private readonly _destroy$ = injectDestroy();

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id = `app-select-${nextUniqueId++}`;

  @Input({ transform: booleanAttribute }) disabled = false;

  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  get classes(): string {
    const borderColorClasses = this.invalid
      ? 'border-danger focus:border-danger focus:ring-danger/40'
      : 'border-gray-darker placeholder-shown:border-gray focus:border-primary focus:ring-primary/40';

    return `block min-h-[40px] pl-2.5 pr-8 w-full text-sm text-black rounded-sm border appearance-none focus:ring-4 focus:ring-offset-0 peer select-none disabled:bg-gray-lighter disabled:opacity-50 ${borderColorClasses}`;
  }

  get selectId(): string | null {
    return this.id || null;
  }

  appFocusable = true;

  get isDisabled(): true | null {
    return this.disabled || null;
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

  ngOnInit(): void {
    merge(
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
}
