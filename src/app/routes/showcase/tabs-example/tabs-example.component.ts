import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TabChangeEvent, TabsModule } from '@lib/components/tabs';

@Component({
  selector: 'app-tabs-example',
  imports: [TabsModule],
  templateUrl: './tabs-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsExampleComponent {
  onTabChange(event: TabChangeEvent): void {
    console.log('onTabChange', event);
  }
}
