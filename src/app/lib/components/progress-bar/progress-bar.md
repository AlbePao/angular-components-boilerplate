# Progress Bar

The `<app-progress-bar>` is a horizontal progress-bar for indicating progress and activity.

## Inputs

| Input   | Description                                       | Type     |
| ------- | ------------------------------------------------- | -------- |
| `color` | The color of the progress bar. Defaults to `gray` | `Colors` |
| `value` | Value of the progress bar. Defaults to zero       | `number` |

## Type aliases

### `Colors`

Color of the progress bar

```typescript
type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'gray';
```

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    ProgressBarComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-progress-bar color="primary" value="0" />
<app-progress-bar color="primary" value="10" />
<app-progress-bar color="primary" value="20" />
<app-progress-bar color="primary" value="30" />
<app-progress-bar color="primary" value="40" />
<app-progress-bar color="primary" value="50" />
<app-progress-bar color="primary" value="60" />
<app-progress-bar color="primary" value="70" />
<app-progress-bar color="primary" value="80" />
<app-progress-bar color="primary" value="90" />
<app-progress-bar color="primary" value="100" />

<app-progress-bar color="secondary" value="0" />
<app-progress-bar color="secondary" value="10" />
<app-progress-bar color="secondary" value="20" />
<app-progress-bar color="secondary" value="30" />
<app-progress-bar color="secondary" value="40" />
<app-progress-bar color="secondary" value="50" />
<app-progress-bar color="secondary" value="60" />
<app-progress-bar color="secondary" value="70" />
<app-progress-bar color="secondary" value="80" />
<app-progress-bar color="secondary" value="90" />
<app-progress-bar color="secondary" value="100" />

<app-progress-bar color="success" value="0" />
<app-progress-bar color="success" value="10" />
<app-progress-bar color="success" value="20" />
<app-progress-bar color="success" value="30" />
<app-progress-bar color="success" value="40" />
<app-progress-bar color="success" value="50" />
<app-progress-bar color="success" value="60" />
<app-progress-bar color="success" value="70" />
<app-progress-bar color="success" value="80" />
<app-progress-bar color="success" value="90" />
<app-progress-bar color="success" value="100" />

<app-progress-bar color="danger" value="0" />
<app-progress-bar color="danger" value="10" />
<app-progress-bar color="danger" value="20" />
<app-progress-bar color="danger" value="30" />
<app-progress-bar color="danger" value="40" />
<app-progress-bar color="danger" value="50" />
<app-progress-bar color="danger" value="60" />
<app-progress-bar color="danger" value="70" />
<app-progress-bar color="danger" value="80" />
<app-progress-bar color="danger" value="90" />
<app-progress-bar color="danger" value="100" />

<app-progress-bar color="info" value="0" />
<app-progress-bar color="info" value="10" />
<app-progress-bar color="info" value="20" />
<app-progress-bar color="info" value="30" />
<app-progress-bar color="info" value="40" />
<app-progress-bar color="info" value="50" />
<app-progress-bar color="info" value="60" />
<app-progress-bar color="info" value="70" />
<app-progress-bar color="info" value="80" />
<app-progress-bar color="info" value="90" />
<app-progress-bar color="info" value="100" />
```
