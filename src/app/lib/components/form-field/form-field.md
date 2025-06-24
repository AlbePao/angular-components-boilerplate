# Form Field

The `<app-form-field>` component wraps several form related components and apply common styles.

The following components are designed to work inside an `<app-form-field>`:

- `<input appInput>`
- `<textarea appInput>`
- `<select appSelect>`

## Inputs

| Input        | Description                                     | Type      |
| ------------ | ----------------------------------------------- | --------- |
| `hideBottom` | (optional) Hide bottom spacing of the component | `boolean` |

## Directives

- `app-label` to display form control label
- `app-error` to display form control error
- `[appPrefix]`, `[appIconPrefix]` and `[appTextPrefix]` to display form control text or icon prefix
- `[appSuffix]`, `[appIconSuffix]` and `[appTextSuffix]` to display form control text or icon suffix

## Pipes

- `showControlError` show form control related error in `app-error` directive. It takes a parameter of type `ControlErrors`.

## Type aliases

### `ControlErrors`

Allowed control errors

```typescript
type ControlErrors =
  | 'required'
  | 'pattern'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | 'autocompleteInputInvalid';
```

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FormFieldModule,
    InputDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    inputControlExample: ['', Validators.required],
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
    <input appInput type="text" formControlName="inputControlExample" />
    <app-label>Input Control Example</app-label>
    @if (form.controls.inputControlExample | showControlError: 'required') {
    <app-error>Required field</app-error>
    }
  </app-form-field>
</form>
```
