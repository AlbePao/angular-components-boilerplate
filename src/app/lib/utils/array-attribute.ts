import { isArray } from './value-checking';

export function arrayAttribute(value: unknown) {
  return isArray(value) ? value : [];
}
