import { Directive, ElementRef, OnInit, inject, input } from '@angular/core';
import { HotKeysService } from '@lib/services/hot-keys.service';
import { injectDestroy } from '@lib/utils/injectDestroy';
import { takeUntil } from 'rxjs';

@Directive({
  selector: '[appFocusShortcut]',
})
export class FocusShortcutDirective implements OnInit {
  private readonly _destroy$ = injectDestroy();
  private readonly _hotKeysService = inject(HotKeysService);
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  readonly appFocusShortcutKeys = input<string>('control.s');

  ngOnInit(): void {
    this._hotKeysService
      .addShortcut({ keys: this.appFocusShortcutKeys() })
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => this._elementRef.nativeElement.focus());
  }
}
