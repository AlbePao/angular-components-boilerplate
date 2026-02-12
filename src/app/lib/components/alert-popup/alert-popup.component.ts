import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { ALERT_POPUP_DATA, AlertPopupData } from './alert-popup-config';
import { AlertPopupRef } from './alert-popup-ref';

@Component({
  selector: 'app-alert-popup',
  imports: [IconComponent, TranslatePipe],
  templateUrl: './alert-popup.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlertPopupComponent implements OnInit {
  private readonly _data = inject<AlertPopupData>(ALERT_POPUP_DATA);
  private readonly _alertPopupRef = inject(AlertPopupRef);

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
    setTimeout(() => this._close(), this.duration);
  }

  private _close(): void {
    this._alertPopupRef.close();
  }
}
