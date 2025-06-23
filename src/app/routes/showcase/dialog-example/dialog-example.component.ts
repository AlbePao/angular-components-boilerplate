import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lib/components/button';
import { DialogService } from '@lib/components/dialog';
import { ExampleDialogComponent } from './example-dialog/example-dialog.component';

@Component({
  selector: 'app-dialog-example',
  imports: [ButtonComponent],
  templateUrl: './dialog-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogExampleComponent {
  private readonly _dialogService = inject(DialogService);

  openExampleDialog(): void {
    this._dialogService
      .open(ExampleDialogComponent, {
        data: { text: 'Example data' },
        width: '600px',
        height: '350px',
      })
      .closed.subscribe((dialogData) => {
        console.log('Dialog closed data:', dialogData);
      });
  }
}
