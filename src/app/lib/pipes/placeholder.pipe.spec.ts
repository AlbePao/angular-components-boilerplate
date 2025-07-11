import { PlaceholderPipe } from './placeholder.pipe';

describe('PlaceholderPipe', () => {
  let pipe: PlaceholderPipe;

  beforeEach(() => {
    pipe = new PlaceholderPipe();
  });

  it('should return non-empty string unchanged', () => {
    expect(pipe.transform('hello')).toBe('hello');
    expect(pipe.transform('Angular')).toBe('Angular');
  });

  it('should return placeholder for empty string', () => {
    expect(pipe.transform('')).toBe('-');
    expect(pipe.transform('', 'N/A')).toBe('N/A');
  });

  it('should return number values unchanged (including 0)', () => {
    expect(pipe.transform(42)).toBe(42);
    expect(pipe.transform(0)).toBe(0);
  });

  it('should return default placeholder for null or undefined numbers', () => {
    expect(pipe.transform(null)).toBe('-');
    expect(pipe.transform(undefined)).toBe('-');
  });

  it('should return custom placeholder for nullish values', () => {
    expect(pipe.transform(null, 'none')).toBe('none');
    expect(pipe.transform(undefined, 'N/A')).toBe('N/A');
  });
});
