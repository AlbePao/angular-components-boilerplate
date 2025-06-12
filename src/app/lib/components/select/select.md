# Select

`appSelect` is a directive to style a `<select>` designed to work inside of a `<app-form-field>` element

## Inputs

| Input      | Description                           | Type      |
| ---------- | ------------------------------------- | --------- |
| `id`       | (optional) Unique ID for the select   | `string`  |
| `disabled` | Whether the select is disabled or not | `boolean` |

## Outputs

| Output         | Description                                   | Type emitted |
| -------------- | --------------------------------------------- | ------------ |
| `elementFocus` | Event emitted when the component gets focused | `void`       |
| `elementBlur`  | Event emitted when the component loses focus  | `void`       |

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FormFieldModule,
    SelectDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    selectControlExample: [''],
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
  <app-form-field>
    <app-label>Select Control Example</app-label>
    <select appSelect type="text" formControlName="selectControlExample">
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
    @if (form.controls.inputControlExample | showControlError: 'required') {
    <app-error>Campo obbligatorio</app-error>
    }
  </app-form-field>
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FormFieldModule,
    SelectDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  logSelectChange(event: string | null): void {
    console.log('logSelectChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-form-field>
  <app-label>Select Example</app-label>
  <select appSelect type="text" (change)="logSelectChange($event)">
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
</app-form-field>
```
