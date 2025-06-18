import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-example',
  imports: [],
  templateUrl: './checkbox-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExampleComponent {}
