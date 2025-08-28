import { CdkAccordionItem } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
