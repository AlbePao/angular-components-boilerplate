import { Component } from '@angular/core';
import { ButtonComponent } from '@lib/components/button';
import { TooltipDirective } from '@lib/components/tooltip';

@Component({
  selector: 'app-tooltip-example',
  imports: [ButtonComponent, TooltipDirective],
  templateUrl: './tooltip-example.component.html',
})
export class TooltipExampleComponent {}
