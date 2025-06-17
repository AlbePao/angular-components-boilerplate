# Welcome Layout

This layout provides a component for wrapping children routes for non-authenticated users

## Examples

```typescript
// example.routes.ts
export const routes: Routes = [
  // other imports...
  {
    path: 'welcome',
    // lazy loaded component
    loadComponent: () => WelcomeLayoutComponent,
    children: [
      // children paths...
    ],
  },
  // other paths...
];
```

```typescript
// example.routes.ts
export const routes: Routes = [
  // other imports...
  {
    path: 'welcome',
    // eager loaded component
    component: WelcomeLayoutComponent,
    children: [
      // children paths...
    ],
  },
  // other paths...
];
```
