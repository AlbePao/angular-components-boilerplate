import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '@lib/components/button';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [RouterLink, ButtonComponent, TranslatePipe],
  templateUrl: './not-found.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {}
