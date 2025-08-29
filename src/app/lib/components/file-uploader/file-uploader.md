# File Uploader

The `<app-file-uploader>`component provides AAAAAAA.

## Inputs

| Input      | Description                                                      | Type                 |
| ---------- | ---------------------------------------------------------------- | -------------------- |
| `id`       | (optional) Unique ID for the component                           | `string`             |
| `type`     | Whether should upload single or multiple file (default `single`) | `single`, `multiple` |
| `disabled` | Whether the file uploader is disabled                            | `boolean`            |

## Outputs

| Output        | Description                                    | Type emitted |
| ------------- | ---------------------------------------------- | ------------ |
| `filesChange` | Event emitted when the files list list changes | `File[]`     |

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FileUploaderComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    singleFileUploadExample: [''],
    multipleFileUploadExample: [''],
    disabledFileUploadExample: [{ value: '', disabled: true }],
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
<form [formGroup]="form" class="mb-10">
  <h3>Single file upload</h3>
  <app-file-uploader formControlName="singleFileUploadExample" />
  <h3>Multiple file upload</h3>
  <app-file-uploader formControlName="multipleFileUploadExample" type="multiple" />
  <h3>Disabled file upload</h3>
  <app-file-uploader formControlName="disabledFileUploadExample" type="multiple" />
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FileUploaderComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  logFileChange(event: File[] | null, type: 'single' | 'multiple'): void {
    console.log('logFileChange', type, event);
  }
}
```

```html
<!-- example.component.html -->
<h3>Single file upload</h3>
<app-file-uploader (filesChange)="logFileChange($event, 'single')" />
<h3>Multiple file upload</h3>
<app-file-uploader type="multiple" (filesChange)="logFileChange($event, 'multiple')" />
<h3>Disabled file upload</h3>
<app-file-uploader disabled (filesChange)="logFileChange($event, 'multiple')" />
```
