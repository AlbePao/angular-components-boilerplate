import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from '@lib/components/button';
import { FileUploaderComponent } from '@lib/components/file-uploader';

@Component({
  selector: 'app-file-uploader-example',
  imports: [ReactiveFormsModule, FileUploaderComponent, ButtonComponent],
  templateUrl: './file-uploader-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploaderExampleComponent implements OnInit {
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

  toggleDisabled(): void {
    const { disabledFileUploadExample } = this.form.controls;

    if (disabledFileUploadExample.disabled) {
      disabledFileUploadExample.enable();
    } else {
      disabledFileUploadExample.disable();
    }
  }

  logFileChange(event: File[] | null, type: 'single' | 'multiple'): void {
    console.log('logFileChange', type, event);
  }
}
