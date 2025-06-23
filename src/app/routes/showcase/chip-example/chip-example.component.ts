import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ChipComponent } from '@lib/components/chip';

@Component({
  selector: 'app-chip-example',
  imports: [ChipComponent],
  templateUrl: './chip-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipExampleComponent {
  chips = [
    {
      value: 1,
      label: 'Value 1',
    },
    {
      value: 2,
      label: 'Value 2',
    },
    {
      value: 3,
      label: 'Value 3',
    },
  ];

  logChipRemove(value: number | null): void {
    console.log('Removed chip value', value);
  }
}
