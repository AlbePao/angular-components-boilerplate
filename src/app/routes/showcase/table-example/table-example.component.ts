import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TableColumn, TableColumnSort, TableComponent, TableRow, TableRowAction } from '@lib/components/table';

@Component({
  selector: 'app-table-example',
  imports: [TableComponent],
  templateUrl: './table-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableExampleComponent {
  columns: TableColumn[] = [
    {
      key: 'id',
      label: 'ID',
      type: 'number',
      hide: true,
    },
    {
      key: 'progression',
      label: 'Progression',
      type: 'number',
      sortable: true,
    },
    {
      key: 'name',
      label: 'Name',
      type: 'text',
      sortable: true,
    },
    {
      key: 'lastName',
      label: 'Last name',
      type: 'text',
      sortable: true,
    },
    {
      key: 'birthDate',
      label: 'Birth date',
      type: 'date',
      sortable: true,
    },
    {
      key: 'icon',
      label: 'Icon',
      type: 'icon',
    },
    {
      key: 'status',
      label: 'Status',
      type: 'pill',
      sortable: true,
    },
    {
      key: 'amount',
      label: 'Amount',
      type: 'currency',
      sortable: true,
    },
    {
      key: 'actionButton',
      label: 'Button',
      type: 'button',
    },
    {
      key: 'menu',
      label: '',
      type: 'menu',
    },
  ];

  rows: TableRow[] = [
    {
      id: 321,
      progression: 1,
      name: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      icon: { icon: 'face', color: 'primary', tooltip: 'Lorem ipsum' },
      status: { label: 'OK', color: 'success' },
      amount: 299.9,
      actionButton: { appearance: 'primary', size: 'md', label: 'Lorem Ipsum', action: 'loremIpsum' },
      menu: [
        { icon: 'edit', label: 'Modifica', action: 'edit' },
        { icon: 'home', label: 'Home', link: '/' },
      ],
    },
    {
      id: 3434,
      progression: 2,
      name: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      icon: { icon: 'face', color: 'primary', tooltip: 'Lorem ipsum' },
      status: { label: 'OK', color: 'success' },
      amount: 299.9,
      actionButton: { appearance: 'primary', size: 'md', label: 'Lorem Ipsum', action: 'loremIpsum' },
      menu: [
        { icon: 'edit', label: 'Modifica', action: 'edit' },
        { icon: 'home', label: 'Home', link: '/' },
      ],
    },
    {
      id: 243,
      progression: 3,
      name: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      icon: { icon: 'face', color: 'primary', tooltip: 'Lorem ipsum' },
      status: { label: 'OK', color: 'success' },
      amount: 299.9,
      actionButton: { appearance: 'primary', size: 'md', label: 'Lorem Ipsum', action: 'loremIpsum' },
      menu: [
        { icon: 'edit', label: 'Modifica', action: 'edit' },
        { icon: 'home', label: 'Home', link: '/' },
      ],
    },
  ];

  selectedRows = this.rows.slice(0, 2);

  logSelectedAction(event: TableRowAction<TableRow>): void {
    console.log('logSelectedAction', event);
  }

  logMenuAction(event: TableRowAction<TableRow, unknown>): void {
    console.log('logAction', event);
  }

  logSort(event: TableColumnSort): void {
    console.log('logSort', event);
  }

  logRowClick(event: TableRow): void {
    console.log('logRowClick', event);
  }

  logSingleSelectionChange(event: TableRow): void {
    console.log('logSingleSelectionChange', event);
  }

  logMultipleSelectionChange(event: TableRow[]): void {
    console.log('logMultipleSelectionChange', event);
  }
}
