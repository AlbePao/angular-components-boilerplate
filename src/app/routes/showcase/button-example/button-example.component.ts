import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-button-example',
  imports: [RouterLink, ButtonModule, IconComponent],
  templateUrl: './button-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonExampleComponent {}
