import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';
import { Colors } from '@lib/types/colors';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
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

  get progressBarColor(): string {
    const { color } = this;

    if (color === 'primary') {
      return 'bg-primary-lighter';
    } else if (color === 'secondary') {
      return 'bg-secondary-lighter';
    } else if (color === 'success') {
      return 'bg-success-lighter';
    } else if (color === 'danger') {
      return 'bg-danger-lighter';
    } else if (color === 'info') {
      return 'bg-info-lighter';
    }

    return 'bg-gray-lighter';
  }

  get progressBarBgColor(): string {
    const { color } = this;

    if (color === 'primary') {
      return 'bg-primary';
    } else if (color === 'secondary') {
      return 'bg-secondary';
    } else if (color === 'success') {
      return 'bg-success';
    } else if (color === 'danger') {
      return 'bg-danger';
    } else if (color === 'info') {
      return 'bg-info';
    }

    return 'bg-gray-darker';
  }
}
