import { SelectionModel } from '@angular/cdk/collections';
import { CdkTable, CdkTableModule } from '@angular/cdk/table';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ButtonAppearance,
  ButtonModule,
  ButtonSize,
  IconButtonAppearance,
  RoundedButtonColor,
} from '@lib/components/button';
import { MenuItem, MenuModule } from '@lib/components/menu';
import { PillAppearance, PillComponent, PillSize } from '@lib/components/pill';
import { Colors } from '@lib/types/colors';
import { isArray, isNumber, isString } from '@lib/utils/value-checking';
import { TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { CheckboxComponent } from '../checkbox';
import { IconComponent } from '../icon';
import { RadioButtonComponent } from '../radio-group';
import { TooltipDirective } from '../tooltip';

export type ColumnTypes =
  | 'number'
  | 'text'
  | 'textIcon'
  | 'textFormat'
  | 'date'
  | 'icon'
  | 'link'
  | 'listTooltip'
  | 'pill'
  | 'pillsList'
  | 'currency'
  | 'button'
  | 'iconButton'
  | 'roundedButton'
  | 'menu';
export type CellTextFormat = 'bold' | 'italic' | 'underline' | 'stroked';
export type CellAlignment = 'left' | 'right' | 'center';
export type SortDirection = 'asc' | 'desc' | '';
export type RowSelectionPosition = 'start' | 'end' | null;

export interface TableColumnSort {
  sortKey: TableColumn['key'];
  sortDirection: SortDirection;
}

export interface TableColumn<T extends string | number | symbol = string> {
  key: T;
  label: string;
  hide?: boolean;
  type: ColumnTypes;
  sortable?: boolean;
  sticky?: boolean;
  divider?: boolean;
  alignment?: CellAlignment;
}

export interface TableRowAction<R, A = unknown> {
  action: A;
  row: R;
}

export interface RowCellTextFormat {
  formats: CellTextFormat | CellTextFormat[];
  color?: Colors | null;
  text: string | null;
}

export interface RowCellTextIcon {
  icon?: string | null;
  color?: Colors | null;
  label?: string | number | null;
  subLabel?: string | number | null;
}

export interface RowCellIcon {
  color?: Colors | null;
  tooltip?: string | null;
  icon: string | null;
}

export interface RowCellLink {
  link: string | null;
  label: string | number | null;
}

export type RowCellListTooltip = string[];

type ButtonActionLink<A> = {
  size: ButtonSize;
  disabled?: boolean;
} & (
  | {
      action?: never;
      link: string | null;
    }
  | {
      action: A;
      link?: never;
    }
);

export type RowCellButton<A> = {
  appearance: ButtonAppearance;
  label: string;
  icon?: string;
} & ButtonActionLink<A>;

export type RowCellIconButton<A> = {
  appearance: IconButtonAppearance;
  icon: string;
} & ButtonActionLink<A>;

export type RowCellRoundedButton<A> = {
  color: RoundedButtonColor;
  icon?: string;
} & ButtonActionLink<A>;

export interface RowCellPill {
  label: string | number | null;
  color?: Colors;
  appearance?: PillAppearance;
  size?: PillSize;
  icon?: string;
  tooltip?: string;
}

export type RowCellPillsList = RowCellPill[];

export type RowCellMenu<A> = MenuItem<A>[];

export type TableRow<T extends string | number | symbol = string, A = unknown> = Record<
  T,
  | RowCellTextIcon
  | RowCellIcon
  | RowCellLink
  | RowCellListTooltip
  | RowCellPill
  | RowCellPillsList
  | RowCellButton<A>
  | RowCellIconButton<A>
  | RowCellRoundedButton<A>
  | RowCellMenu<A>
>;

const DEFAULT_SORT_STATUS: TableColumnSort = { sortKey: '', sortDirection: '' };

let nextUniqueId = 0;

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CdkTableModule,
    RouterModule,
    PillComponent,
    ButtonModule,
    IconComponent,
    MenuModule,
    TooltipDirective,
    CheckboxComponent,
    RadioButtonComponent,
    TranslatePipe,
    DecimalPipe,
    CurrencyPipe,
    DatePipe,
  ],
  templateUrl: './table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBase<InputRow extends TableRow, OutputRow = InputRow> {
  protected dataSource$ = new BehaviorSubject<InputRow[]>([]);

  protected columnTypes: { [key in ColumnTypes]: key } = {
    number: 'number',
    text: 'text',
    textIcon: 'textIcon',
    textFormat: 'textFormat',
    date: 'date',
    icon: 'icon',
    link: 'link',
    listTooltip: 'listTooltip',
    pill: 'pill',
    pillsList: 'pillsList',
    currency: 'currency',
    button: 'button',
    iconButton: 'iconButton',
    roundedButton: 'roundedButton',
    menu: 'menu',
  };
  protected startSelectionCol = 'startSelectionCol' as const;
  protected endSelectionCol = 'endSelectionCol' as const;
  protected selection = new SelectionModel<InputRow>(true);

  protected get displayedColumns() {
    return this._displayedColumns;
  }
  protected set displayedColumns(displayedColumns: TableColumn['key'][]) {
    this._displayedColumns = displayedColumns;
  }
  private _displayedColumns: TableColumn['key'][] = [];

  @ViewChild(CdkTable) table?: CdkTable<InputRow>;

  @Input()
  get id(): string {
    return this._id;
  }
  set id(value: string) {
    this._id = value;
  }
  private _id = `app-table-${nextUniqueId++}`;

  @Input()
  get columns(): TableColumn[] {
    return this._columns;
  }
  set columns(columns: TableColumn[] | null) {
    columns = columns ?? [];

    const hasKeyNamedChildren = columns.some(({ key }) =>
      [this.startSelectionCol, this.endSelectionCol, 'children'].includes(key),
    );

    if (hasKeyNamedChildren) {
      throw new Error(
        `TableBase: Table cannot have a column with a key named "children", "${this.startSelectionCol}" or "${this.endSelectionCol}"`,
      );
    }

    this._columns = columns;
    this.displayedColumns = this._toggleSelectionColumns(
      this.rowSelectionPosition,
      columns.filter(({ hide }) => !hide).map(({ key }) => key),
    );

    if (this.table) {
      // Update sticky columns styles on table columns update after first rendering
      this.table.updateStickyColumnStyles();
    }
  }
  private _columns: TableColumn[] = [];

  @Input()
  get rows(): InputRow[] {
    return this._rows;
  }
  set rows(rows: InputRow[] | null) {
    this._rows = rows ?? [];
    this.setDataSource(this._rows);
  }
  private _rows: InputRow[] = [];

  @Input()
  set selectedRows(selectedRows: InputRow | InputRow[] | null) {
    if (this.rowSelection === 'multiple' && isArray(selectedRows)) {
      this.selection.setSelection(...selectedRows);
    } else if (this.rowSelection === 'multiple' && selectedRows && !isArray(selectedRows)) {
      this.selection.setSelection(selectedRows);
    }
  }

  @Input() rowSelection: 'multiple' | 'single' | null = null;

  @Input()
  get rowSelectionPosition() {
    return this._rowSelectionPosition;
  }
  set rowSelectionPosition(rowSelectionPosition: RowSelectionPosition) {
    this._rowSelectionPosition = rowSelectionPosition;

    const displayedColumns = this.displayedColumns;
    const indexStart = displayedColumns.indexOf(this.startSelectionCol);
    const indexEnd = displayedColumns.indexOf(this.endSelectionCol);

    displayedColumns.splice(indexStart, 1);
    displayedColumns.splice(indexEnd, 1);

    this.displayedColumns = this._toggleSelectionColumns(rowSelectionPosition, displayedColumns);
  }
  private _rowSelectionPosition: RowSelectionPosition = null;

  @Input({ transform: booleanAttribute }) clickableRows = false;

  @Output() readonly multipleSelectionChange = new EventEmitter<InputRow[]>();
  @Output() readonly singleSelectionChange = new EventEmitter<InputRow>();
  @Output() readonly selectedAction = new EventEmitter<TableRowAction<OutputRow>>();
  @Output() readonly menuAction = new EventEmitter<TableRowAction<OutputRow>>();
  @Output() readonly rowClick = new EventEmitter<OutputRow>();
  @Output() readonly sortChange = new EventEmitter<TableColumnSort>();

  @HostBinding('class') classes = 'relative block overflow-auto';

  get sortStatus(): TableColumnSort {
    return this._sortStatus;
  }
  set sortStatus(sortStatus: TableColumnSort) {
    this._sortStatus = sortStatus;
  }
  private _sortStatus: TableColumnSort = DEFAULT_SORT_STATUS;

  get sortKey(): TableColumn['key'] | null {
    return this.sortStatus.sortKey;
  }

  get sortDirection(): SortDirection {
    return this.sortStatus.sortDirection;
  }

  get isAllRowsSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource$.value.length;
    return numSelected === numRows;
  }

  get isMultipleSelection(): boolean {
    return this.rowSelection === 'multiple';
  }

  get isSingleSelection(): boolean {
    return this.rowSelection === 'single';
  }

  get radioButtonName(): string {
    return `${this.id}-radio-button`;
  }

  protected toggleRows(): void {
    if (this.isAllRowsSelected) {
      this.selection.clear();
    } else {
      this.dataSource$.value.forEach((row) => this.selection.select(row));
    }
  }

  toggleAllRows(): void {
    this.toggleRows();
    this.multipleSelectionChange.emit(this.selection.selected);
  }

  toggleRowCheckbox(row: InputRow): void {
    this.selection.toggle(row);
    this.multipleSelectionChange.emit(this.selection.selected);
  }

  toggleRowRadioButton(row: InputRow): void {
    this.selection.setSelection(row);
    this.singleSelectionChange.emit(row);
  }

  dispatchMenuAction(action: string, row: OutputRow): void {
    this.menuAction.emit({ action, row });
  }

  dispatchRowData(row: OutputRow): void {
    this.rowClick.emit(row);
  }

  toggleSort(sortKey: TableColumn['key']): void {
    let sortDirection: SortDirection = 'asc';

    if (sortKey === this.sortKey) {
      sortDirection = this.sortDirection === '' ? 'asc' : this.sortDirection === 'asc' ? 'desc' : '';
    }

    sortKey = sortDirection !== '' ? sortKey : '';

    this.sortStatus = { sortKey, sortDirection };
    this.sortChange.emit(this.sortStatus);
    this.sortDataSource(this.rows, this.sortStatus);
  }

  isNumber(value: unknown): value is number {
    return typeof value === 'number';
  }

  getCellTextFormatsClasses(cellFormat?: RowCellTextFormat): string[] {
    if (!cellFormat) {
      return [];
    }

    const { formats, color } = cellFormat;

    return [
      ...(formats.includes('bold') ? ['font-bold'] : []),
      ...(formats.includes('italic') ? ['italic'] : []),
      ...(formats.includes('stroked') ? ['line-through'] : []),
      ...(formats.includes('underline') ? ['underline'] : []),
      ...(color === 'primary' ? ['text-primary'] : []),
      ...(color === 'secondary' ? ['text-secondary'] : []),
      ...(color === 'success' ? ['text-success-dark'] : []),
      ...(color === 'danger' ? ['text-danger-dark'] : []),
      ...(color === 'info' ? ['text-info-dark'] : []),
      ...(color === 'gray' ? ['text-gray-dark'] : []),
    ];
  }

  getListTooltipText(listTooltip: string[]): string[] {
    return listTooltip.slice(1);
  }

  setDataSource(rows: InputRow[]): void {
    this.dataSource$.next(rows);
  }

  sortDataSource(rows: InputRow[], sorting: TableColumnSort): void {
    const { sortDirection, sortKey } = sorting;

    const sortedRows = rows.sort((prev, next) => {
      const prevValue = prev[sortKey];
      const nextValue = next[sortKey];

      if (
        sortDirection &&
        (isString(prevValue) || isNumber(prevValue)) &&
        (isString(nextValue) || isNumber(nextValue)) &&
        prevValue < nextValue
      ) {
        return sortDirection === 'asc' ? 1 : -1;
      }

      if (
        sortDirection &&
        (isString(prevValue) || isNumber(prevValue)) &&
        (isString(nextValue) || isNumber(nextValue)) &&
        prevValue > nextValue
      ) {
        return sortDirection === 'asc' ? -1 : 1;
      }

      return 0;
    });

    this.rows = sortedRows;
  }

  handleButtonClick(event: MouseEvent, action: string, row: OutputRow): void {
    this.stopPropagation(event);
    this.selectedAction.emit({ action, row });
  }

  stopPropagation(event: MouseEvent): void {
    if (this.clickableRows) {
      event.stopPropagation();
    }
  }

  getCellTextAlignmentClass(divider?: boolean, alignment?: CellAlignment, formats?: RowCellTextFormat): string[] {
    return [
      ...(divider ? ['border-r'] : []),
      ...(alignment === 'center' ? ['text-center'] : []),
      ...(alignment === 'right' ? ['text-right'] : []),
      ...(!alignment || alignment === 'left' ? ['text-left'] : []),
      ...this.getCellTextFormatsClasses(formats),
    ];
  }

  private _toggleSelectionColumns(
    selectionPosition: RowSelectionPosition,
    columns: TableColumn['key'][],
  ): TableColumn['key'][] {
    return [
      ...(selectionPosition === 'start' ? [this.startSelectionCol] : []),
      ...columns,
      ...(selectionPosition === 'end' ? [this.endSelectionCol] : []),
    ];
  }
}
