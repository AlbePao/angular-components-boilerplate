import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RadioGroupModule } from '@lib/components/radio-group';
import { APP_LANGS } from '@lib/constants';
import { StorageService } from '@lib/services/storage.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  imports: [RadioGroupModule, TranslatePipe],
  templateUrl: './language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {
  private readonly _translateService = inject(TranslateService);
  private readonly _storageService = inject(StorageService);

  get currentLang(): string {
    return this._translateService.getCurrentLang();
  }

  changeLanguage(value: unknown): void {
    if (typeof value === 'string' && APP_LANGS.includes(value)) {
      this._storageService.setItem('appLang', value);
      void this._translateService.use(value);
    }
  }
}
