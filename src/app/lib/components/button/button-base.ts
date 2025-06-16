import { Directive, ElementRef, Input, booleanAttribute, inject } from '@angular/core';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';

@Directive({
  host: {
    '[attr.disabled]': 'isDisabled',
  },
})
export class ButtonBase {
  private readonly _elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

  @Input() size: ButtonSize = 'md';
  @Input({ transform: booleanAttribute }) disabled = false;

  get isDisabled(): true | null {
    return (!this.isAnchorTag && this.disabled) || null;
  }

  get hostElement(): HTMLButtonElement {
    return this._elementRef.nativeElement;
  }

  get isAnchorTag(): boolean {
    return this.hostElement.tagName.toLowerCase() === 'a';
  }

  get disabledClasses(): string {
    return this.isAnchorTag
      ? this.disabled
        ? 'opacity-50 pointer-events-none'
        : ''
      : 'disabled:cursor-default disabled:opacity-50 disabled:pointer-events-none';
  }
}
