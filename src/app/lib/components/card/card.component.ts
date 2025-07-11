import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Colors } from '@lib/types/colors';

// TODO: add app-card-header, app-card-content and app-card-actions directives and related styles
@Component({
  selector: 'app-card',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`border ${borderClass} rounded-sm block`',
  },
})
export class CardComponent {
  @Input() color: Colors = 'gray';

  get borderClass(): string {
    const { color } = this;

    if (color === 'primary') {
      return 'border-primary';
    } else if (color === 'secondary') {
      return 'border-secondary';
    } else if (color === 'success') {
      return 'border-success';
    } else if (color === 'danger') {
      return 'border-danger';
    } else if (color === 'info') {
      return 'border-info';
    }

    return 'border-gray';
  }
}
