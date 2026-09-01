const FORBIDDEN_KEYS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Parses a JSON string like `JSON.parse`, dropping any `__proto__`/`constructor`/`prototype`
 * keys to prevent prototype pollution when the source is untrusted (e.g. browser storage).
 */
export function safeJsonParse<T>(value: string): T {
  return JSON.parse(value, (key, val: unknown) => (FORBIDDEN_KEYS.has(key) ? undefined : val)) as T;
}
