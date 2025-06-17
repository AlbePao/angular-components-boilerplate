import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  @Input() username = '';
}
