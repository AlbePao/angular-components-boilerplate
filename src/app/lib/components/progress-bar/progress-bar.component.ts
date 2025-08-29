import { ChangeDetectionStrategy, Component, input, numberAttribute } from '@angular/core';
import { Colors } from '@lib/types/colors';

function progressBarTransform(value: unknown): number {
  return Math.min(100, Math.max(0, numberAttribute(value)));
}

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class ProgressBarComponent {
  readonly color = input<Colors>();
  readonly value = input(0, { transform: progressBarTransform });

  get progressBarColor(): string {
    const color = this.color();

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
    const color = this.color();

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
