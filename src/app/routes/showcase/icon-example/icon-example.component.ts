import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-icon-example',
  imports: [IconComponent],
  templateUrl: './icon-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconExampleComponent {}
