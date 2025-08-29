import { ChangeDetectionStrategy, Component, booleanAttribute, inject, input } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { DialogRef } from './dialog-ref';

@Component({
  selector: 'app-dialog',
  imports: [ButtonModule, IconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogComponent {
  private readonly _dialogRef = inject(DialogRef);

  readonly showClose = input(false, { transform: booleanAttribute });

  close(): void {
    this._dialogRef.close();
  }
}
