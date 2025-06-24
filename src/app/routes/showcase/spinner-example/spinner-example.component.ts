import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinnerComponent } from '@lib/components/spinner';

@Component({
  selector: 'app-spinner-example',
  imports: [SpinnerComponent],
  templateUrl: './spinner-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerExampleComponent {}
