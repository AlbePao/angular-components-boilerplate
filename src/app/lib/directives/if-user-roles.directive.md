# If User Roles

This structural directive applies to any element that allows conditional rendering based on user roles.

## Inputs

| Input            | Description                                                 | Type                       |
| ---------------- | ----------------------------------------------------------- | -------------------------- |
| `appIfUserRoles` | List of permissions that user must have to view the element | `AuthRoles[]`, `AuthRoles` |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    IfUserRolesDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<div *appIfUserRoles="admins">This element is visible only to users with 'admins' role</div>

<div *appIfUserRoles="viewers">This element is visible only to users with 'viewers' role</div>

<div *appIfUserRoles="['admins', 'viewers']">
  This element is visible only to users with 'admins' or 'viewers' roles
</div>
```
