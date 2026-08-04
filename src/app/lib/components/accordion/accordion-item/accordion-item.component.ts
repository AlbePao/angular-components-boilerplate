import { CdkAccordionItem } from '@angular/cdk/accordion';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  host: {
    class: 'block',
    role: 'button',
    tabindex: '0',
    '[id]': '`accordion-header-${id}`',
    '[attr.aria-expanded]': 'expanded',
    '[attr.aria-controls]': '`accordion-body-${id}`',
  },
})
export class AccordionItemComponent extends CdkAccordionItem {}
