import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { Colors } from '@lib/types/colors';
import { APP_RADIO, RadioBase } from './radio-base';

type RadioPillIcon = 'radio_button_unchecked' | 'radio_button_checked' | 'check_circle_outline' | 'block' | 'warning';

@Component({
  selector: 'app-radio-pill',
  imports: [IconComponent],
  templateUrl: './radio-pill.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: APP_RADIO,
      useExisting: RadioPillComponent,
    },
  ],
})
export class RadioPillComponent extends RadioBase {
  @Input() color: Colors = 'gray';

  get radioPillIcon(): RadioPillIcon {
    const { checked, color } = this;

    if (!checked) {
      return 'radio_button_unchecked';
    }

    if (color === 'primary') {
      return 'radio_button_checked';
    } else if (color === 'secondary') {
      return 'radio_button_checked';
    } else if (color === 'success') {
      return 'check_circle_outline';
    } else if (color === 'danger') {
      return 'block';
    } else if (color === 'info') {
      return 'warning';
    }

    return 'radio_button_checked';
  }
}
