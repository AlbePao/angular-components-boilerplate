import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip',
  imports: [TranslatePipe],
  templateUrl: './tooltip.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  @Input() tooltipText: string[] = [];
  // TODO: check if HostBinding is a good idea
  @HostBinding('class') @Input() tooltipClass = '';
}
