import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PaginationEvent, PaginatorComponent } from '@lib/components/paginator';

@Component({
  selector: 'app-paginator-example',
  imports: [PaginatorComponent],
  templateUrl: './paginator-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorExampleComponent {
  currentPage = 1;
  pageSize = 25;
  length = 200;

  logPaginator(event: PaginationEvent): void {
    this.currentPage = event.currentPage;
    console.log('logPaginator', event);
  }
}
