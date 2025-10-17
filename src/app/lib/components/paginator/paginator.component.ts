import { coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, Component, computed, input, numberAttribute, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldModule } from '@lib/components/form-field';
import { IconComponent } from '@lib/components/icon';
import { InputDirective } from '@lib/components/input';
import { TranslatePipe } from '@ngx-translate/core';

export interface PaginationEvent {
  currentPage: number;
  pageSize: number;
  length: number;
}

interface PaginationRange {
  rangeStart: number;
  rangeEnd: number;
  length: number;
}

const PAGINATION_RANGE = 2;
const ELLIPSIS_RANGE = 3;

@Component({
  selector: 'app-paginator',
  // TODO: replace InputDirective with SelectComponent when available
  imports: [IconComponent, FormsModule, FormFieldModule, InputDirective, TranslatePipe],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class PaginatorComponent {
  readonly currentPage = input.required({ transform: numberAttribute });
  readonly pageSize = input.required({ transform: numberAttribute });
  readonly length = input.required({ transform: numberAttribute });
  readonly pageSizeOptions = input([25, 50, 100, 150]);

  readonly pageChange = output<PaginationEvent>();

  readonly pageCounter = computed<number[]>(() => {
    const pageSize = this.pageSize();
    const length = this.length();
    const totalPages = Math.ceil(length / pageSize);

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  });

  readonly paginationRange = computed<PaginationRange>(() => {
    const currentPage = this.currentPage();
    const pageSize = this.pageSize();
    const length = this.length();
    const rangeEnd = currentPage * pageSize;

    return {
      rangeStart: length > 0 ? (currentPage - 1) * pageSize + 1 : 0,
      rangeEnd: rangeEnd > length ? length : rangeEnd,
      length,
    };
  });

  protected setPage(newPage: number): void {
    const currentPage = this.currentPage();
    const pageSize = this.pageSize();
    const length = this.length();

    if (newPage !== currentPage) {
      this.pageChange.emit({ currentPage: newPage, pageSize, length });
    }
  }

  protected setPageSize(newPageSize: string): void {
    const length = this.length();
    const startIndex = (this.currentPage() - 1) * this.pageSize();
    const pageSize = coerceNumberProperty(newPageSize);
    const currentPage = Math.floor(startIndex / pageSize) || 1;

    this.pageChange.emit({ currentPage, pageSize, length });
  }

  protected isPageInRange(selectedIndex: number): boolean {
    const currentPage = this.currentPage();
    const selectedPage = selectedIndex + 1;

    return selectedPage >= currentPage - PAGINATION_RANGE && selectedPage <= currentPage + PAGINATION_RANGE;
  }

  protected shouldShowEllipsis(selectedIndex: number): boolean {
    const currentPage = this.currentPage();
    const selectedPage = selectedIndex + 1;

    return selectedPage === currentPage - ELLIPSIS_RANGE || selectedPage === currentPage + ELLIPSIS_RANGE;
  }
}
