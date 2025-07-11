import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {
  transform(value?: string | number | null, placeholderText = '-'): string | number {
    if (typeof value === 'string') {
      return value.length > 0 ? value : placeholderText;
    }

    return value ?? placeholderText;
  }
}
