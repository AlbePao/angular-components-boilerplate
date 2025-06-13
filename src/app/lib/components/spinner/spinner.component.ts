import { ChangeDetectionStrategy, Component, HostBinding, Input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-spinner',
  standalone: true,
  templateUrl: './spinner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input({ transform: numberAttribute }) diameter = 32;

  @HostBinding('class') classes = 'block';
}
