# Focus Trigger

This directive is applied to any html element on which click should trigger a focus event on another input element.

## Inputs

| Input      | Description                                             | Type               |
| ---------- | ------------------------------------------------------- | ------------------ |
| `appFocus` | Target element to focus when current element is clicked | `HTMLInputElement` |
| `id`       | (optional) Unique ID for the element                    | `string`           |

## Outputs

| Output         | Description                                   | Type emitted |
| -------------- | --------------------------------------------- | ------------ |
| `elementFocus` | Event emitted when the component gets focused | `void`       |
| `elementBlur`  | Event emitted when the component loses focus  | `void`       |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FocusTriggerDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<input appFocusShortcut type="text" />
```
