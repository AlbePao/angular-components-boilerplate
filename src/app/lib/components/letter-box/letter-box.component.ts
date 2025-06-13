import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-letter-box',
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterBoxComponent {
  @HostBinding('class') classes =
    'select-none flex justify-center items-center h-6 rounded-lg border border-b-2 border-gray py-1 px-2 box-border text-xs text-gray font-bold';
}
