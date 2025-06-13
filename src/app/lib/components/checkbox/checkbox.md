# Checkbox

The `<app-checkbox>`component provides the same functionality as a native input checkbox enhanced with styling and behaviour.

## Inputs

| Input           | Description                                     | Type              |
| --------------- | ----------------------------------------------- | ----------------- |
| `checked`       | Whether the checkbox is checked                 | `boolean`         |
| `disabled`      | Whether the checkbox is disabled                | `boolean`         |
| `labelPosition` | Where the label should appear (default `after`) | `before`, `after` |
| `value`         | The value attribute of the native input element | `T`               |

## Outputs

| Output         | Description                                   | Type emitted      |
| -------------- | --------------------------------------------- | ----------------- |
| `valueChange`  | Event emitted when the checkbox changes value | `boolean`, `null` |
| `elementFocus` | Event emitted when the component gets focused | `void`            |
| `elementBlur`  | Event emitted when the component loses focus  | `void`            |

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    CheckboxComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    inputCheckboxControlExample: [true],
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
  <app-checkbox formControlName="inputCheckboxControlExample">Checkbox Control Example</app-checkbox>
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    CheckboxComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  logCheckboxChange(event: boolean | null): void {
    console.log('logCheckboxChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-checkbox (valueChange)="logCheckboxChange($event)" data-test="inputCheckboxExample">Checkbox Example</app-checkbox>
```
