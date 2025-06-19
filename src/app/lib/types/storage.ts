import { AppTheme } from './theme';
import { User } from './user';

interface StorageObjectMap {
  appSession: User;
  appTheme: AppTheme;
}

export type StorageObjectType = 'appSession' | 'appTheme';

export interface StorageObjectData<T extends StorageObjectType> {
  type: T;
  data: StorageObjectMap[T];
}
