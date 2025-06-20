import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CheckboxComponent } from '@lib/components/checkbox';

@Component({
  selector: 'app-checkbox-example',
  imports: [ReactiveFormsModule, CheckboxComponent],
  templateUrl: './checkbox-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    inputCheckboxControlExample: [true],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }

  logCheckboxChange(event: boolean | null): void {
    console.log('logCheckboxChange', event);
  }
}
