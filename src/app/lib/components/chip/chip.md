# Chip

The `<app-chip>` provides a draggable floating action bar in which content can be placed.

## Inputs

| Input   | Description       | Type        |
| ------- | ----------------- | ----------- |
| `value` | Value of the chip | `T`, `null` |

## Outputs

| Output    | Description                            | Type emitted |
| --------- | -------------------------------------- | ------------ |
| `removed` | Event emitted when the chip is removed | `T`, `null`  |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    ChipComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  chips = [
    {
      value: 1,
      label: 'Value 1',
    },
    {
      value: 2,
      label: 'Value 2',
    },
    {
      value: 3,
      label: 'Value 3',
    },
  ];

  logChipRemove(value: number | null): void {
    console.log('Removed chip value', value);
  }
}
```

```html
<!-- example.component.html -->
@for (chip of chips; track $index) {
<app-chip [value]="chip.value" (removed)="logChipRemove($event)">{{ chip.label }}</app-chip>
}
```
