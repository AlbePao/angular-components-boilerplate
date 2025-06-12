import { NgModule } from '@angular/core';
import { AccordionItemHeaderComponent } from './accordion-item-header/accordion-item-header.component';
import { AccordionItemTitleDirective } from './accordion-item-title.directive';
import { AccordionItemComponent } from './accordion-item/accordion-item.component';
import { AccordionDirective } from './accordion.directive';

@NgModule({
  imports: [AccordionDirective, AccordionItemComponent, AccordionItemHeaderComponent, AccordionItemTitleDirective],
  exports: [AccordionDirective, AccordionItemComponent, AccordionItemHeaderComponent, AccordionItemTitleDirective],
})
export class AccordionModule {}
