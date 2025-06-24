import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProgressBarComponent } from '@lib/components/progress-bar';

@Component({
  selector: 'app-progress-bar-example',
  imports: [ProgressBarComponent],
  templateUrl: './progress-bar-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgressBarExampleComponent {}
