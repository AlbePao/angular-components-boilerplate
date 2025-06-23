import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldModule } from '@lib/components/form-field';
import { InputDirective } from '@lib/components/input';

@Component({
  selector: 'app-input-example',
  imports: [ReactiveFormsModule, FormFieldModule, InputDirective],
  templateUrl: './input-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    firstInputControl: ['', Validators.required],
    secondInputControl: ['', Validators.required],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }
}
