import { CdkAccordionItem } from '@angular/cdk/accordion';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './accordion-item.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionItemComponent extends CdkAccordionItem {
  @HostBinding('class') classes = 'block';
  @HostBinding('attr.role') role = 'button';
  @HostBinding('attr.tabindex') tabindex = '0';

  @HostBinding('attr.id')
  get itemId(): string {
    return `accordion-header-${this.id}`;
  }

  @HostBinding('attr.aria-expanded')
  get ariaExpanded(): boolean {
    return this.expanded;
  }

  @HostBinding('attr.aria-controls')
  get ariaControls(): string {
    return `accordion-body-${this.id}`;
  }
}
