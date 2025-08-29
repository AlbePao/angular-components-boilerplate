import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Colors } from '@lib/types/colors';

export type PillSize = 'sm' | 'md' | 'lg';

export type PillAppearance = 'fill' | 'outline';

@Component({
  selector: 'app-pill',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]':
      '`inline-flex justify-content items-center select-none whitespace-nowrap rounded-full ${sizeClasses} ${colorClasses}`',
  },
})
export class PillComponent {
  readonly appearance = input<PillAppearance>('fill');
  readonly size = input<PillSize>('sm');
  readonly color = input<Colors>('gray');

  get sizeClasses(): string {
    const size = this.size();

    if (size === 'sm') {
      return 'h-5 px-2 gap-1 text-xs font-bold [&>app-icon]:text-sm/none';
    } else if (size === 'md') {
      return 'h-8 px-3 gap-2 text-sm/none font-medium [&>app-icon]:text-xl/none';
    }

    return 'h-10 px-4 gap-2 text-sm/none font-semibold [&>app-icon]:text-xl/none';
  }

  get colorClasses(): string {
    const appearance = this.appearance();
    const color = this.color();

    if (appearance === 'outline') {
      if (color === 'primary') {
        return 'box-border border text-primary border-primary';
      } else if (color === 'secondary') {
        return 'box-border border text-secondary border-secondary';
      } else if (color === 'success') {
        return 'box-border border text-success-dark border-success';
      } else if (color === 'danger') {
        return 'box-border border text-danger-dark border-danger';
      } else if (color === 'info') {
        return 'box-border border text-info-dark border-info';
      }

      return 'box-border border text-gray-darker border-gray';
    }

    if (color === 'primary') {
      return 'text-primary bg-primary-lighter';
    } else if (color === 'secondary') {
      return 'text-secondary bg-secondary-lighter';
    } else if (color === 'success') {
      return 'text-success-dark bg-success-lighter';
    } else if (color === 'danger') {
      return 'text-danger-dark bg-danger-lighter';
    } else if (color === 'info') {
      return 'text-info-dark bg-info-lighter';
    }

    return 'text-gray-darker bg-gray-lighter';
  }
}
