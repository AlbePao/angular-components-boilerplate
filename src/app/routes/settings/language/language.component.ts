import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RadioGroupModule } from '@lib/components/radio-group';
import { APP_LANGS } from '@lib/constants';
import { storage } from '@lib/storage';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language',
  imports: [RadioGroupModule, TranslatePipe],
  templateUrl: './language.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageComponent {
  private readonly _translateService = inject(TranslateService);

  get currentLang(): string {
    return this._translateService.currentLang;
  }

  changeLanguage(value: unknown): void {
    if (typeof value === 'string' && APP_LANGS.includes(value)) {
      storage.setItem('appLang', value);
      void this._translateService.use(value);
    }
  }
}
