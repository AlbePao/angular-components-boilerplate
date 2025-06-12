# Hotkeys Service

Binds a single hotkey to the whole page or a specific html element

## Type aliases

### `HotKeysOptions`

Allowed theme in the application

```typescript
type HotKeysOptions = {
  element: HTMLElement;
  keys: string;
};
```

- `element` (optional) the element to which the hotkey is bound. Default is `document`
- `keys` keys combination that triggers the observable

## Methods

### `addShortcut`

Sets application theme

#### Parameters

| Param     | Type                      | Description                                    |
| --------- | ------------------------- | ---------------------------------------------- |
| `options` | `Partial<HotKeysOptions>` | The new theme to be set                        |
| `destroy` | `Subject<void>`           | Handler to unsubscribe the shortcut observable |

#### Returns

`Observable<unknown>`
