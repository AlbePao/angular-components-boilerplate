import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutocompleteModule } from '@lib/components/autocomplete';
import { ButtonModule } from '@lib/components/button';
import { FormFieldModule } from '@lib/components/form-field';
import { IconComponent } from '@lib/components/icon';
import { InputDirective } from '@lib/components/input';
import { Option } from '@lib/types/option';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-autocomplete-example',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FormFieldModule,
    InputDirective,
    AutocompleteModule,
    IconComponent,
    ButtonModule,
    TranslatePipe,
  ],
  templateUrl: './autocomplete-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  autocompleteValue: number | null = null;

  autocompleteOptions: Option<number>[] = [
    { value: 1, label: 'One', icon: 'home' },
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

  logAutocompleteValueChange(event: number | null): void {
    console.log('logAutocompleteValueChange', event);
  }

  logAutocompleteInputChange(event: string): void {
    console.log('logAutocompleteInputChange', event);
  }
}
