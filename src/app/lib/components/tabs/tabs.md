# Tabs

The `<app-tab-group>` organize content into separate views where only one view can be visible at a time. Each tab's label is shown in the tab header and the active tab's label is designated with the ink bar.

The active tab may be set using the `selected` input or when the user selects one of the tab labels in the header.

The `<app-tab-nav-group>` provides instead a tab-like UI for navigating between routes. It is not tied to any particular router; it works with normal `<a>` elements and uses the active property to determine which tab is currently active. The corresponding `<router-outlet>` should typically be placed relatively close to the `<app-tab-nav-group>`.

## `<app-tab-group>` Outputs

| Output      | Description                                      | Type             |
| ----------- | ------------------------------------------------ | ---------------- |
| `tabChange` | Event emitted when the tab selection has changed | `TabChangeEvent` |

## `<app-tab>` and `[app-tab-nav-link]` Inputs

| Input   | Description                             | Type     |
| ------- | --------------------------------------- | -------- |
| `label` | (`<app-tab>` only) The label of the tab | `string` |
| `name`  | (optional) The name of the tab          | `string` |
| `id`    | (optional) The id of the tab            | `string` |

## Interfaces

### `TabChangeEvent`

A simple change event emitted on focus or selection changes

```typescript
interface TabChangeEvent {
  index: number;
  tab: TabComponent;
}
```

- `index` Index of the currently-selected tab
- `tab` Reference to the currently-selected tab

## Example `<app-tab-group>`

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    TabsModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  onTabChange(event: TabChangeEvent): void {
    console.log('onTabChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-tab-group (tabChange)="onTabChange($event)">
  <app-tab label="Tab 1 Title">Tab 1 Content</app-tab>
  <app-tab label="Tab 2 Title">Tab 2 Content</app-tab>
  <app-tab label="Tab 3 Title">Tab 3 Content</app-tab>
  <app-tab label="Tab 4 Title">Tab 4 Content</app-tab>
</app-tab-group>
```

## Example `<app-tab-nav-group>`

```typescript
// example.routes.ts
export const ROUTES: Route[] = [
  {
    path: '',
    loadComponent: async () => (await import('./example.component')).ExampleComponent,
    children: [
      {
        path: 'tab-1',
        loadComponent: async () => (await import('./tab-1.component')).TabOneComponent,
      },
      {
        path: 'tab-2',
        loadComponent: async () => (await import('./tab-2.component')).TabTwoComponent,
      },
      {
        path: 'tab-3',
        loadComponent: async () => (await import('./tab-3.component')).TabThreeComponent,
      },
    ],
  },
];

// tab-1.component.ts
@Component({
  // other stuff...
  template: '<p>Tab one works!</p>',
  // other stuff...
})
export class TabOneComponent {}

// tab-2.component.ts
@Component({
  // other stuff...
  template: '<p>Tab two works!</p>',
  // other stuff...
})
export class TabTwoComponent {}

// tab-3.component.ts
@Component({
  // other stuff...
  template: '<p>Tab three works!</p>',
  // other stuff...
})
export class TabThreeComponent {}

// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    TabsModule,
    RouterModule,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-tab-nav-group>
  <a app-tab-nav-link routerLink="tab-1">Tab one</a>
  <a app-tab-nav-link routerLink="tab-2">Tab two</a>
  <a app-tab-nav-link routerLink="tab-3">Tab three</a>
  <router-outlet />
</app-tab-nav-group>
```
