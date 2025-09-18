import { InjectionToken, Provider } from '@angular/core';
import { name, version } from 'package.json';

interface PackageJson {
  name: string;
  version: string;
}

export const PACKAGE_JSON = new InjectionToken<PackageJson>('PackageJson');

export const providePackageJson = (): Provider => ({
  provide: PACKAGE_JSON,
  useValue: { name, version } satisfies PackageJson,
});
