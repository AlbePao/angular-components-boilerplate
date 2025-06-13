import { ChangeDetectionStrategy, Component, HostBinding, Input, numberAttribute } from '@angular/core';
import { Colors } from '@lib/types/colors';

@Component({
  selector: 'app-progress-bar',
  standalone: true,
  templateUrl: './progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarComponent {
  @Input() color?: Colors;

  @Input({ transform: numberAttribute })
  get value(): number {
    return this._value;
  }
  set value(value: number) {
    this._value = Math.max(0, Math.min(100, value));
  }
  private _value = 0;

  @HostBinding('class') classes = 'block';

  get progressBarColor(): string {
    if (this.color === 'primary') {
      return 'bg-primary-lighter';
    } else if (this.color === 'secondary') {
      return 'bg-secondary-lighter';
    } else if (this.color === 'success') {
      return 'bg-success-lighter';
    } else if (this.color === 'danger') {
      return 'bg-danger-lighter';
    } else if (this.color === 'info') {
      return 'bg-info-lighter';
    }

    return 'bg-gray-lighter';
  }

  get progressBarBgColor(): string {
    if (this.color === 'primary') {
      return 'bg-primary';
    } else if (this.color === 'secondary') {
      return 'bg-secondary';
    } else if (this.color === 'success') {
      return 'bg-success';
    } else if (this.color === 'danger') {
      return 'bg-danger';
    } else if (this.color === 'info') {
      return 'bg-info';
    }

    return 'bg-gray-darker';
  }
}
