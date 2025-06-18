import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Colors } from '@lib/types/colors';
import { ButtonBase } from './button-base';

export type RoundedButtonColor = Colors | 'base';

@Component({
  selector: 'button[app-rounded-button], a[app-rounded-button]',
  templateUrl: './button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]':
      '`inline-flex gap-2 flex-row flex-nowrap min-w-max items-center justify-center relative w-auto rounded-full font-semibold no-underline select-none text-base text-center ${colorClasses} ${sizeClasses} ${disabledClasses}`',
  },
})
export class RoundedButtonComponent extends ButtonBase {
  @Input() color: RoundedButtonColor = 'base';

  get colorClasses(): string {
    const { color } = this;

    if (color === 'gray') {
      return 'text-gray-dark bg-gray-lighter hover:bg-gray-light';
    } else if (color === 'info') {
      return 'text-info-dark bg-info-lighter hover:bg-info-light';
    } else if (color === 'danger') {
      return 'text-danger-dark bg-danger-lighter hover:bg-danger-light';
    } else if (color === 'success') {
      return 'text-success-dark bg-success-lighter hover:bg-success-light';
    } else if (color === 'secondary') {
      return 'text-secondary-dark bg-secondary-lighter hover:bg-secondary-light';
    } else if (color === 'primary') {
      return 'text-primary-dark bg-primary-lighter hover:bg-primary-light';
    }

    return 'text-white bg-black hover:bg-gray-darker';
  }

  get sizeClasses(): string {
    const { size } = this;

    if (size === 'xs') {
      return 'h-6 p-0.5';
    } else if (size === 'sm') {
      return 'h-8 p-1';
    } else if (size === 'md') {
      return 'h-10 p-3';
    }

    return 'h-12 p-3';
  }
}
