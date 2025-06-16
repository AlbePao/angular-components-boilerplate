import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Colors } from '@lib/types/colors';

// TODO: add app-card-header, app-card-content and app-card-actions directives and related styles
@Component({
  selector: 'app-card',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes',
  },
})
export class CardComponent {
  @Input() color: Colors = 'gray';

  get classes(): string {
    return `border ${this.borderClass} rounded block`;
  }

  get borderClass(): string {
    if (this.color === 'primary') {
      return 'border-primary';
    } else if (this.color === 'secondary') {
      return 'border-secondary';
    } else if (this.color === 'success') {
      return 'border-success';
    } else if (this.color === 'danger') {
      return 'border-danger';
    } else if (this.color === 'info') {
      return 'border-info';
    }

    return 'border-gray';
  }
}
