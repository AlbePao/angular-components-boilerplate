# Radio Group

The `<app-radio-button>` provides the same functionality as a native input radio enhanced with styling and behaviour.

## `app-radio-group` directive

### Inputs

| Input      | Description                                                                                                                               | Type                           |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `name`     | Name of the radio button group. All radio buttons inside this group will use this name                                                    | `string`                       |
| `value`    | The value attribute of the native input element                                                                                           | `T`                            |
| `selected` | The currently selected radio button. If set to a new radio button, the radio group value will be updated to match the new selected button | `RadioButtonComponent`, `null` |
| `disabled` | Whether the radio button is disabled or not                                                                                               | `boolean`                      |
| `required` | Whether the radio button is required                                                                                                      | `boolean`                      |

### Outputs

| Output         | Description                                        | Type emitted |
| -------------- | -------------------------------------------------- | ------------ |
| `valueChange`  | Event emitted when the radio options changes value | `T`, `null`  |
| `elementFocus` | Event emitted when the component gets focused      | `void`       |
| `elementBlur`  | Event emitted when the component loses focus       | `void`       |

## `app-radio-button` component

### Inputs

| Input              | Description                                                                           | Type              |
| ------------------ | ------------------------------------------------------------------------------------- | ----------------- |
| `id`               | The unique ID for the radio button                                                    | `string`          |
| `name`             | Analog to HTML `name` attribute used to group radios for unique selection             | `string`          |
| `aria-label`       | Used to set the `aria-label` attribute on the underlying input element                | `string`          |
| `aria-labelledby`  | The `aria-labelledby` attribute takes precedence as the element's text alternative    | `string`          |
| `aria-describedby` | The `aria-describedby` attribute is read after the element's label and field type     | `string`          |
| `checked`          | Whether this radio button is checked                                                  | `boolean`         |
| `value`            | The value of this radio button                                                        | `unknown`         |
| `labelPosition`    | Whether the label should appear after or before the radio button. Defaults to `after` | `before`, `after` |
| `disabled`         | Whether the radio button is disabled or not                                           | `boolean`         |
| `required`         | Whether the radio button is required                                                  | `boolean`         |

### Outputs

| Output        | Description                                                                                                                                                            | Type emitted      |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `valueChange` | Event emitted when the checked state of this radio button changes. Change events are only emitted when the value changes due to user interaction with the radio button | `unknown`, `null` |

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    RadioGroupModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    radioControlExample: ['Test 1'],
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
  <app-radio-group formControlName="radioControlExample">
    <app-radio-button value="Test 1">Test 1</app-radio-button>
    <app-radio-button value="Test 2">Test 2</app-radio-button>
    <app-radio-button value="Test 3">Test 3</app-radio-button>
    <app-radio-button value="Test 4" labelPosition="before">Test 4</app-radio-button>
  </app-radio-group>
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    RadioGroupModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  logRadioChange(event: boolean | null): void {
    console.log('logRadioChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-radio-group (valueChange)="logRadioChange($event)">
  <app-radio-button value="Test 1">Test 1</app-radio-button>
  <app-radio-button value="Test 2">Test 2</app-radio-button>
  <app-radio-button value="Test 3">Test 3</app-radio-button>
  <app-radio-button value="Test 4" labelPosition="before">Test 4</app-radio-button>
</app-radio-group>
```
