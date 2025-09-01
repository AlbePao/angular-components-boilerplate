import { APP_ID, inject, Injectable } from '@angular/core';

const counters: Record<string, number> = {};

@Injectable({
  providedIn: 'root',
})
export class IdGeneratorService {
  private readonly _appId = inject(APP_ID);

  getId(prefix: string): string {
    if (this._appId !== 'ng') {
      prefix = `${this._appId}-${prefix}`;
    }

    if (!Object.prototype.hasOwnProperty.call(counters, prefix)) {
      counters[prefix] = 0;
    }

    return `${prefix}-${counters[prefix]!++}`;
  }
}
