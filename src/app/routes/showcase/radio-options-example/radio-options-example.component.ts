import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RadioOption, RadioOptionsComponent } from '@lib/components/radio-options';

@Component({
  selector: 'app-radio-options-example',
  imports: [ReactiveFormsModule, RadioOptionsComponent],
  templateUrl: './radio-options-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioOptionsExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  radioOptionsExamples: RadioOption<string>[] = [
    { value: 'example-1', label: 'Example One' },
    { value: 'example-2', label: 'Example Two' },
  ];

  form = this._fb.group({
    inputRadioControlExample: [true],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }

  logRadioChange(event: boolean | null): void {
    console.log('logRadioChange', event);
  }
}
