import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldModule } from '@lib/components/form-field';
import { IconComponent } from '@lib/components/icon/icon.component';
import { InputDirective } from '@lib/components/input';

@Component({
  selector: 'app-form-field-example',
  imports: [FormFieldModule, ReactiveFormsModule, InputDirective, IconComponent],
  templateUrl: './form-field-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    firstInputControl: ['', Validators.required],
    secondInputControl: ['', Validators.required],
    thirdInputControl: ['', Validators.required],
    fourthInputControl: [{ value: '', disabled: true }, Validators.required],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }
}
