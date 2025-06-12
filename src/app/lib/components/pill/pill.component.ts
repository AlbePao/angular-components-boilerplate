import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Colors } from '@lib/types/colors';

export type PillSize = 'sm' | 'md' | 'lg';

export type PillAppearance = 'fill' | 'outline';

@Component({
  selector: 'app-pill',
  standalone: true,
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PillComponent {
  @Input()
  get appearance(): PillAppearance {
    return this._appearance;
  }
  set appearance(appearance: PillAppearance | null) {
    this._appearance = appearance ?? 'fill';
  }
  private _appearance: PillAppearance = 'fill';

  @Input()
  get size(): PillSize {
    return this._size;
  }
  set size(size: PillSize | null) {
    this._size = size ?? 'sm';
  }
  private _size: PillSize = 'sm';

  @Input()
  get color(): Colors {
    return this._color;
  }
  set color(color: Colors | null) {
    this._color = color ?? 'gray';
  }
  private _color: Colors = 'gray';

  @HostBinding('class')
  get classes(): string {
    return `inline-flex justify-content items-center select-none whitespace-nowrap rounded-full ${this.sizeClasses} ${this.colorClasses}`;
  }

  get sizeClasses(): string {
    if (this.size === 'sm') {
      return 'h-5 px-2 gap-1 text-xs font-bold [&>app-icon]:text-sm/none';
    } else if (this.size === 'md') {
      return 'h-8 px-3 gap-2 text-sm/none font-medium [&>app-icon]:text-xl/none';
    }

    return 'h-10 px-4 gap-2 text-sm/none font-semibold [&>app-icon]:text-xl/none';
  }

  get colorClasses(): string {
    if (this.appearance === 'outline') {
      if (this.color === 'primary') {
        return 'box-border border text-primary border-primary';
      } else if (this.color === 'secondary') {
        return 'box-border border text-secondary border-secondary';
      } else if (this.color === 'success') {
        return 'box-border border text-success-dark border-success';
      } else if (this.color === 'danger') {
        return 'box-border border text-danger-dark border-danger';
      } else if (this.color === 'info') {
        return 'box-border border text-info-dark border-info';
      }

      return 'box-border border text-gray-darker border-gray';
    }

    if (this.color === 'primary') {
      return 'text-primary bg-primary-lighter';
    } else if (this.color === 'secondary') {
      return 'text-secondary bg-secondary-lighter';
    } else if (this.color === 'success') {
      return 'text-success-dark bg-success-lighter';
    } else if (this.color === 'danger') {
      return 'text-danger-dark bg-danger-lighter';
    } else if (this.color === 'info') {
      return 'text-info-dark bg-info-lighter';
    }

    return 'text-gray-darker bg-gray-lighter';
  }
}
