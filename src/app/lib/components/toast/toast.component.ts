import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { TOAST_DATA } from './toast-config';
import { ToastRef } from './toast-ref';

@Component({
  selector: 'app-toast',
  imports: [ButtonModule, IconComponent, TranslatePipe],
  templateUrl: './toast.component.html',
  host: {
    class: 'block',
  },
})
export class ToastComponent implements OnInit {
  private readonly _data = inject(TOAST_DATA);
  private readonly _toastRef = inject(ToastRef);

  get icon(): string | undefined {
    return this._data.icon;
  }

  get message(): string {
    return this._data.message;
  }

  get duration(): number {
    return this._data.duration ?? 5000;
  }

  get color(): string {
    const { color } = this._data;

    if (color === 'primary') {
      return 'text-primary bg-primary-lighter';
    } else if (color === 'secondary') {
      return 'text-secondary bg-secondary-lighter';
    } else if (color === 'success') {
      return 'text-success-dark bg-success-lighter';
    } else if (color === 'danger') {
      return 'text-danger-dark bg-danger-lighter';
    } else if (color === 'info') {
      return 'text-info-dark bg-info-lighter';
    }

    return 'text-gray-darker bg-gray-lighter';
  }

  ngOnInit(): void {
    setTimeout(() => this.close(), this.duration);
  }

  close(): void {
    this._toastRef.close();
  }
}
