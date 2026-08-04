import { Component, input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  templateUrl: './profile.component.html',
  imports: [TranslatePipe],
})
export class ProfileComponent {
  readonly username = input<string>('');
}
