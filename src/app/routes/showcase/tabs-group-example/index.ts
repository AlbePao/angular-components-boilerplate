import { Route } from '@angular/router';

export const routes: Route[] = [
  {
    path: '',
    loadComponent: async () => (await import('./tabs-group-example.component')).TabsGroupExampleComponent,
    children: [
      {
        path: 'tab-1',
        loadComponent: async () => (await import('./tabs-group-example.component')).TabOneExampleComponent,
      },
      {
        path: 'tab-2',
        loadComponent: async () => (await import('./tabs-group-example.component')).TabTwoExampleComponent,
      },
      {
        path: 'tab-3',
        loadComponent: async () => (await import('./tabs-group-example.component')).TabThreeExampleComponent,
      },
    ],
  },
];
