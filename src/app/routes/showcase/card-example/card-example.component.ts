import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CardComponent } from '@lib/components/card';

@Component({
  selector: 'app-card-example',
  imports: [CardComponent],
  templateUrl: './card-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardExampleComponent {}
