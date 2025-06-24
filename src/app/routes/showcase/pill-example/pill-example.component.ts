import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PillComponent } from '@lib/components/pill';

@Component({
  selector: 'app-pill-example',
  imports: [PillComponent],
  templateUrl: './pill-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillExampleComponent {}
