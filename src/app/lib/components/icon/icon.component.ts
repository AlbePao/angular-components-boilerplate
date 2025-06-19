import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { Colors } from '@lib/types/colors';

export type IconColors = Colors | 'black';

@Component({
  selector: 'app-icon',
  template: `<ng-content />`,
  styleUrl: './icon.component.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`${iconAppearance} ${iconColor} app-icon select-none relative`',
  },
})
export class IconComponent {
  @Input() color?: IconColors;
  @Input() appearance: 'normal' | 'outlined' = 'outlined';

  get iconColor(): string {
    const { color } = this;

    if (color === 'primary') {
      return 'text-primary';
    } else if (color === 'secondary') {
      return 'text-secondary';
    } else if (color === 'success') {
      return 'text-success';
    } else if (color === 'danger') {
      return 'text-danger';
    } else if (color === 'info') {
      return 'text-info';
    } else if (color === 'gray') {
      return 'text-gray';
    } else if (color === 'black') {
      return 'text-black';
    }

    return 'text-current';
  }

  get iconAppearance(): string {
    return this.appearance === 'normal' ? 'material-icons' : 'material-icons-outlined';
  }
}
