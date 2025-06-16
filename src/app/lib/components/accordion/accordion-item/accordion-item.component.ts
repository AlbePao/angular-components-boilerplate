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
    '[attr.id]': 'itemId',
    '[attr.aria-expanded]': 'ariaExpanded',
    '[attr.aria-controls]': 'ariaControls',
  },
})
export class AccordionItemComponent extends CdkAccordionItem {
  get itemId(): string {
    return `accordion-header-${this.id}`;
  }

  get ariaExpanded(): boolean {
    return this.expanded;
  }

  get ariaControls(): string {
    return `accordion-body-${this.id}`;
  }
}
