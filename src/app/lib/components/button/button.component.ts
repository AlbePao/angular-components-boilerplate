import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { ButtonBase } from './button-base';

export type ButtonAppearance = 'primary' | 'secondary' | 'outline' | 'link' | 'danger' | 'success';

@Component({
  // We disable the eslint rule because of https://angular.io/guide/styleguide#style-05-03
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[app-button], a[app-button]',
  standalone: true,
  templateUrl: './button-base.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent extends ButtonBase {
  @Input() appearance: ButtonAppearance = 'primary';

  @HostBinding('class')
  get classes(): string {
    return `inline-flex flex-row flex-nowrap min-w-max items-center justify-center relative w-auto font-semibold no-underline select-none text-center ${this.appearanceClasses} ${this.sizeClasses} ${this.disabledClasses}`;
  }

  get appearanceClasses(): string {
    if (this.appearance === 'link') {
      return 'text-primary';
    } else if (this.appearance === 'outline') {
      return 'text-primary box-border border border-solid border-gray hover:border-primary disabled:bg-gray-lighter';
    } else if (this.appearance === 'secondary') {
      return 'text-primary bg-primary-lighter hover:text-white hover:bg-primary-dark';
    } else if (this.appearance === 'danger') {
      return 'text-danger bg-danger-lighter hover:text-white hover:bg-danger-dark';
    } else if (this.appearance === 'success') {
      return 'text-success bg-success-lighter hover:text-white hover:bg-success-dark';
    }

    return 'text-white bg-primary hover:bg-primary-dark';
  }

  get sizeClasses(): string {
    if (this.size === 'xs') {
      return 'rounded h-6 p-0.5 text-sm gap-1';
    } else if (this.size === 'sm') {
      return 'rounded h-8 p-1 text-sm gap-1';
    } else if (this.size === 'md') {
      return 'rounded h-10 p-3 text-sm gap-2';
    }

    return 'rounded h-12 p-3 text-base gap-2';
  }
}
