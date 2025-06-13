import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_RADIO, RadioBase } from './radio-base';

@Component({
  selector: 'app-radio-button',
  standalone: true,
  templateUrl: './radio-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: APP_RADIO,
      useExisting: RadioButtonComponent,
    },
  ],
})
export class RadioButtonComponent extends RadioBase {}
