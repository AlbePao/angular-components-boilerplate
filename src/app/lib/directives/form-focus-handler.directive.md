# Form Focus Handler

This directive applies on a `form` and sets focus automatically on the first component inside it with `FocusableItem` provider, keeps track of what of these components is focused and handles shortcuts to navigate with keyboard between form controls components.

## Inputs

| Input             | Description                                                | Type      |
| ----------------- | ---------------------------------------------------------- | --------- |
| `appFocusHandler` | Whether form focus handler should handle focus on controls | `boolean` |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FormFocusHandlerDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    // example form controls
  });
}
```

```html
<!-- example.component.html -->
<form appFocusHandler [formGroup]="form">
  <!-- form control components with FocusableItem provider -->
</form>
```
