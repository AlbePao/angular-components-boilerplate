import { CdkAccordion } from '@angular/cdk/accordion';
import { Directive } from '@angular/core';

@Directive({
  selector: 'app-accordion',
  host: {
    class: 'block w-full bg-gray-lighter rounded-sm',
  },
})
export class AccordionDirective extends CdkAccordion {}
