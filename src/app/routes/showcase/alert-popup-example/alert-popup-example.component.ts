import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AlertPopupService } from '@lib/components/alert-popup';
import { ButtonComponent } from '@lib/components/button';

@Component({
  selector: 'app-alert-popup-example',
  imports: [ButtonComponent],
  templateUrl: './alert-popup-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPopupExampleComponent {
  private readonly _alertPopupService = inject(AlertPopupService);

  showAlert(): void {
    this._alertPopupService.show({
      icon: 'face',
      message: 'Alert popup message',
      duration: 10000,
    });
  }
}
