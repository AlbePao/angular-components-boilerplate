import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { CheckboxComponent } from '@lib/components/checkbox';
import { IconComponent } from '@lib/components/icon';
import { Option } from '@lib/types/option';
import { getOptionScrollPosition } from '@lib/utils/get-option-scroll-position';
import { isArray } from '@lib/utils/value-checking';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';

let uniqueMultiselectIdCounter = 0;

export interface MultiselectOption<T> extends Option<T> {
  children?: Option<T>[];
}

export interface FlatMultiselectOption<T> extends Option<T> {
  index: number;
  parent?: FlatMultiselectOption<T>['index'];
}

let uniqueOptionIndex = 0;

function optionsFlattener<T>(options: MultiselectOption<T>[], parentIndex?: number): FlatMultiselectOption<T>[] {
  return options.reduce<FlatMultiselectOption<T>[]>((prev, curr) => {
    if (isArray(curr.children)) {
      const { children, ...updatedCurr } = curr;
      return [
        ...prev,
        { ...updatedCurr, parent: parentIndex, index: uniqueOptionIndex++ },
        ...optionsFlattener(children, uniqueOptionIndex - 1),
      ];
    }

    return [...prev, { ...curr, parent: parentIndex, index: uniqueOptionIndex++ }];
  }, []);
}

@Component({
  selector: 'app-multiselect',
  imports: [IconComponent, TranslatePipe, CheckboxComponent],
  exportAs: 'appMultiselect',
  templateUrl: './multiselect.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultiselectComponent<T> {
  private readonly _elementRef = inject<ElementRef<HTMLInputElement>>(ElementRef);

  private _currentOption: HTMLDivElement | null = null;
  private readonly _optionsUpdated$ = new Subject<Option<T>[]>();
  protected selection = new SelectionModel<FlatMultiselectOption<T>>(true);
  optionsUpdated$ = this._optionsUpdated$.asObservable();

  id = `app-multiselect-${uniqueMultiselectIdCounter++}`;
  optionIndex = 0;
  panel: HTMLElement | null = null;

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<unknown>;

  @Input()
  get options(): FlatMultiselectOption<T>[] {
    return this._options;
  }
  set options(options: MultiselectOption<T>[] | null) {
    this._options = isArray(options) ? optionsFlattener(options) : [];
    this._optionsUpdated$.next(this._options);
  }
  private _options: FlatMultiselectOption<T>[] = [];

  @Output() readonly selectionChange = new EventEmitter<T[]>();
  @Output() readonly opened = new EventEmitter<void>();
  @Output() readonly closed = new EventEmitter<void>();

  get hostElement(): HTMLInputElement {
    return this._elementRef.nativeElement;
  }

  setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.scrollTop = scrollTop;
    }
  }

  getScrollTop(): number {
    return this.panel ? this.panel.scrollTop : 0;
  }

  focusPrevOption(): void {
    // Focus previous enabled item which index is equal or more than 0
    let prevEnabledOptionIndex = 0;

    for (let i = this.optionIndex - 1; i >= 0; i--) {
      const option = this.options[i];

      if (option && !this.checkIfDisabled(option)) {
        prevEnabledOptionIndex = i;
        break;
      }
    }

    this.optionIndex = prevEnabledOptionIndex;
    this._updateOptionStatus();
  }

  focusNextOption(): void {
    // Focus next enabled item which index is less than the filtered options length
    let nextEnabledOptionIndex = this.optionIndex;

    for (let i = this.optionIndex + 1; i < this.options.length; i++) {
      const option = this.options[i];

      if (option && !this.checkIfDisabled(option)) {
        nextEnabledOptionIndex = i;
        break;
      }
    }

    this.optionIndex = nextEnabledOptionIndex;
    this._updateOptionStatus();
  }

  get selectedValues(): FlatMultiselectOption<T>[] {
    return this.selection.selected;
  }

  selectValues(values: FlatMultiselectOption<T>[]): void {
    this.selection.select(...values);
  }

  clearSelection(): void {
    this.selection.clear();
  }

  checkIfDisabled(option: FlatMultiselectOption<T>): boolean {
    return option.disabled ?? false;
  }

  toggleSelection(option: FlatMultiselectOption<T>, index: number, emitEvent = true): void {
    // Find parent
    const optionParent = this.options.find(({ index }) => index === option.parent) ?? null;

    if (this.selection.isSelected(option)) {
      this.selection.deselect(option);

      // If parent exists, set to unchecked
      if (optionParent) {
        this.selection.deselect(optionParent);
      }
    } else {
      // Find siblings
      const optionSiblings = this.options.filter(
        ({ index, parent, disabled }) => parent === option.parent && index !== option.index && !disabled,
      );
      const areAllSiblingsSelected = optionSiblings.every((option) => this.selection.isSelected(option));

      this.selection.select(option);

      // If all siblings are checked, checked, set parent to checked
      if (areAllSiblingsSelected && optionParent) {
        this.selection.select(optionParent);
      }
    }

    if (this.optionIndex !== index && emitEvent) {
      this.optionIndex = index;
    }

    this.options.forEach((child) => {
      if (child.parent === option.index && !child.disabled) {
        this.toggleSelection(child, child.index, false);
      }
    });

    if (emitEvent) {
      this.selectionChange.emit(this.selection.selected.map(({ value }) => value));
    }
  }

  private _updateOptionStatus(): void {
    if (this.panel) {
      this._currentOption = this.panel.children.item(this.optionIndex) as HTMLDivElement;
      this._scrollToOption(this.optionIndex);
    }
  }

  private _scrollToOption(index: number): void {
    if (index === 0) {
      this.setScrollTop(0);
    } else if (this.template && this._currentOption && this.panel) {
      const newScrollPosition = getOptionScrollPosition(
        this._currentOption.offsetTop,
        this._currentOption.offsetHeight,
        this.getScrollTop(),
        this.panel.offsetHeight,
      );
      this.setScrollTop(newScrollPosition);
    }
  }
}
