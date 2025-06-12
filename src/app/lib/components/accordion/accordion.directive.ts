import { CdkAccordion } from '@angular/cdk/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: 'app-accordion',
  standalone: true,
  host: {
    '[class]': 'classes',
  },
})
export class AccordionDirective extends CdkAccordion {
  classes = 'block w-full bg-gray-lighter rounded';
}
