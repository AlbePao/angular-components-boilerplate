import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  inject,
} from '@angular/core';
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

  @Input() color: Colors = 'gray';
  @Input({ transform: booleanAttribute }) dismissable = false;

  @Output() readonly dismissed = new EventEmitter<void>();

  get bgColorClass(): string {
    if (this.color === 'info') {
      return 'bg-info-lighter';
    } else if (this.color === 'danger') {
      return 'bg-danger-lighter';
    } else if (this.color === 'success') {
      return 'bg-success-lighter';
    } else if (this.color === 'secondary') {
      return 'bg-secondary-lighter';
    } else if (this.color === 'primary') {
      return 'bg-primary-lighter';
    }

    return 'bg-gray-lighter';
  }

  get iconColorClass(): string {
    if (this.color === 'info') {
      return 'text-info-dark';
    } else if (this.color === 'danger') {
      return 'text-danger-dark';
    } else if (this.color === 'success') {
      return 'text-success-dark';
    } else if (this.color === 'secondary') {
      return 'text-secondary-dark';
    } else if (this.color === 'primary') {
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
