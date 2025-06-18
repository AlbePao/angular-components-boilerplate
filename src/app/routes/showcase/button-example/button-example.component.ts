import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-button-example',
  imports: [ButtonModule, IconComponent],
  templateUrl: './button-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonExampleComponent {}
