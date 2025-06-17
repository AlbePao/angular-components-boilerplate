import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-horizontal-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './horizontal-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalLayoutComponent {}
