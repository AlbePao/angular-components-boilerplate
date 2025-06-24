import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RadioGroupModule } from '@lib/components/radio-group';

@Component({
  selector: 'app-radio-group-example',
  imports: [RadioGroupModule, ReactiveFormsModule],
  templateUrl: './radio-group-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    radioControlExample: ['Test 1'],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }

  logRadioChange(event: unknown): void {
    console.log('logRadioChange', event);
  }
}
