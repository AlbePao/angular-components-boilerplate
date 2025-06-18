import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AccordionModule } from '@lib/components/accordion';

@Component({
  selector: 'app-accordion-example',
  imports: [AccordionModule],
  templateUrl: './accordion-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionExampleComponent {}
