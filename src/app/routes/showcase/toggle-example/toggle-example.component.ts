import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ToggleComponent, ToggleOption } from '@lib/components/toggle';

@Component({
  selector: 'app-toggle-example',
  imports: [ToggleComponent, ReactiveFormsModule],
  templateUrl: './toggle-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  toggleOptions: ToggleOption<number>[] = [
    { value: 1, label: 'One' },
    { value: 2, label: 'Two' },
    { value: 3, label: 'Three', disabled: true },
  ];

  form = this._fb.group({
    toggleControlExample: [1],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }

  logToggleChange(event: number | null): void {
    console.log('logToggleChange', event);
  }
}
