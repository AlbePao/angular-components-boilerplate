import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TabChangeEvent, TabsGroupModule } from '@lib/components/tabs-group';

@Component({
  selector: 'app-tabs-group-example',
  imports: [RouterModule, TabsGroupModule],
  templateUrl: './tabs-group-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsGroupExampleComponent {
  onTabChange(event: TabChangeEvent): void {
    console.log('onTabChange', event);
  }
}

@Component({
  selector: 'app-tab-one-example',
  template: '<p>Tab one works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabOneExampleComponent {}

@Component({
  selector: 'app-tab-two-example',
  template: '<p>Tab two works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabTwoExampleComponent {}

@Component({
  selector: 'app-tab-three-example',
  template: '<p>Tab three works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabThreeExampleComponent {}
