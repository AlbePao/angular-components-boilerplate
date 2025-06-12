# Letter Box

The `<app-letter-box>` is a styled container for text, useful for show keys shortcut.

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    LetterBoxComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-letter-box>CTRL + S</app-letter-box>
```
