import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';

// Based on https://github.com/shhdharmen/angular-date-input-directive
@Directive({
  selector: 'input[type=date][formControlName], input[type=date][formControl], input[type=date][ngModel]',
  standalone: true,
  providers: [provideNgValueAccessor(InputDateIsoDirective)],
})
export class InputDateIsoDirective implements ControlValueAccessor {
  private readonly _renderer = inject(Renderer2);
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  @HostListener('input', ['$event.target.valueAsDate']) onInput = (date?: Date): void => {
    const isoString = date ? date.toISOString() : null;
    this.onChange(isoString);
  };
  onChange = (value: string | null): void => {};

  @HostListener('blur', []) onTouched = (): void => {};

  writeValue(isoString?: string): void {
    const date = isoString ? new Date(isoString) : null;
    this._renderer.setProperty(this._elementRef.nativeElement, 'valueAsDate', date);
  }

  registerOnChange(fn: (_: string | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._renderer.setProperty(this._elementRef.nativeElement, 'disabled', isDisabled);
  }
}
