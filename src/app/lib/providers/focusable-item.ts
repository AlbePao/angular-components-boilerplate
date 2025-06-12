import { EventEmitter, Provider, Type } from '@angular/core';

/** This class is injected and extended in components that should be identified by FormFocusHandler directive to handle its focus */
export abstract class FocusableItem {
  /** Unique item identifier */
  abstract id: string;
  /** Native element of the item ElementRef */
  abstract hostElement: HTMLElement;
  /** Whether component should be required or not in order to be focused by relative hotkeys or not */
  abstract required: boolean;
  /** Whether component is disabled to prevent FormFocusHandler behavior */
  abstract disabled: boolean;
  /** Whether to prevent FormFocusHandler from focusing item */
  abstract shouldSkipFocus?: boolean;
  /** Whether to prevent FormFocusHandler behavior independently from component enabled/disabled status */
  abstract shouldPreventNextItemFocus?: boolean;
  /** Used by FormFocusHandler to be aware of component focus event  */
  abstract elementFocus: EventEmitter<void>;
  /** Used by FormFocusHandler to be aware of component blur event  */
  abstract elementBlur: EventEmitter<void>;
  /** Used to focus component programmatically */
  abstract focusItem(): void;
  /** Used in combination with HostBinding to detect focusable items in DOM */
  abstract appFocusable: boolean | null;
}

export const provideFocusableItem = (useExisting: Type<unknown>): Provider => {
  return {
    provide: FocusableItem,
    useExisting,
  };
};
