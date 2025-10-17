# Toggle

The `<app-toggle>` component provides toggles with the behaviour of radio buttons.

## Inputs

| Input           | Description                                             | Type                |
| --------------- | ------------------------------------------------------- | ------------------- |
| `options`       | Options to display in the toggle                        | `ToggleOption<T>[]` |
| `value`         | Value of the selected option                            | `T`                 |
| `disabled`      | Whether the input toggle is disabled or not             | `boolean`           |
| `labelPosition` | (only for `<app-toggle>`) Where the label should appear | `before`, `after`   |

## Outputs

| Output         | Description                                   | Type emitted |
| -------------- | --------------------------------------------- | ------------ |
| `valueChange`  | Event emitted when the toggle changes option  | `T`          |
| `elementFocus` | Event emitted when the component gets focused | `void`       |
| `elementBlur`  | Event emitted when the component loses focus  | `void`       |

## Interfaces

### `ToggleOption<T>`

Used to describe a single option. It extends [`Option` interface](../../../types/option.md)

- `value` value of the option
- `label` (optional) label of the option
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display near the label
- `disabled` (optional) whether the option is disabled or not

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    ToggleComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  toggleOptions: ToggleOption<number>[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three', disabled: true },
  ];

  form = this._fb.group({
    toggleControlExample: [1],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }
}
```

```html
<!-- example.component.html -->
<form [formGroup]="form">
  <app-toggle formControlName="toggleControlExample" [options]="toggleOptions" />
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    ToggleComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  toggleOptions: ToggleOption<number>[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three', disabled: true },
  ];

  logToggleChange(event: number): void {
    console.log('logToggleChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-toggle [value]="toggleOptions[0].value" [options]="toggleOptions" (valueChange)="logToggleChange($event)" />
```
