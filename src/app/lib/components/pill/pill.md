# Pill

The `<app-pill>` component provides small coloured labels.

## Inputs

| Input        | Description                                    | Type             |
| ------------ | ---------------------------------------------- | ---------------- |
| `appearance` | The appearance of the pill. Defaults to `fill` | `PillAppearance` |
| `size`       | The size of the pill. Defaults to `sm`         | `PillSize`       |
| `color`      | The color of the pill. Defaults to `gray`      | `Colors`         |

## Type aliases

### `Colors`

Color of the pill

```typescript
type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'gray';
```

### `PillSize`

Size of the pill

```typescript
type PillSize = 'sm' | 'md' | 'lg';
```

### `PillAppearance`

Appearance of the pill

```typescript
type PillAppearance = 'fill' | 'outline';
```

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    PillComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-pill>Default</app-pill>
<app-pill color="primary">Primary</app-pill>
<app-pill color="secondary">Secondary</app-pill>
<app-pill color="success">Success</app-pill>
<app-pill color="danger">Danger</app-pill>
<app-pill color="info">Info</app-pill>
<app-pill color="gray">Gray</app-pill>
```
