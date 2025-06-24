import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lib/components/button';
import { ToastService } from '@lib/components/toast';

@Component({
  selector: 'app-toast-example',
  imports: [ButtonComponent],
  templateUrl: './toast-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastExampleComponent {
  private readonly _toastService = inject(ToastService);

  showToast(): void {
    this._toastService.show({
      color: 'primary',
      icon: 'face',
      message: 'Alert popup message',
      duration: 10000,
    });
  }

  showMultipleToast(): void {
    this._toastService.showMultiple([
      {
        color: 'primary',
        icon: 'face',
        message: 'Alert popup message 1',
        duration: 10000,
      },
      {
        color: 'secondary',
        icon: 'face',
        message: 'Alert popup message 2',
        duration: 10000,
      },
    ]);
  }
}
