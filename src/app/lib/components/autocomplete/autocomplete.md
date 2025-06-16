# Autocomplete

The autocomplete is a text input enhanced by a panel of suggested options.

Start by creating the autocomplete panel and the options displayed inside it. Each option should be passed as `option` input.

```html
<app-autocomplete #auto="appAutocomplete" [options]="options" />
```

Next, create the input and set the `appAutocomplete` input to refer to the template reference we assigned to the autocomplete. Let's assume you're using the `formControlName` directive from `ReactiveFormsModule` to track the value of the input. The input type **must** be `text`

Now we'll need to link the text input to its panel. We can do this by exporting the autocomplete panel instance into a local template variable (here we called it "auto"), and binding that variable to the input's `appAutocomplete` property.

```html
<input type="text" placeholder="Pick one" appInput formControlName="myControl" [appAutocomplete]="auto" />
```

## `input[appInput][appAutocomplete]`

The directive associated to `input[appInput]` that triggers the autocomplete panel opening

### Inputs

| Input                             | Description                                                  | Type                    |
| --------------------------------- | ------------------------------------------------------------ | ----------------------- |
| `appAutocomplete`                 | The autocomplete panel component instance                    | `AutocompleteComponent` |
| `appAutocompleteDisabled`         | Whether autocomplete is disabled                             | `boolean`               |
| `appAutocompleteSearchAfterChars` | (optional) After how many characters the search is triggered | `number`                |

### Outputs

| Output         | Description                                                     | Type emitted          |
| -------------- | --------------------------------------------------------------- | --------------------- |
| `valueChange`  | Event emitted when `[appAutocomplete]` value changes            | `T`, `null`           |
| `inputChange`  | Event emitted when text value of `input[appInput]` changes      | `string`              |
| `extrasChange` | Event emitted when extras associated to selected option changes | `OptionExtra`, `null` |
| `elementFocus` | Event emitted when the component gets focused                   | `void`                |
| `elementBlur`  | Event emitted when the component loses focus                    | `void`                |

### Validation errors

- `autocompleteInputInvalid` this error is triggered when input field is filled with text that doesn't have a match with an option

## `app-autocomplete`

The autocomplete panel with related options

### Inputs

| Input     | Description                            | Type             |
| --------- | -------------------------------------- | ---------------- |
| `options` | Options to display in the autocomplete | `Option<T, E>[]` |

### Outputs

| Output         | Description                         | Type emitted |
| -------------- | ----------------------------------- | ------------ |
| `optionChange` | Event emitted when an option is set | `T`, `null`  |
| `opened`       | Event emitted when panel is opened  | `void`       |
| `closed`       | Event emitted when panel is closed  | `void`       |

### Interfaces

#### `Option<T = string, E extends OptionExtra | never = never>`

Used to describe a single option

- `value` value of the option
- `label` label of the option
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display next to the label
- `disabled` (optional) whether the option is disabled or not
- `extra` (optional) extra data associated to option

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    ReactiveFormsModule,
    InputDirective,
    AutocompleteModule,
    IconComponent,
    ButtonModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  autocompleteOptions: Option<number>[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' },
    { value: 4, label: 'Four', disabled: true },
  ];

  form = this._fb.group({
    autocompleteControlExample: [1],
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
    <app-label>Input Control Example</app-label>
    <input
      appInput
      type="text"
      formControlName="autocompleteControlExample"
      [appAutocomplete]="autocompleteExample"
      #autocompleteControlExampleTrigger
    />
    <button app-icon-button type="button" appSuffix [appFocus]="autocompleteControlExampleTrigger">
      <app-icon color="black">arrow_drop_down</app-icon>
    </button>
    <app-autocomplete #autocompleteExample="appAutocomplete" [options]="autocompleteOptions" />
    @if (form.controls.autocompleteControlExample | showControlError: 'autocompleteInputInvalid') {
    <app-error>Inserisci un valore valido</app-error>
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
    InputDirective,
    AutocompleteModule,
    IconComponent,
    ButtonModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  autocompleteValue: number | null = null;

  autocompleteOptions: Option<number>[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three' },
    { value: 4, label: 'Four', disabled: true },
  ];

  logAutocompleteValueChange(event: number | null): void {
    console.log('logAutocompleteValueChange', event);
  }

  logAutocompleteInputChange(event: string): void {
    console.log('logAutocompleteInputChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-form-field>
  <app-label>Input Example</app-label>
  <input
    appInput
    type="text"
    [appAutocomplete]="autocompleteExample"
    #autocompleteExampleTrigger
    #autocompleteExampleModel="ngModel"
    [(ngModel)]="autocompleteValue"
    (valueChange)="logAutocompleteValueChange($event)"
    (inputChange)="logAutocompleteInputChange($event)"
  />
  <button app-icon-button type="button" appSuffix [appFocus]="autocompleteExampleTrigger">
    <app-icon color="black">arrow_drop_down</app-icon>
  </button>
  <app-autocomplete #autocompleteExample="appAutocomplete" [options]="autocompleteOptions" />
  @if (autocompleteExampleModel | showControlError: 'autocompleteInputInvalid') {
  <app-error>Inserisci un valore valido</app-error>
  }
</app-form-field>
```
