import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer';
import { NavbarComponent } from './navbar';

@Component({
  selector: 'app-horizontal-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './horizontal-layout.component.html',
})
export class HorizontalLayoutComponent {}
