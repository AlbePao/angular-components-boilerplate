import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PaginationEvent, PaginatorComponent } from '@lib/components/paginator';

@Component({
  selector: 'app-paginator-example',
  imports: [PaginatorComponent],
  templateUrl: './paginator-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorExampleComponent {
  currentPage = signal(1);
  pageSize = signal(25);
  length = 200;

  logPaginator(event: PaginationEvent): void {
    this.currentPage.set(event.currentPage);
    this.pageSize.set(event.pageSize);
    console.log('logPaginator', event);
  }
}
