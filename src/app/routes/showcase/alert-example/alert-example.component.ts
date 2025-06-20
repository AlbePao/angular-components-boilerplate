import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AlertComponent } from '@lib/components/alert';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-alert-example',
  imports: [AlertComponent, IconComponent],
  templateUrl: './alert-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertExampleComponent {}
