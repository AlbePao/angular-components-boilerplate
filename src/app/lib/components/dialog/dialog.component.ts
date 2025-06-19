import { ChangeDetectionStrategy, Component, Input, booleanAttribute, inject } from '@angular/core';
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

  @Input({ transform: booleanAttribute }) showClose = false;

  close(): void {
    this._dialogRef.close();
  }
}
