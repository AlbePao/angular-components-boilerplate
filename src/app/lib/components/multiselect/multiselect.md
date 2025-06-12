# Multiselect

The multiselect is a text input enhanced by a panel of suggested options.

Start by creating the multiselect panel and the options displayed inside it. Each option should be passed as `option` input.

```html
<app-multiselect #multiSelect="appMultiselect" [options]="options" />
```

Next, create the input and set the `appMultiselect` input to refer to the template reference we assigned to the multiselect. Let's assume you're using the `formControlName` directive from `ReactiveFormsModule` to track the value of the input. The input type **must** be `text`

Now we'll need to link the text input to its panel. We can do this by exporting the multiselect panel instance into a local template variable (here we called it "multiSelect"), and binding that variable to the input's `appMultiselect` property.

```html
<input type="text" placeholder="Pick one" appInput formControlName="myControl" [appMultiselect]="multiSelect" />
```

## `input[appInput][appMultiselect]`

The directive associated to `input[appInput]` that triggers the multiselect panel opening

### Inputs

| Input                    | Description                              | Type                   |
| ------------------------ | ---------------------------------------- | ---------------------- |
| `appMultiselect`         | The multiselect panel component instance | `MultiselectComponent` |
| `appMultiselectDisabled` | Whether multiselect is disabled          | `boolean`              |

### Outputs

| Output         | Description                                         | Type emitted  |
| -------------- | --------------------------------------------------- | ------------- |
| `valueChange`  | Event emitted when `[appMultiselect]` value changes | `T[]`, `null` |
| `elementFocus` | Event emitted when the component gets focused       | `void`        |
| `elementBlur`  | Event emitted when the component loses focus        | `void`        |

## `app-multiselect`

The multiselect panel with related options

### Inputs

| Input     | Description                           | Type                     |
| --------- | ------------------------------------- | ------------------------ |
| `options` | Options to display in the multiselect | `MultiselectOption<T>[]` |

### Outputs

| Output            | Description                         | Type emitted  |
| ----------------- | ----------------------------------- | ------------- |
| `selectionChange` | Event emitted when an option is set | `T[]`, `null` |
| `opened`          | Event emitted when panel is opened  | `void`        |
| `closed`          | Event emitted when panel is closed  | `void`        |

### Interfaces

#### `MultiselectOption<T> extends Option<T>`

Used to describe a single option

- `value` value of the option
- `label` label of the option
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display next to the label
- `disabled` (optional) whether the option is disabled or not
- `children` (optional) an array of `Option<T>`

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
    MultiselectModule,
    IconComponent,
    ButtonModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  multiselectOptions: MultiselectOption<string>[] = [
    {
      value: 'one',
      label: 'One',
      icon: 'face',
      disabled: false,
      extra: { data: 'test1' },
    },
    {
      value: 'two',
      label: 'Two',
      disabled: false,
      extra: { data: 'test2' },
      children: [
        {
          value: 'roba1',
          label: 'RobaOne',
          icon: 'face',
          disabled: false,
          extra: { data: 'robaTest1' },
        },
        {
          value: 'roba2',
          label: 'RobaTwo',
          disabled: false,
          extra: { data: 'robaTest2' },
        },
        {
          value: 'roba3',
          label: 'RobaThree',
          icon: 'face',
          disabled: true,
          extra: { data: 'robaTest3' },
        },
      ],
    },
    {
      value: 'two',
      label: 'Two',
      disabled: false,
      extra: { data: 'test2' },
      children: [
        {
          value: 'roba1',
          label: 'RobaOne',
          icon: 'face',
          disabled: false,
          extra: { data: 'robaTest1' },
        },
        {
          value: 'roba2',
          label: 'RobaTwo',
          disabled: false,
          extra: { data: 'robaTest2' },
        },
        {
          value: 'roba3',
          label: 'RobaThree',
          icon: 'face',
          disabled: false,
          extra: { data: 'robaTest3' },
        },
      ],
    },
    {
      value: 'three',
      label: 'Three',
      icon: 'face',
      disabled: true,
      extra: { data: 'test3' },
    },
  ];

  form = this._fb.group({
    multiselectControlExample: this._fb.control<string[] | null>(['one']),
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
    <app-label>Multiselect Control Example</app-label>
    <input
      appInput
      type="text"
      formControlName="multiselectControlExample"
      [appMultiselect]="multiselectExample"
      #multiselectControlExampleTrigger
    />
    <button app-icon-button type="button" appSuffix [appFocus]="multiselectControlExampleTrigger">
      <app-icon color="black">arrow_drop_down</app-icon>
    </button>
    <app-multiselect #multiselectExample="appMultiselect" [options]="multiselectOptions" />
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
    MultiselectModule,
    IconComponent,
    ButtonModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  multiselectOptions: MultiselectOption<string>[] = [
    {
      value: 'one',
      label: 'One',
      icon: 'face',
      disabled: false,
      extra: { data: 'test1' },
    },
    {
      value: 'two',
      label: 'Two',
      disabled: false,
      extra: { data: 'test2' },
      children: [
        {
          value: 'roba1',
          label: 'RobaOne',
          icon: 'face',
          disabled: false,
          extra: { data: 'robaTest1' },
        },
        {
          value: 'roba2',
          label: 'RobaTwo',
          disabled: false,
          extra: { data: 'robaTest2' },
        },
        {
          value: 'roba3',
          label: 'RobaThree',
          icon: 'face',
          disabled: true,
          extra: { data: 'robaTest3' },
        },
      ],
    },
    {
      value: 'two',
      label: 'Two',
      disabled: false,
      extra: { data: 'test2' },
      children: [
        {
          value: 'roba1',
          label: 'RobaOne',
          icon: 'face',
          disabled: false,
          extra: { data: 'robaTest1' },
        },
        {
          value: 'roba2',
          label: 'RobaTwo',
          disabled: false,
          extra: { data: 'robaTest2' },
        },
        {
          value: 'roba3',
          label: 'RobaThree',
          icon: 'face',
          disabled: false,
          extra: { data: 'robaTest3' },
        },
      ],
    },
    {
      value: 'three',
      label: 'Three',
      icon: 'face',
      disabled: true,
      extra: { data: 'test3' },
    },
  ];

  logMultiselectValueChange(event: string | null): void {
    console.log('logMultiselectValueChange', event);
  }

  logMultiselectInputChange(event: string): void {
    console.log('logMultiselectInputChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-form-field>
  <app-label>Multiselect Example</app-label>
  <input
    appInput
    type="text"
    [appMultiselect]="multiselectExample"
    #multiselectExampleTrigger
    (valueChange)="logMultiselectValueChange($event)"
  />
  <button app-icon-button type="button" appSuffix [appFocus]="multiselectExampleTrigger">
    <app-icon color="black">arrow_drop_down</app-icon>
  </button>
  <app-multiselect #multiselectExample="appMultiselect" [options]="multiselectOptions" />
</app-form-field>
```
