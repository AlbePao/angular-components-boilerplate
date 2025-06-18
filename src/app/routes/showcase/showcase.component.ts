import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-showcase',
  imports: [],
  templateUrl: './showcase.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShowcaseComponent {}
