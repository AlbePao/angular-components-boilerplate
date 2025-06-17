import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards/auth.guard';
import { HorizontalLayoutComponent } from '@lib/layouts/horizontal-layout';
import { WelcomeLayoutComponent } from '@lib/layouts/welcome-layout';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () => WelcomeLayoutComponent,
    loadChildren: async () => (await import('@routes/auth')).routes,
    canMatch: [authGuard({ requiresAuthentication: false })],
  },
  {
    path: '',
    loadComponent: () => HorizontalLayoutComponent,
    loadChildren: async () => (await import('@routes/home')).routes,
    canMatch: [authGuard()],
  },
  {
    path: 'users/:username',
    loadComponent: () => HorizontalLayoutComponent,
    loadChildren: async () => (await import('@routes/user')).routes,
    canMatch: [authGuard()],
  },
  {
    path: 'settings',
    loadComponent: () => HorizontalLayoutComponent,
    loadChildren: async () => (await import('@routes/settings')).routes,
    canMatch: [authGuard()],
  },
  {
    path: '**',
    loadComponent: async () => (await import('@routes/screens/not-found/not-found.component')).NotFoundComponent,
  },
];
