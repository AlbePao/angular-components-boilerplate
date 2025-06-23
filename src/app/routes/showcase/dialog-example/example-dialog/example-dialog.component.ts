import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lib/components/button';
import { DIALOG_DATA, DialogComponent, DialogRef } from '@lib/components/dialog';

@Component({
  selector: 'app-example-dialog',
  imports: [DialogComponent, ButtonComponent],
  templateUrl: './example-dialog.component.html',
  styles: `
    :host {
      width: 100%;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExampleDialogComponent {
  private readonly _dialogRef = inject(DialogRef);
  private readonly _data = inject<{ text: string }>(DIALOG_DATA);

  get exampleText(): string {
    return this._data.text;
  }

  close(): void {
    this._dialogRef.close('closed');
  }
}
