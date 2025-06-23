import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonModule } from '@lib/components/button';
import { MenuItem, MenuModule } from '@lib/components/menu';

@Component({
  selector: 'app-menu-example',
  imports: [MenuModule, ButtonModule],
  templateUrl: './menu-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuExampleComponent {
  menuItems: MenuItem<string>[] = [
    {
      icon: 'logout',
      label: 'Logout',
      action: 'logout',
    },
    {
      label: 'Lorem Ipsum',
      disabled: true,
      divider: true,
    },
    {
      label: 'Lorem Ipsum',
      children: [
        {
          icon: 'face',
          label: 'Lorem Ipsum',
          action: 'exampleAction',
        },
        {
          label: 'Lorem Ipsum',
          link: '/home',
        },
      ],
    },
    {
      icon: 'face',
      label: 'Lorem Ipsum',
      action: 'exampleAction',
    },
    {
      label: 'Lorem Ipsum',
      link: '/home',
    },
  ];

  logMenuAction(event: string): void {
    console.log('logMenuAction', event);
  }
}
