import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainHeaderComponent } from './main-header';
import { MainSidebarComponent } from './main-sidebar';

@Component({
  selector: 'app-main-layout',
  imports: [RouterOutlet, MainSidebarComponent, MainHeaderComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  host: {
    class: 'bg-slate-100 text-slate-900',
  },
})
export class MainLayoutComponent {}
