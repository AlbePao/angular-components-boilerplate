import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, inject } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-chip',
  imports: [ButtonModule, IconComponent],
  templateUrl: './chip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class:
      'inline-flex flex-row flex-nowrap min-w-max items-center justify-center relative w-auto font-semibold no-underline select-none text-primary rounded-full border border-gray h-10 p-3 pr-1 gap-2',
  },
})
export class ChipComponent<T> {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  @Input() value: T | null = null;

  @Output() readonly removed = new EventEmitter<T | null>();

  remove(): void {
    this.removed.emit(this.value);
    this._elementRef.nativeElement.remove();
  }
}
