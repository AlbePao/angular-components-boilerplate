# Focus Shortcut

This directive is applied to any html element to allow focus on it through keyboard shortcut.

## Inputs

| Input                  | Description                                                           | Type     |
| ---------------------- | --------------------------------------------------------------------- | -------- |
| `appFocusShortcutKeys` | (optional) Set alternative shortcut for focus (default `'control.s'`) | `string` |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FocusShortcutDirective,
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
