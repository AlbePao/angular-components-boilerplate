import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class SpinnerComponent {
  @Input({ transform: numberAttribute }) diameter = 32;
}
