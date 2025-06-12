export function isArray<T>(value: unknown): value is T[] {
  return Array.isArray(value);
}

export function arrayHasDuplicates(array: unknown[]): boolean {
  return new Set(array).size !== array.length;
}

export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
