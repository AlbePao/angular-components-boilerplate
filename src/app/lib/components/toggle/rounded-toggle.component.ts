import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IconComponent } from '@lib/components/icon';
import { provideFocusableItem } from '@lib/providers/focusable-item';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { ToggleBase } from './toggle-base';

export type RoundedToggleSize = 'md' | 'lg';

@Component({
  selector: 'app-rounded-toggle',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './rounded-toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideFocusableItem(RoundedToggleComponent), provideNgValueAccessor(RoundedToggleComponent)],
})
export class RoundedToggleComponent<T> extends ToggleBase<T> implements ControlValueAccessor {
  @Input() size: RoundedToggleSize = 'md';
}
