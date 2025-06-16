import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { IconComponent } from '@lib/components/icon';
import { TOAST_DATA } from '@lib/components/toast/toast-config';
import { ToastRef } from '@lib/components/toast/toast-ref';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntil, timer } from 'rxjs';

@Component({
  selector: 'app-toast',
  imports: [ButtonModule, IconComponent, TranslatePipe],
  templateUrl: './toast.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'block',
  },
})
export class ToastComponent implements OnInit {
  private readonly _data = inject(TOAST_DATA);
  private readonly _toastRef = inject(ToastRef);
  private readonly _destroy$ = injectDestroy();

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
    if (this._data.color === 'primary') {
      return 'text-primary bg-primary-lighter';
    } else if (this._data.color === 'secondary') {
      return 'text-secondary bg-secondary-lighter';
    } else if (this._data.color === 'success') {
      return 'text-success-dark bg-success-lighter';
    } else if (this._data.color === 'danger') {
      return 'text-danger-dark bg-danger-lighter';
    } else if (this._data.color === 'info') {
      return 'text-info-dark bg-info-lighter';
    }

    return 'text-gray-darker bg-gray-lighter';
  }

  ngOnInit(): void {
    timer(this.duration)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this.close();
      });
  }

  close(): void {
    this._toastRef.close();
  }
}
