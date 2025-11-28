import { inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE } from '@lib/tokens/local-storage';
import { SESSION_STORAGE } from '@lib/tokens/session-storage';
import { StorageObjectData, StorageObjectType } from '@lib/types/storage';

interface StorageOptions {
  api?: 'LocalStorage' | 'SessionStorage';
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly _sessionStorage = inject(SESSION_STORAGE);
  private readonly _localStorage = inject(LOCAL_STORAGE);

  private _getStorageApi(api: StorageOptions['api']): Storage {
    return api === 'SessionStorage' ? this._sessionStorage : this._localStorage;
  }

  // TODO: make these methods async with signals and effect
  getItem<T extends StorageObjectType>(item: T, options?: StorageOptions): StorageObjectData<T>['data'] | null {
    const api = this._getStorageApi(options?.api ?? 'LocalStorage');
    const data = api.getItem(item.toString());
    return data ? (JSON.parse(data) as StorageObjectData<T>['data']) : null;
  }

  setItem<T extends StorageObjectType>(
    itemName: T,
    data: StorageObjectData<T>['data'],
    options?: StorageOptions,
  ): void {
    if (data === null || data === undefined) {
      return;
    }

    const api = this._getStorageApi(options?.api ?? 'LocalStorage');
    api.setItem(itemName, JSON.stringify(data));
  }

  removeItem<T extends StorageObjectType>(item: T, options?: StorageOptions): void {
    const api = this._getStorageApi(options?.api ?? 'LocalStorage');
    api.removeItem(item);
  }

  clear(options?: StorageOptions): void {
    const api = this._getStorageApi(options?.api ?? 'LocalStorage');
    api.clear();
  }
}
