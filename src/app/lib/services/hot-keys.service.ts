import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { Observable } from 'rxjs';

interface HotKeysOptions {
  element: HTMLElement;
  keys: string;
}

// Find more about this service here: https://netbasal.com/diy-keyboard-shortcuts-in-your-angular-application-4704734547a2
@Injectable({
  providedIn: 'root',
})
export class HotKeysService {
  private readonly _eventManager = inject(EventManager);
  private readonly _document = inject(DOCUMENT);

  private _registeredKeys: string[] = [];
  private readonly _defaults: HotKeysOptions = {
    element: this._document.body,
    keys: '',
  };

  addShortcut(options: Partial<HotKeysOptions>): Observable<unknown> {
    const merged = { ...this._defaults, ...options };
    const event = `keydown.${merged.keys}`;

    // If we register another shortcut which is already registered, throw an error
    if (this._registeredKeys.find((key) => key === event)) {
      throw new Error('HotKeysService: There are two or more shortcuts registered with same hotkeys');
    } else {
      this._registeredKeys = [...this._registeredKeys, event];
    }

    return new Observable((observer) => {
      const handler = (event: Event): void => {
        event.preventDefault();
        observer.next(event);
      };

      const dispose: () => void = this._eventManager.addEventListener(merged.element, event, handler) as () => void;

      return () => {
        this._registeredKeys = this._registeredKeys.filter((key) => key !== event);

        dispose();
      };
    });
  }
}
