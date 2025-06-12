import { AppTheme } from './theme';

interface StorageObjectMap {
  appSession: {
    user: string;
    token: string;
  };
  appTheme: AppTheme;
}

export type StorageObjectType = 'appSession' | 'appTheme';

export interface StorageObjectData<T extends StorageObjectType> {
  type: T;
  data: StorageObjectMap[T];
}
