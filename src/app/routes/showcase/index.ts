import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/',
  },
  {
    path: 'accordion-example',
    title: 'Accordion | Showcase',
    loadComponent: async () =>
      (await import('./accordion-example/accordion-example.component')).AccordionExampleComponent,
  },
  {
    path: 'button-example',
    title: 'Buttons | Showcase',
    loadComponent: async () => (await import('./button-example/button-example.component')).ButtonExampleComponent,
  },
  {
    path: 'checkbox-example',
    title: 'Checkbox | Showcase',
    loadComponent: async () => (await import('./checkbox-example/checkbox-example.component')).CheckboxExampleComponent,
  },
  {
    path: 'radio-example',
    title: 'Radio | Showcase',
    loadComponent: async () => (await import('./radio-example/radio-example.component')).RadioExampleComponent,
  },
  {
    path: 'tabs-example',
    title: 'Tabs | Showcase',
    loadComponent: async () => (await import('./tabs-example/tabs-example.component')).TabsExampleComponent,
  },
  {
    path: 'toggle-example',
    title: 'Toggle | Showcase',
    loadComponent: async () => (await import('./toggle-example/toggle-example.component')).ToggleExampleComponent,
  },
];
