# Placeholder

Replace empty or falsy values with a default or customizable placeholder, keeping non falsy values unchanged

## Pipe usage

```html
{{ value | placeholder: placeholderText }}
```

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    PlaceholderPipe,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  name: string | null = null;
}
```

```html
<p>Name: {{ name | placeholder }}</p>
```
