# Main Layout

This layout provides a component for wrapping children routes for authenticated users

## Examples

```typescript
// example.routes.ts
export const routes: Routes = [
  // other imports...
  {
    path: 'welcome',
    // lazy loaded component
    loadComponent: () => MainLayoutComponent,
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
    component: MainLayoutComponent,
    children: [
      // children paths...
    ],
  },
  // other paths...
];
```
