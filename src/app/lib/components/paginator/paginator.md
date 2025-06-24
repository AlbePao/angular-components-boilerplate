# Paginator

The `<app-paginator>` component provides navigation for paged information, typically used with a table view or a grid view.

## Inputs

| Input             | Description                                                  | Type       |
| ----------------- | ------------------------------------------------------------ | ---------- |
| `currentPage`     | Number of the current page. It starts from 1                 | `number`   |
| `pageSize`        | Number of items to display on a page                         | `number`   |
| `pageSizeOptions` | The set of provided page size options to display to the user | `number[]` |
| `length`          | The total number of items that are being paginated           | `number`   |

## Outputs

| Output       | Description                                       | Type emitted      |
| ------------ | ------------------------------------------------- | ----------------- |
| `pageChange` | Event emitted when the paginator changes the page | `PaginationEvent` |

## Interfaces

### `PaginationEvent`

Fired by `pageChange` event

- `currentPage` number of the page currently set
- `pageSize` number of the current page size
- `length` number of the total paginated items

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    PaginatorComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  currentPage = 1;
  pageSize = 25;
  length = 100;

  logPaginator(event: PaginationEvent): void {
    this.currentPage = event.currentPage;
    console.log('logPaginator', event);
  }
}
```

```html
<!-- example.component.html -->
<app-paginator
  [currentPage]="currentPage"
  [pageSize]="pageSize"
  [length]="length"
  (pageChange)="logPaginator($event)"
/>
```
