import { CdkMenuModule } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@lib/components/icon';
import { Colors } from '@lib/types/colors';
import { arrayAttribute } from '@lib/utils/array-attribute';
import { TranslatePipe } from '@ngx-translate/core';

type TextColors =
  | 'text-primary-dark'
  | 'text-secondary-dark'
  | 'text-success-dark'
  | 'text-danger'
  | 'text-info-dark'
  | 'text-gray-dark'
  | 'text-black';

export type MenuItem<T> = {
  icon?: string;
  color?: Colors;
  label: string;
  disabled?: boolean;
  hide?: boolean;
  divider?: boolean;
} & (
  | {
      children?: never;
      action?: never;
      link: string | null;
    }
  | {
      children?: never;
      action: T;
      link?: never;
    }
  | {
      children: MenuItem<T>[];
      action?: never;
      link?: never;
    }
);

@Component({
  selector: 'app-menu',
  imports: [IconComponent, RouterLink, TranslatePipe, CdkMenuModule],
  templateUrl: './menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent<T> {
  @ViewChild(TemplateRef, { static: true }) menu!: TemplateRef<unknown>;

  @Input({ transform: arrayAttribute }) items: MenuItem<T>[] = [];

  @Output() readonly menuAction = new EventEmitter<T>();

  dispatchAction(action: NonNullable<T>): void {
    this.menuAction.emit(action);
  }

  protected getMenuItemTextColor(color?: Colors): TextColors {
    if (color === 'primary') {
      return 'text-primary-dark';
    } else if (color === 'secondary') {
      return 'text-secondary-dark';
    } else if (color === 'success') {
      return 'text-success-dark';
    } else if (color === 'danger') {
      return 'text-danger';
    } else if (color === 'info') {
      return 'text-info-dark';
    } else if (color === 'gray') {
      return 'text-gray-dark';
    }

    return 'text-black';
  }

  protected getAnchorTagClasses(item: MenuItem<T>): Record<string, boolean> {
    return {
      [this.getMenuItemTextColor(item.color)]: true,
      'hover:bg-gray-lighter focus:outline-0': !item.disabled,
      'pointer-events-none opacity-50': !!item.disabled,
    };
  }
}
