import { AppTheme } from './theme';
import { User } from './user';

interface StorageObjectMap {
  appSession: User;
  appTheme: AppTheme;
  appLang: string;
}

export type StorageObjectType = keyof StorageObjectMap;

export interface StorageObjectData<T extends StorageObjectType> {
  type: T;
  data: StorageObjectMap[T];
}
