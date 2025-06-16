import { CdkAccordionItem } from '@angular/cdk/accordion';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
    'attr.role': 'button',
    'attr.tabindex': '0',
    '[attr.id]': '`accordion-header-${id}`',
    '[attr.aria-expanded]': 'expanded',
    '[attr.aria-controls]': '`accordion-body-${id}`',
  },
})
export class AccordionItemComponent extends CdkAccordionItem {}
