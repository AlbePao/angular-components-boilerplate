import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-tooltip',
  imports: [TranslatePipe],
  templateUrl: './tooltip.component.html',
  host: {
    '[class]': 'tooltipClass',
  },
})
export class TooltipComponent {
  tooltipText: string[] = [];
  tooltipClass = '';
}
