import { EventEmitter, InjectionToken, Provider, Type } from '@angular/core';

/** This class is injected and extended in components that should be identified by FormFocusHandler directive to handle its focus */
export interface FocusableItem {
  /** Unique item identifier */
  id: string;
  /** Native element of the item ElementRef */
  hostElement: HTMLElement;
  /** Whether component should be required or not in order to be focused by relative hotkeys or not */
  required: boolean;
  /** Whether component is disabled to prevent FormFocusHandler behavior */
  disabled: boolean;
  /** Whether to prevent FormFocusHandler from focusing item */
  shouldSkipFocus?: boolean;
  /** Whether to prevent FormFocusHandler behavior independently from component enabled/disabled status */
  shouldPreventNextItemFocus?: boolean;
  /** Used by FormFocusHandler to be aware of component focus event  */
  elementFocus: EventEmitter<void>;
  /** Used by FormFocusHandler to be aware of component blur event  */
  elementBlur: EventEmitter<void>;
  /** Used to focus component programmatically */
  focusItem(): void;
}

export const FOCUSABLE_ITEM = new InjectionToken<FocusableItem>('FocusableItem');

export const provideFocusableItem = (useExisting: Type<unknown>): Provider => ({
  provide: FOCUSABLE_ITEM,
  useExisting,
});
