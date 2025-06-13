import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  numberAttribute,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldModule } from '@lib/components/form-field';
import { IconComponent } from '@lib/components/icon';
import { SelectDirective } from '@lib/components/select';
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
  standalone: true,
  imports: [CommonModule, IconComponent, FormsModule, FormFieldModule, SelectDirective, TranslatePipe],
  templateUrl: './paginator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginatorComponent {
  @Input({ transform: numberAttribute }) currentPage = 1;
  @Input({ transform: numberAttribute }) pageSize = 0;
  @Input({ transform: numberAttribute }) length = 0;
  @Input() pageSizeOptions = [25, 50, 100, 150];

  @Output() readonly pageChange = new EventEmitter<PaginationEvent>();

  get pageCounter(): number[] {
    const { length, pageSize } = this;
    const totalPages = Math.ceil(length / pageSize);

    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  get paginationRange(): PaginationRange {
    const { currentPage, pageSize, length } = this;
    const rangeEnd = currentPage * pageSize;

    return {
      rangeStart: length > 0 ? (currentPage - 1) * pageSize + 1 : 0,
      rangeEnd: rangeEnd > length ? length : rangeEnd || 0,
      length: length || 0,
    };
  }

  @HostBinding('class') classes = 'block';

  protected setPage(newPage: number): void {
    const { currentPage, pageSize, length } = this;

    if (newPage !== currentPage) {
      this.pageChange.emit({ currentPage: newPage, pageSize, length });
    }
  }

  protected setPageSize(pageSize: number): void {
    const { length } = this;
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const currentPage = Math.floor(startIndex / pageSize) || 1;

    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.pageChange.emit({ currentPage, pageSize, length });
  }

  protected isPageInRange(selectedIndex: number): boolean {
    const { currentPage } = this;
    const selectedPage = selectedIndex + 1;

    return selectedPage >= currentPage - PAGINATION_RANGE && selectedPage <= currentPage + PAGINATION_RANGE;
  }

  protected canShowEllipsis(selectedIndex: number): boolean {
    const { currentPage } = this;
    const selectedPage = selectedIndex + 1;

    return selectedPage === currentPage - ELLIPSIS_RANGE || selectedPage === currentPage + ELLIPSIS_RANGE;
  }
}
