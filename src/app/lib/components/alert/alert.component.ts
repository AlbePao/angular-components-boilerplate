import { ChangeDetectionStrategy, Component, ElementRef, booleanAttribute, inject, input, output } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { Colors } from '@lib/types/colors';

@Component({
  selector: 'app-alert',
  imports: [ButtonModule, IconComponent],
  templateUrl: './alert.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`flex rounded-sm p-5 ${bgColorClass}`',
  },
})
export class AlertComponent {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly color = input<Colors>('gray');
  readonly dismissable = input(false, { transform: booleanAttribute });

  readonly dismissed = output<void>();

  get bgColorClass(): string {
    const color = this.color();

    if (color === 'info') {
      return 'bg-info-lighter';
    } else if (color === 'danger') {
      return 'bg-danger-lighter';
    } else if (color === 'success') {
      return 'bg-success-lighter';
    } else if (color === 'secondary') {
      return 'bg-secondary-lighter';
    } else if (color === 'primary') {
      return 'bg-primary-lighter';
    }

    return 'bg-gray-lighter';
  }

  get iconColorClass(): string {
    const color = this.color();

    if (color === 'info') {
      return 'text-info-dark';
    } else if (color === 'danger') {
      return 'text-danger-dark';
    } else if (color === 'success') {
      return 'text-success-dark';
    } else if (color === 'secondary') {
      return 'text-secondary-dark';
    } else if (color === 'primary') {
      return 'text-primary-dark';
    }

    return 'text-black';
  }

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  protected dismiss(): void {
    this.hostElement.remove();
    this.dismissed.emit();
  }
}
