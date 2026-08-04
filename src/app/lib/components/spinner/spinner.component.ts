import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  host: {
    class: 'block',
  },
})
export class SpinnerComponent {
  readonly diameter = input(32, { transform: numberAttribute });
}
