import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-welcome-layout',
  imports: [RouterOutlet],
  template: `<router-outlet />`,
})
export class WelcomeLayoutComponent {}
