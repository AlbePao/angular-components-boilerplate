# Alert

Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.

## Inputs

| Input         | Description                                      | Type      |
| ------------- | ------------------------------------------------ | --------- |
| `color`       | The color of the alert panel. Defaults to `gray` | `Colors`  |
| `dismissable` | Whether the alert can be dismissed by user       | `boolean` |

## Outputs

| Output      | Description                                    | Type emitted |
| ----------- | ---------------------------------------------- | ------------ |
| `dismissed` | Event emitted when the alert item is dismissed | `void`       |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    AlertComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-alert color="primary">Lorem ipsum dolor sit amet</app-alert>
<app-alert color="secondary">Lorem ipsum dolor sit amet</app-alert>
<app-alert color="success">Lorem ipsum dolor sit amet</app-alert>
<app-alert color="danger">Lorem ipsum dolor sit amet</app-alert>
<app-alert color="info">Lorem ipsum dolor sit amet</app-alert>
<app-alert color="gray">Lorem ipsum dolor sit amet</app-alert>

<app-alert color="primary"><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="secondary"><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="success"><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="danger"><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="info"><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="gray"><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>

<app-alert color="primary" dismissable><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="secondary" dismissable><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="success" dismissable><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="danger" dismissable><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="info" dismissable><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>
<app-alert color="gray" dismissable><app-icon>home</app-icon> Lorem ipsum dolor sit amet</app-alert>

<app-alert color="primary" dismissable>Lorem ipsum dolor sit amet</app-alert>
<app-alert color="secondary" dismissable>Lorem ipsum dolor sit amet</app-alert>
<app-alert color="success" dismissable>Lorem ipsum dolor sit amet</app-alert>
<app-alert color="danger" dismissable>Lorem ipsum dolor sit amet</app-alert>
<app-alert color="info" dismissable>Lorem ipsum dolor sit amet</app-alert>
<app-alert color="gray" dismissable>Lorem ipsum dolor sit amet</app-alert>
```
