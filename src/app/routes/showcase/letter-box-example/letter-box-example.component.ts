import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormFieldModule } from '@lib/components/form-field';
import { InputDirective } from '@lib/components/input';
import { LetterBoxComponent } from '@lib/components/letter-box';
import { FocusShortcutDirective } from '@lib/directives/focus-shortcut.directive';

@Component({
  selector: 'app-letter-box-example',
  imports: [FormFieldModule, InputDirective, LetterBoxComponent, FocusShortcutDirective],
  templateUrl: './letter-box-example.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LetterBoxExampleComponent {}
