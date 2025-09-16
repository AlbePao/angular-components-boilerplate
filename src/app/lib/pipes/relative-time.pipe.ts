import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService, Translation } from '@ngx-translate/core';

@Pipe({
  name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
  private readonly _translateService = inject(TranslateService);

  transform(value?: Date | string | number | null): Translation {
    if (!value) {
      return '';
    }

    const now = Date.now();
    const inputTime = new Date(value).getTime();
    const diffMs = now - inputTime;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) {
      return this._translateService.instant('pipes.relativeTime.justNow');
    } else if (minutes === 1) {
      return this._translateService.instant('pipes.relativeTime.minuteAgo');
    } else if (minutes > 1 && minutes < 60) {
      return this._translateService.instant('pipes.relativeTime.minutesAgo', { minutes });
    } else if (hours === 1) {
      return this._translateService.instant('pipes.relativeTime.hourAgo');
    } else if (hours > 1 && hours < 24) {
      return this._translateService.instant('pipes.relativeTime.hoursAgo', { hours });
    } else if (days === 1) {
      return this._translateService.instant('pipes.relativeTime.dayAgo');
    } else if (days > 1 && days < 7) {
      return this._translateService.instant('pipes.relativeTime.daysAgo', { days });
    }

    return new Date(value).toLocaleDateString();
  }
}
