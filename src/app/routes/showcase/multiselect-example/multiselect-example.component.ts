import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@lib/components/button';
import { FormFieldModule } from '@lib/components/form-field';
import { IconComponent } from '@lib/components/icon';
import { InputDirective } from '@lib/components/input';
import { MultiselectModule, MultiselectOption } from '@lib/components/multiselect';

@Component({
  selector: 'app-multiselect-example',
  imports: [ReactiveFormsModule, FormFieldModule, InputDirective, MultiselectModule, IconComponent, ButtonModule],
  templateUrl: './multiselect-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  multiselectOptions: MultiselectOption<string>[] = [
    {
      value: 'one',
      label: 'One',
      icon: 'face',
      disabled: false,
    },
    {
      value: 'two',
      label: 'Two',
      disabled: false,
      children: [
        {
          value: 'sub1',
          label: 'Sub One',
          icon: 'face',
          disabled: false,
        },
        {
          value: 'sub2',
          label: 'Sub Two',
          disabled: false,
        },
        {
          value: 'sub3',
          label: 'Sub Three',
          icon: 'face',
          disabled: true,
        },
      ],
    },
    {
      value: 'two',
      label: 'Two',
      disabled: false,
      children: [
        {
          value: 'sub1',
          label: 'Sub One',
          icon: 'face',
          disabled: false,
        },
        {
          value: 'sub2',
          label: 'Sub Two',
          disabled: false,
        },
        {
          value: 'sub3',
          label: 'Sub Three',
          icon: 'face',
          disabled: false,
        },
      ],
    },
    {
      value: 'three',
      label: 'Three',
      icon: 'face',
      disabled: true,
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

  logMultiselectValueChange(event: string[] | null): void {
    console.log('logMultiselectValueChange', event);
  }
}
