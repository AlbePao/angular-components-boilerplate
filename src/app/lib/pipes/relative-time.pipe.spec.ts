import { TestBed } from '@angular/core/testing';
import { InterpolationParameters, TranslateService } from '@ngx-translate/core';
import { RelativeTimePipe } from './relative-time.pipe';

describe('RelativeTimePipe', () => {
  let mockTranslate: { instant: jasmine.Spy };
  const fixedNow = new Date('2025-09-16T12:00:00.000Z').getTime();
  const originalDateNow = Date.now;

  beforeEach(() => {
    // Freeze Date.now to a fixed timestamp so calculations are deterministic
    Date.now = (): number => fixedNow;

    // Simple mock: instant(key, params?) -> "key" or "key:{"param":value}"
    mockTranslate = {
      instant: jasmine
        .createSpy('instant')
        .and.callFake((key: string, params?: InterpolationParameters) =>
          params ? `${key}${JSON.stringify(params)}` : key,
        ),
    };

    TestBed.configureTestingModule({
      providers: [{ provide: TranslateService, useValue: mockTranslate }],
    });
  });

  afterEach(() => {
    // Restore Date.now
    Date.now = originalDateNow;
  });

  function createPipe(): RelativeTimePipe {
    return TestBed.runInInjectionContext(() => new RelativeTimePipe());
  }

  it('returns empty string for falsy input', () => {
    const pipe = createPipe();
    expect(pipe.transform(null)).toBe('');
    expect(pipe.transform(undefined)).toBe('');
    expect(mockTranslate.instant).not.toHaveBeenCalled();
  });

  it('returns "justNow" when < 60 seconds', () => {
    const pipe = createPipe();
    const value = new Date(fixedNow - 30 * 1000); // 30s ago
    const res = pipe.transform(value) as string;
    expect(res).toBe('pipes.relativeTime.justNow');
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.justNow');
  });

  it('returns "minuteAgo" when exactly 1 minute', () => {
    const pipe = createPipe();
    const value = new Date(fixedNow - 60 * 1000); // 1 minute ago
    const res = pipe.transform(value) as string;
    expect(res).toBe('pipes.relativeTime.minuteAgo');
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.minuteAgo');
  });

  it('returns "minutesAgo" with correct minutes param', () => {
    const pipe = createPipe();
    const minutes = 5;
    const value = new Date(fixedNow - minutes * 60 * 1000);
    const res = pipe.transform(value) as string;
    expect(res).toBe(`pipes.relativeTime.minutesAgo${JSON.stringify({ minutes })}`);
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.minutesAgo', { minutes });
  });

  it('returns "hourAgo" when exactly 1 hour', () => {
    const pipe = createPipe();
    const value = new Date(fixedNow - 60 * 60 * 1000); // 1 hour ago
    const res = pipe.transform(value) as string;
    expect(res).toBe('pipes.relativeTime.hourAgo');
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.hourAgo');
  });

  it('returns "hoursAgo" with correct hours param', () => {
    const pipe = createPipe();
    const hours = 5;
    const value = new Date(fixedNow - hours * 60 * 60 * 1000);
    const res = pipe.transform(value) as string;
    expect(res).toBe(`pipes.relativeTime.hoursAgo${JSON.stringify({ hours })}`);
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.hoursAgo', { hours });
  });

  it('returns "dayAgo" when exactly 1 day', () => {
    const pipe = createPipe();
    const value = new Date(fixedNow - 24 * 60 * 60 * 1000); // 1 day ago
    const res = pipe.transform(value) as string;
    expect(res).toBe('pipes.relativeTime.dayAgo');
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.dayAgo');
  });

  it('returns "daysAgo" with correct days param', () => {
    const pipe = createPipe();
    const days = 5;
    const value = new Date(fixedNow - days * 24 * 60 * 60 * 1000);
    const res = pipe.transform(value) as string;
    expect(res).toBe(`pipes.relativeTime.daysAgo${JSON.stringify({ days })}`);
    expect(mockTranslate.instant).toHaveBeenCalledWith('pipes.relativeTime.daysAgo', { days });
  });

  it('falls back to toLocaleDateString for dates >= 24 days', () => {
    const pipe = createPipe();
    const days = 25;
    const value = new Date(fixedNow - days * 24 * 60 * 60 * 1000);
    const expected = value.toLocaleDateString();
    const res = pipe.transform(value) as string;
    expect(res).toBe(expected);
  });

  it('accepts numeric and string date inputs', () => {
    const pipe = createPipe();
    const minutes = 2;
    const numericValue = fixedNow - minutes * 60 * 1000;
    const stringValue = new Date(numericValue).toISOString();

    const resNum = pipe.transform(numericValue) as string;
    expect(resNum).toBe(`pipes.relativeTime.minutesAgo${JSON.stringify({ minutes })}`);

    const resStr = pipe.transform(stringValue) as string;
    expect(resStr).toBe(`pipes.relativeTime.minutesAgo${JSON.stringify({ minutes })}`);
  });
});
