import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { IconComponent } from '@lib/components/icon';
import { provideFocusableItem } from '@lib/providers/focusable-item';
import { provideNgValueAccessor } from '@lib/providers/ng-value-accessor';
import { TranslatePipe } from '@ngx-translate/core';
import { ToggleBase } from './toggle-base';

@Component({
  selector: 'app-toggle',
  imports: [IconComponent, TranslatePipe],
  templateUrl: './toggle.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideFocusableItem(ToggleComponent), provideNgValueAccessor(ToggleComponent)],
})
export class ToggleComponent<T> extends ToggleBase<T> implements ControlValueAccessor {
  @Input() labelPosition: 'before' | 'after' = 'before';
}
