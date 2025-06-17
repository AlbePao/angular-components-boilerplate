import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  templateUrl: './account.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {}
