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
| `columnsChange`           | Array of displayed `TableColumn` after columns toggle dialog is closed                            | `TableColumn[]`   |

## Type aliases

### `ColumnTypes`

Used to define the type of cells of the defined column

```typescript
type ColumnTypes =
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

### `TableColumn<T extends string | number | symbol = string>`

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
  - `textIcon` to show a cell with an icon and a text title and subtitle (both optional)
  - `textFormat` to show a cell with formatted plain text
  - `date` to show a cell with a formatted date from a string or a `Date` object
  - `icon` to show an icon
  - `link` to show a link
  - `listTooltip` to show a list in which the first element is displayed and the others are shown in a tooltip
  - `pill` to show a cell with an `app-pill` component with specified color, text, icon (optional) and tooltip (optional)
  - `pillsList` to show a cell with a list of `app-pill` components with specified color, text, icon (optional) and tooltip (optional)
  - `currency` to show a cell with an `app-pill` component with a formatted currency
  - `button` to show a `button[app-button]` with related inputs and action emitted on click or an `a[app-button]` with related inputs and link
  - `iconButton` to show a `button[app-icon-button]` with related inputs and action emitted on click or an `a[app-icon-button]` with related inputs and link
  - `roundedButton` to show a `button[app-rounded-button]` with related inputs and action emitted on click or an `a[app-rounded-button]` with related inputs and link
  - `menu` to show a cell with an icon button that opens an `app-menu`

### `TableRow<T extends string | number | symbol = string, A = unknown>`

Used to display a single row cell of the table. `T` should be the same union type assigned to `TableColumn<T>` type

```typescript
type TableRow<T extends string | number | symbol = string, A = unknown> = {
  [key in T]:
    | unknown
    | RowCellTextIcon
    | RowCellIcon
    | RowCellLink
    | RowCellListTooltip
    | RowCellPill
    | RowCellPillsList
    | RowCellButton<A>
    | RowCellIconButton<A>
    | RowCellRoundedButton<A>
    | RowCellMenu<A>;
};
```

`key` can ba a union type which values **must** match the same property declared in `TableColumn<T>` to display data related to that cell.

Value for that cell must be one of the following:

| Column `type`   | Related cell type         |
| --------------- | ------------------------- |
| `number`        | `string`, `number`        |
| `text`          | `string`, `number`        |
| `textIcon`      | `RowCellTextIcon`         |
| `textFormat`    | `RowCellTextFormat`       |
| `date`          | `string`, `number`        |
| `icon`          | `RowCellIcon`             |
| `link`          | `RowCellLink`             |
| `listTooltip`   | `RowCellListTooltip`      |
| `pill`          | `RowCellPill`             |
| `pillsList`     | `RowCellPillsList`        |
| `currency`      | `string`, `number`        |
| `button`        | `RowCellButton<A>`        |
| `iconButton`    | `RowCellIconButton<A>`    |
| `roundedButton` | `RowCellRoundedButton<A>` |
| `menu`          | `RowCellMenu<A>`          |

## Columns types

### `RowCellTextFormat`

Used to display a text with single or multiple format options

- `formats` a `CellTextFormat` type or array of it to apply one or multiple formats to text
- `text` text label to display
- `color` (optional) color of the text from `Colors` type

### `RowCellTextIcon`

Used to display an icon with an optional text

- `icon` [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display in the cell
- `color` (optional) color of the icon from `Colors` type
- `label` (optional) text label next to the icon
- `subLabel` (optional) smaller text label under the icon

### `RowCellListTooltip`

An alias of `string[]`

```typescript
type RowCellListTooltip = string[];
```

### `RowCellPill`

Used to display a simple text within a pill component

- `label` text label inside the pill
- `color` (optional) color from `Colors` type
- `appearance`: (optional) appearance from `PillAppearance` type
- `size`: (optional) size from `PillSize` type
- `icon`: (optional) an icon to display inside the pill
- `tooltip`: (optional) a tooltip to show on pill hover

### `RowCellPillsList`

An alias of `RowCellPill[]`

```typescript
type RowCellPillsList = RowCellPill[];
```

### `RowCellIcon`

Used to display an icon

- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display
- `color` (optional) color from `Colors` type
- `tooltip`: (optional) a tooltip to show on icon hover

### `RowCellLink`

Used to display a link

- `link` the link to navigate to
- `label` link label inside the pill

### `RowCellButton<A>`

Used to display a `button[app-button]` or an `a[app-button]`

- `appearance` the appearance of the button
- `label` text label of the button
- `size` the size of the button
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) of the button
- `disabled` (optional) whether the button is disabled or not
- `action` an action of type `A` which indicates what action is fired on menu item click
- `link` the link to navigate to

### `RowCellIconButton<A>`

Used to display a `button[app-icon-button]` or an `a[app-icon-button]`

- `appearance` the appearance of the icon button
- `size` the size of the icon button
- `icon` [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) of the button
- `disabled` (optional) whether the button is disabled or not
- `action` an action of type `A` which indicates what action is fired on menu item click
- `link` the link to navigate to

### `RowCellRoundedButton<A>`

Used to display a `button[app-rounded-button]` or an `a[app-rounded-button]`

- `color` the appearance of the icon button
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
    TableModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  columns: TableColumn[] = [
    {
      key: 'name',
      label: 'Nome cliente',
      type: 'text',
      sortable: true,
    },
    {
      key: 'assignmentStart',
      label: 'Inizio mandato',
      type: 'date',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Stato',
      type: 'pill',
      sortable: true,
    },
    {
      key: 'total',
      label: 'Totale',
      type: 'currency',
      sortable: true,
    },
    {
      key: 'menu',
      type: 'menu',
    },
  ];

  rows: TableRow[] = [
    {
      name: 'Massimiliano Rossi',
      assignmentStart: '2019-11-21',
      status: {
        label: 'MIFID Mancante',
        color: 'info',
      },
      total: 1000,
      menu: [
        {
          icon: 'edit',
          label: 'Modifica',
          action: 'edit',
        },
      ],
    },
  ];

  logMenuAction(event: TableRowAction): void {
    console.log('logAction', event);
  }

  logSort(event: TableColumnSort): void {
    console.log('logSort', event);
  }
}
```

```html
<!-- example.component.html -->
<app-table [rows]="rows" [columns]="columns" (menuAction)="logMenuAction($event)" (sortChange)="logSort($event)" />
```
