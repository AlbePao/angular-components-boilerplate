import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RadioGroupModule } from '@lib/components/radio-group';

@Component({
  selector: 'app-radio-example',
  imports: [RadioGroupModule],
  templateUrl: './radio-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioExampleComponent {
  logRadioChange(event: unknown): void {
    console.log('logRadioChange', event);
  }
}
