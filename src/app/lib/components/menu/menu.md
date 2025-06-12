# Menu

The `<app-menu>` component is a floating panel containing list of options.

By itself, the `<app-menu>` element does not render anything. The menu is attached to and opened via application of the `appMenuTriggerFor` directive:

```html
<button app-button [appMenuTriggerFor]="appMenu.menu">Menu</button>
```

## Inputs

| Input   | Description                      | Type         |
| ------- | -------------------------------- | ------------ |
| `items` | The items to display in the menu | `MenuItem[]` |

## Outputs

| Output       | Description                              | Type emitted |
| ------------ | ---------------------------------------- | ------------ |
| `menuAction` | Action emitted on action menu item click | `T`          |

## Interfaces

### `MenuItem<T>`

Used to describe a single menu item

- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) of the item
- `label` label of the item
- `color` (optional) color of the label from `Colors` type
- `disabled` (optional) whether the item is disabled or not
- `hide` (optional) whether the item is visually hidden to user
- `divider` (optional) whether to show a divider under the item or not
- `children` an array of `MenuItem<T>` children of the current item
- `action` an action of type `T` which indicates what action is fired on menu item click
- `link` the link to navigate to

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    MenuModule,
    ButtonModule,
    IconComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
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

  logMenuAction(event: string) {
    console.log('logMenuAction', event);
  }
}
```

```html
<!-- example.component.html -->
<button app-icon-button [appMenuTriggerFor]="appMenu.menu">
  <app-icon>more_vert</app-icon>
</button>
<app-menu #appMenu [items]="menuItems" (menuAction)="logMenuAction($event)" />
```
