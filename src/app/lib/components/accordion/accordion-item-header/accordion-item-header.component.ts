import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AccordionItemComponent } from '@lib/components/accordion/accordion-item/accordion-item.component';
import { IconComponent } from '@lib/components/icon';

@Component({
  selector: 'app-accordion-item-header',
  imports: [IconComponent],
  templateUrl: './accordion-item-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class AccordionItemHeaderComponent {
  readonly accordionItem = inject(AccordionItemComponent, { host: true });

  get isDisabled(): boolean {
    return this.accordionItem.disabled;
  }

  get isExpanded(): boolean {
    return this.accordionItem.expanded;
  }
}
