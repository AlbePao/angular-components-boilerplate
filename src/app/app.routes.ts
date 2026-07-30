import { Routes } from '@angular/router';
import { authGuard } from '@lib/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: async () => (await import('@lib/layouts/welcome-layout')).WelcomeLayoutComponent,
    loadChildren: async () => (await import('@routes/auth')).routes,
    canMatch: [authGuard({ requiresAuthentication: false })],
  },
  {
    path: '',
    loadComponent: async () => (await import('@lib/layouts/horizontal-layout')).HorizontalLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: async () => (await import('@routes/home')).routes,
      },
      {
        path: 'users/:username',
        loadChildren: async () => (await import('@routes/user')).routes,
      },
      {
        path: 'settings',
        loadChildren: async () => (await import('@routes/settings')).routes,
      },
    ],
    canMatch: [authGuard()],
  },
  {
    path: 'showcase',
    loadComponent: async () => (await import('@lib/layouts/main-layout')).MainLayoutComponent,
    loadChildren: async () => (await import('@routes/showcase')).routes,
    canMatch: [authGuard()],
  },
  {
    path: '**',
    loadComponent: async () => (await import('@routes/screens/not-found/not-found.component')).NotFoundComponent,
  },
];
