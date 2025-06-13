import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { TranslatePipe } from '@ngx-translate/core';
import { takeUntil, timer } from 'rxjs';
import { ALERT_POPUP_DATA, AlertPopupData } from './alert-popup-config';
import { AlertPopupRef } from './alert-popup-ref';

@Component({
  selector: 'app-alert-popup',
  standalone: true,
  imports: [IconComponent, TranslatePipe],
  templateUrl: './alert-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPopupComponent implements OnInit {
  private readonly _data = inject<AlertPopupData>(ALERT_POPUP_DATA);
  private readonly _alertPopupRef = inject(AlertPopupRef);
  private readonly _destroy$ = injectDestroy();

  get icon(): string {
    return this._data.icon;
  }

  get message(): string {
    return this._data.message;
  }

  get duration(): number {
    return this._data.duration ?? 5000;
  }

  ngOnInit(): void {
    timer(this.duration)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._close();
      });
  }

  private _close(): void {
    this._alertPopupRef.close();
  }
}
