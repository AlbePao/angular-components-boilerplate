# Dialog

The `<app-dialog>` component provides a template wrapper for dialogs opened with `DialogService`.

## Inputs

| Input       | Description                        | Type      |
| ----------- | ---------------------------------- | --------- |
| `showClose` | Show close button in dialog header | `boolean` |

## Slots

| Name                   | Description                                              |
| ---------------------- | -------------------------------------------------------- |
| `[app-dialog-title]`   | Title content in the header of the dialog                |
| `[app-dialog-content]` | Main content of the dialog                               |
| `[app-dialog-footer]`  | Content inside the footer of the dialog, such as buttons |

## Example

```typescript
// example.component.ts
import { ExampleDialogComponent } from './example-dialog.component.ts';

@Component({
  // other stuff...
  imports: [
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _dialogService = inject(DialogService);

  openExampleDialog(): void {
    this._dialogService
      .open(ExampleDialogComponent, { width: '600px', height: '350px' })
      .closed.subscribe((dialogData) => {
        console.log('Dialog data: ', dialogData);
      });
  }
}
```

```html
<!-- example.component.html -->
<button type="button" (click)="openExampleDialog()">Open example dialog</button>
```

```typescript
// example-dialog.component.ts
import { DialogRef } from '@lib/components/dialog';

@Component({
  // other stuff...
  imports: [
    // other imports...
    DialogComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleDialogComponent {
  private readonly _dialogRef = inject(DialogRef);

  close(): void {
    this._dialogRef.close('closed');
  }
}
```

```html
<!-- example-dialog.component.html -->
<app-dialog showClose>
  <div app-dialog-title>Example dialog title</div>
  <div app-dialog-content>Example dialog content</div>
  <div app-dialog-footer>
    <button type="button" (click)="close()">Close</button>
  </div>
</app-dialog>
```

The following styles are **recommended** to allow dialog to fit inside its overlay

```css
/* example-dialog.component.css */
:host {
  display: block;
  min-height: inherit;
  max-height: inherit;
  width: 100%;
}
```
