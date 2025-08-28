import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormFieldModule } from '@lib/components/form-field';
import { SelectDirective } from '@lib/components/select';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-select-example',
  imports: [ReactiveFormsModule, FormFieldModule, SelectDirective, TranslatePipe],
  templateUrl: './select-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    selectControlExample: ['1'],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }

  logSelectChange(event: Event): void {
    console.log('logSelectChange', event);
  }
}
