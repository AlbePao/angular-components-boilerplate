import { Signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';

export function debounceSignal<T>(signal: Signal<T>, delay: number, initialValue: T): Signal<T> {
  const signalObservable = toObservable(signal);

  return toSignal(signalObservable.pipe(debounceTime(delay)), { initialValue });
}
