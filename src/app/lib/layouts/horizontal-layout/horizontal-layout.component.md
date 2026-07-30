# Horizontal Layout

This layout provides an alternative component for wrapping content for authenticated users

## Examples

```typescript
// example.routes.ts
export const routes: Routes = [
  // other imports...
  {
    path: 'welcome',
    // lazy loaded component
    loadComponent: async () => (await import('path/to/component')).HorizontalLayoutComponent,
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
