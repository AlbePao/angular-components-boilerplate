# Table

The `<app-table>` provides a table that can be used to display rows of data.

The table bases its behaviour on [Angular CDK table](https://material.angular.io/cdk/table/overview) and, to display data, a description of columns and rows must be provided.

## Inputs

| Input                  | Description                                                                                                                                                | Type                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `id`                   | (optional) Unique ID for the table component                                                                                                               | `string`                 |
| `columns`              | Array of `TableColumn` describing the columns of table                                                                                                     | `TableColumn[]`          |
| `rows`                 | Array of `TableRow` with row cells data related to its column                                                                                              | `TableRow[]`             |
| `rowSelection`         | Whether if rows should be selectable by checkboxes (`multiple`) or radio buttons (`single`)                                                                | `multiple`, `single`     |
| `rowSelectionPosition` | The position of the row selection inputs                                                                                                                   | `start`, `end`           |
| `selectedRows`         | (optional) `TableRow` (on `single` row selection) or array of `TableRow` (on `multiple` row selection) that must be already selected on table first render | `TableRow`, `TableRow[]` |
| `clickableRows`        | Whether a click on a row can emit `rowClick` output                                                                                                        | `boolean`                |

## Outputs

| Output                    | Description                                                                                       | Type emitted      |
| ------------------------- | ------------------------------------------------------------------------------------------------- | ----------------- |
| `multipleSelectionChange` | Array of selected rows emitted after table multiple selection changes                             | `TableRow[]`      |
| `singleSelectionChange`   | Selected row emitted after table single selection changes                                         | `TableRow`        |
| `selectedAction`          | Object with action and related row data emitted after button in a column type `button` is clicked | `TableRowAction`  |
| `menuAction`              | Object with action and related row data emitted after menu action button is clicked               | `TableRowAction`  |
| `rowClick`                | Object with related row data emitted if `clickableRows` is true                                   | `TableRow`        |
| `sortChange`              | Object with column `key` and sort direction emitted after sortable column header is clicked       | `TableColumnSort` |

## Type aliases

### `ColumnTypes`

Used to define the type of cells of the defined column

```typescript
export type ColumnTypes = 'number' | 'text' | 'date' | 'icon' | 'pill' | 'currency' | 'button' | 'menu';
```

### `SortDirection`

Used to define the sort direction of the column

```typescript
type SortDirection = 'asc' | 'desc' | '';
```

### `CellAlignment`

Used to define the alignment of the content inside the cells of the column

```typescript
type CellAlignment = 'left' | 'right' | 'center';
```

### `TableColumn<T extends string | symbol = string>`

Used to describe a table column. A union type can be assigned as `T` to define allowed row cells properties names

- `key` a union type that behaves as identifier to identify its data in rows cells
- `label` (optional) a string label to display in table header
- `hide` (optional) a boolean value to show/hide column, useful to put data into a table row that doesn't need to be showed to users
- `sortable` (optional) a boolean that indicates if a column is sortable
- `sticky` (optional) a boolean that indicates if a column is should be stick to left on horizontal scrolling
- `divider` (optional) a boolean that displays a divider to the right of the column
- `alignment` (optional) defines the alignment of the content inside the cells
- `type` a `ColumnTypes` type to identify what kind of data to display in column cells. Accepted values are:
  - `number` to show a cell with a number formatted with [DecimalPipe](https://angular.io/api/common/DecimalPipe)
  - `text` to show a cell with simple plain text
  - `date` to show a cell with a formatted date from a string or a `Date` object
  - `icon` to show an icon
  - `pill` to show a cell with an `app-pill` component with specified color, text, icon (optional) and tooltip (optional)
  - `currency` to show a cell with an `app-pill` component with a formatted currency
  - `button` to show a `button[app-button]` with related inputs and action emitted on click or an `a[app-button]` with related inputs and link
  - `menu` to show a cell with an icon button that opens an `app-menu`

### `TableRow<T extends string | number | symbol = string, A = unknown>`

Used to display a single row cell of the table. `T` should be the same union type assigned to `TableColumn<T>` type

```typescript
type TableRow<T extends string | number | symbol = string, A = unknown> = Record<
  T,
  number | string | RowCellIcon | RowCellPill | RowCellButton<A> | RowCellMenu<A>
>;
```

`key` can ba a union type which values **must** match the same property declared in `TableColumn<T>` to display data related to that cell.

Value for that cell must be one of the following:

| Column `type` | Related cell type  |
| ------------- | ------------------ |
| `number`      | `string`, `number` |
| `text`        | `string`, `number` |
| `date`        | `string`, `number` |
| `icon`        | `RowCellIcon`      |
| `pill`        | `RowCellPill`      |
| `currency`    | `string`, `number` |
| `button`      | `RowCellButton<A>` |
| `menu`        | `RowCellMenu<A>`   |

## Columns types

### `RowCellIcon`

Used to display an icon

- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display
- `color` (optional) color from `Colors` type
- `tooltip` (optional) a tooltip to show on icon hover

### `RowCellPill`

Used to display a simple text within a pill component

- `label` text label inside the pill
- `color` (optional) color from `Colors` type
- `appearance` (optional) appearance from `PillAppearance` type
- `size` (optional) size from `PillSize` type
- `icon` (optional) an icon to display inside the pill
- `tooltip` (optional) a tooltip to show on pill hover

### `RowCellButton<A>`

Used to display a `button[app-button]` or an `a[app-button]`

- `appearance` the appearance of the button
- `label` text label of the button
- `size` the size of the button
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) of the button
- `disabled` (optional) whether the button is disabled or not
- `action` an action of type `A` which indicates what action is fired on menu item click
- `link` the link to navigate to

### `RowCellMenu<A>`

Used to display a list of menu items on menu button click on a table cell. This type extends an array of `MenuItem<T>` describing menu items with links or buttons.

## Interfaces

### `TableColumnSort`

Fired by `sortChange` event

- `key` the column key specified in `TableColumn`
- `direction` the direction of the sorting

### `TableRowAction<R, A = unknown>`

Fired by `menuAction` event

- `action` name of the action associated to the button
- `row` row `TableRow` of the button

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    TableComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
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
      icon: {
        icon: 'face',
        color: 'primary',
        tooltip: 'Lorem ipsum',
      },
      status: {
        label: 'OK',
        color: 'success',
      },
      amount: 299.9,
      actionButton: {
        appearance: 'primary',
        size: 'md',
        label: 'Lorem Ipsum',
        action: 'loremIpsum',
      },
      menu: [
        {
          icon: 'edit',
          label: 'Modifica',
          action: 'edit',
        },
        {
          icon: 'home',
          label: 'Home',
          link: '/',
        },
      ],
    },
    {
      id: 3434,
      progression: 2,
      name: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      icon: {
        icon: 'face',
        color: 'primary',
        tooltip: 'Lorem ipsum',
      },
      status: {
        label: 'OK',
        color: 'success',
      },
      amount: 299.9,
      actionButton: {
        appearance: 'primary',
        size: 'md',
        label: 'Lorem Ipsum',
        action: 'loremIpsum',
      },
      menu: [
        {
          icon: 'edit',
          label: 'Modifica',
          action: 'edit',
        },
        {
          icon: 'home',
          label: 'Home',
          link: '/',
        },
      ],
    },
    {
      id: 243,
      progression: 3,
      name: 'John',
      lastName: 'Doe',
      birthDate: '2000-01-01',
      icon: {
        icon: 'face',
        color: 'primary',
        tooltip: 'Lorem ipsum',
      },
      status: {
        label: 'OK',
        color: 'success',
      },
      amount: 299.9,
      actionButton: {
        appearance: 'primary',
        size: 'md',
        label: 'Lorem Ipsum',
        action: 'loremIpsum',
      },
      menu: [
        {
          icon: 'edit',
          label: 'Modifica',
          action: 'edit',
        },
        {
          icon: 'home',
          label: 'Home',
          link: '/',
        },
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
```

```html
<!-- example.component.html -->
<h1>Table</h1>

<h2>Simple table</h2>
<app-table
  class="mb-10"
  [rows]="rows"
  [columns]="columns"
  (menuAction)="logMenuAction($event)"
  (sortChange)="logSort($event)"
  (selectedAction)="logSelectedAction($event)"
/>

<h2>Table with clickable row</h2>
<app-table
  class="mb-10"
  [rows]="rows"
  [columns]="columns"
  (menuAction)="logMenuAction($event)"
  (sortChange)="logSort($event)"
  (selectedAction)="logSelectedAction($event)"
  clickableRows
  (rowClick)="logRowClick($event)"
/>

<h2>Table with single selection</h2>
<app-table
  class="mb-10"
  [rows]="rows"
  [columns]="columns"
  rowSelection="single"
  rowSelectionPosition="start"
  (menuAction)="logMenuAction($event)"
  (sortChange)="logSort($event)"
  (selectedAction)="logSelectedAction($event)"
  (singleSelectionChange)="logSingleSelectionChange($event)"
/>

<h2>Table with multiple selection</h2>
<app-table
  class="mb-10"
  [rows]="rows"
  [columns]="columns"
  rowSelection="multiple"
  rowSelectionPosition="start"
  (menuAction)="logMenuAction($event)"
  (sortChange)="logSort($event)"
  (selectedAction)="logSelectedAction($event)"
  (multipleSelectionChange)="logMultipleSelectionChange($event)"
/>

<h2>Table with multiple selection and selected rows</h2>
<app-table
  class="mb-10"
  [rows]="rows"
  [columns]="columns"
  rowSelection="multiple"
  rowSelectionPosition="start"
  [selectedRows]="selectedRows"
  (menuAction)="logMenuAction($event)"
  (sortChange)="logSort($event)"
  (selectedAction)="logSelectedAction($event)"
  (multipleSelectionChange)="logMultipleSelectionChange($event)"
/>
```
