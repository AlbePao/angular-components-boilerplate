# Alert Popup

This component shows an alert overlay.

## Interfaces

### `AlertPopupData`

Used to describe alert popup data

- `message` message to display in alert
- `icon` [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display over the message
- `duration` (optional) alert duration in milliseconds

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  private readonly _alertPopupService = inject(AlertPopupService);

  showAlert(): void {
    this._alertPopupService.show({
      icon: 'face',
      message: 'Alert popup message',
      duration: 10000,
    });
  }
}
```

```html
<!-- example.component.html -->
<button (click)="showAlert()">Show alert</button>
```
