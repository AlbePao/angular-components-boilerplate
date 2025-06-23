import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
  ViewChild,
  inject,
} from '@angular/core';
import { IconComponent } from '@lib/components/icon';
import { Option, OptionExtra } from '@lib/types/option';
import { getOptionScrollPosition } from '@lib/utils/getOptionScrollPosition';
import { TranslatePipe } from '@ngx-translate/core';
import { Subject } from 'rxjs';

let uniqueAutocompleteIdCounter = 0;

@Component({
  selector: 'app-autocomplete',
  imports: [TranslatePipe, IconComponent],
  exportAs: 'appAutocomplete',
  templateUrl: './autocomplete.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteComponent<T, E extends OptionExtra = never> {
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _currentOption: HTMLDivElement | null = null;
  private readonly _optionsUpdated$ = new Subject<Option<T, E>[]>();
  optionsUpdated$ = this._optionsUpdated$.asObservable();

  id = `app-autocomplete-${uniqueAutocompleteIdCounter++}`;
  filteredOptions: Option<T, E>[] = [];
  optionIndex = 0;
  panel: HTMLElement | null = null;

  @ViewChild(TemplateRef, { static: true }) template!: TemplateRef<unknown>;

  @Input()
  get options(): Option<T, E>[] {
    return this._options;
  }
  set options(options: Option<T, E>[] | null) {
    this._options = options ?? [];
    this.filteredOptions = this._options;
    this._optionsUpdated$.next(this._options);
    this._changeDetectorRef.markForCheck();
  }
  private _options: Option<T, E>[] = [];

  @Output() readonly optionChange = new EventEmitter<T>();
  @Output() readonly opened = new EventEmitter<void>();
  @Output() readonly closed = new EventEmitter<void>();

  setScrollTop(scrollTop: number): void {
    if (this.panel) {
      this.panel.scrollTop = scrollTop;
    }
  }

  getScrollTop(): number {
    return this.panel ? this.panel.scrollTop : 0;
  }

  highlightPrevOption(): void {
    // Focus previous enabled item which index is equal or more than 0
    let prevEnabledOptionIndex = 0;

    for (let i = this.optionIndex - 1; i >= 0; i--) {
      if (!this.filteredOptions[i]?.disabled) {
        prevEnabledOptionIndex = i;
        break;
      }
    }

    this.optionIndex = prevEnabledOptionIndex;
    this._updateOptionStatus();
  }

  highlightNextOption(): void {
    // Focus next enabled item which index is less than the filtered options length
    let nextEnabledOptionIndex = this.optionIndex;

    for (let i = this.optionIndex + 1; i < this.filteredOptions.length; i++) {
      if (!this.filteredOptions[i]?.disabled) {
        nextEnabledOptionIndex = i;
        break;
      }
    }

    this.optionIndex = nextEnabledOptionIndex;
    this._updateOptionStatus();
  }

  scrollToValueOption(value: T | null): void {
    const valueOptionIndex = this.filteredOptions.findIndex((option) => option.value === value);

    if (valueOptionIndex >= 0) {
      this.optionIndex = valueOptionIndex;
      this._updateOptionStatus();
    }
  }

  protected selectOption(option: Option<T, E>): void {
    if (!option.disabled) {
      this.optionChange.emit(option.value);
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
