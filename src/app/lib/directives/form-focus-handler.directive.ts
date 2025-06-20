import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ContentChildren,
  Directive,
  Input,
  OnInit,
  QueryList,
  booleanAttribute,
  inject,
} from '@angular/core';
import { FocusableItem } from '@lib/providers/focusable-item';
import { HotKeysService } from '@lib/services/hot-keys.service';
import { injectDestroy } from '@lib/utils/inject-destroy';
import { arrayHasDuplicates } from '@lib/utils/value-checking';
import { Subject, filter, map, merge, repeat, startWith, switchMap, take, takeUntil } from 'rxjs';

const NO_ITEMS_INDEX = -1;

@Directive({
  selector: 'form[focusHandler]',
  host: {
    // Following attribute prevents native autocomplete of the browser to be shown on the input field
    'attr.autocomplete': 'off',
  },
})
export class FormFocusHandlerDirective implements OnInit, AfterViewInit {
  private readonly _document = inject(DOCUMENT);
  private readonly _hotKeysService = inject(HotKeysService);
  private readonly _destroy$ = injectDestroy();

  private readonly _pauseHandler$ = new Subject<void>();
  private readonly _resumeHandler$ = new Subject<void>();
  private readonly _focusableItems$ = new Subject<FocusableItem[]>();
  private _focusableItems: FocusableItem[] = [];
  private _currentItemIndex = 0;

  // Focus handling is made by following https://stackoverflow.com/a/51756493
  @ContentChildren(FocusableItem, { descendants: true }) focusableItems = new QueryList<FocusableItem>();

  @Input({ alias: 'focusHandler', transform: booleanAttribute })
  set enabled(enabled: boolean) {
    this._enabled = enabled;

    if (!enabled) {
      this._pauseHandler$.next();
    } else if (enabled && this._focusableItems.length > 0) {
      this._focusableItems[this._currentItemIndex]?.focusItem();
      this._resumeHandler$.next();
    }
  }
  private _enabled = false;

  ngOnInit(): void {
    merge(
      this._hotKeysService.addShortcut({ keys: 'enter' }).pipe(
        map(() => false),
        // We disable this rule because we need this operators' order to handle pause and resume status of this observable
        // eslint-disable-next-line rxjs-x/no-unsafe-takeuntil
        takeUntil(this._pauseHandler$),
        repeat({ delay: () => this._resumeHandler$ }),
      ),
      this._hotKeysService.addShortcut({ keys: 'control.enter' }).pipe(
        map(() => true),
        // We disable this rule because we need this operators' order to handle pause and resume status of this observable
        // eslint-disable-next-line rxjs-x/no-unsafe-takeuntil
        takeUntil(this._pauseHandler$),
        repeat({ delay: () => this._resumeHandler$ }),
      ),
    )
      .pipe(
        filter(() => this._isFocusOnFocusableItem()),
        takeUntil(this._destroy$),
      )
      .subscribe((shouldItemBeRequired) => this._focusNextItem(shouldItemBeRequired));
  }

  ngAfterViewInit(): void {
    // Listen all focusable items focus event by subscribing to their focus output. When an item
    // is focused by a KeyboardEvent, a PointerEvent or by focusItem() method, assign its index
    // position inside the form to _currentItemIndex
    this._focusableItems$
      .pipe(
        switchMap((items) =>
          merge(...items.map((item, index) => item.elementFocus.pipe(map(() => ({ item, index }))))),
        ),
        takeUntil(this._destroy$),
      )
      .subscribe(({ index }) => (this._currentItemIndex = index));

    this.focusableItems.changes
      .pipe(startWith(null), takeUntil(this._destroy$))
      .subscribe(() => this._setFocusableItems());
    this.focusableItems.changes.pipe(take(1)).subscribe(() => this._handleFirstItemStatus());

    this._focusableItems = this.focusableItems.toArray();
    this._focusFirstItem();
  }

  private _isFocusOnFocusableItem(): boolean {
    // Focus handler should not be triggered when active element is a button
    return this._document.activeElement?.tagName.toLowerCase() !== 'button';
  }

  private _setFocusableItems(): void {
    const focusableItems = this.focusableItems.toArray();
    const focusableItemsIds = focusableItems.map((item) => item.id);
    const hasFocusableItemsDuplicatedIds = arrayHasDuplicates(focusableItemsIds);

    if (hasFocusableItemsDuplicatedIds) {
      throw new Error('FormFocusHandlerDirective: Two or more focusable items have the same id assigned');
    }

    this._focusableItems = focusableItems;
    this._focusableItems$.next(this._focusableItems);

    if (this._enabled) {
      this._focusableItems[this._currentItemIndex]?.focusItem();
    }
  }

  private _handleFirstItemStatus(): void {
    const { disabled, shouldSkipFocus } = this.focusableItems.first;

    // This method works on the first form control that is disabled programmatically after a page init, for example in a ngOnInit() method
    if (this._currentItemIndex === 0 && (disabled || !!shouldSkipFocus)) {
      // If current focusable item is the first but it's disabled or cannot be focused because of shouldSkipFocus attribute, find the closest enabled item that allows focus and focus it
      const firstEnabledItemIndex = this._focusableItems.findIndex((item) => !item.disabled && !item.shouldSkipFocus);
      this._focusableItems[firstEnabledItemIndex]?.focusItem();
    }
  }

  private _focusFirstItem(): void {
    // This method works only on form controls that are disabled on page initialization
    // Select index of the first enabled item that allows focus
    const firstEnabledItemIndex = this._focusableItems.findIndex((item) => !item.disabled && !item.shouldSkipFocus);

    if (firstEnabledItemIndex > NO_ITEMS_INDEX) {
      // Focus first enabled item
      this._focusableItems[firstEnabledItemIndex]?.focusItem();
    }
  }

  private _focusNextItem(shouldItemBeRequired: boolean): void {
    const currentItem = this._focusableItems[this._currentItemIndex];
    const shouldFocusNextItem =
      this._currentItemIndex + 1 < this._focusableItems.length && !currentItem?.shouldPreventNextItemFocus;

    if (shouldFocusNextItem) {
      // Select next enabled item index which allows focus on it. If shouldItemBeRequired is true, select next enabled and required item
      const nextEnabledItemIndex = this._focusableItems.findIndex((item, index) =>
        shouldItemBeRequired
          ? !item.disabled && index > this._currentItemIndex && !item.shouldSkipFocus && item.required
          : !item.disabled && index > this._currentItemIndex && !item.shouldSkipFocus,
      );

      // Focus next enabled item. Its index will be assigned to _currentItemIndex
      // because of the subscription in ngAfterViewInit()
      if (nextEnabledItemIndex > NO_ITEMS_INDEX) {
        this._focusableItems[nextEnabledItemIndex]?.focusItem();
      }
    }
  }
}
