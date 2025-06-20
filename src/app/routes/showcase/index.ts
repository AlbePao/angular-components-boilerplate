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
    path: 'alert-example',
    title: 'Alert | Showcase',
    loadComponent: async () => (await import('./alert-example/alert-example.component')).AlertExampleComponent,
  },
  {
    path: 'alert-popup-example',
    title: 'Alert Popup | Showcase',
    loadComponent: async () =>
      (await import('./alert-popup-example/alert-popup-example.component')).AlertPopupExampleComponent,
  },
  {
    path: 'autocomplete-example',
    title: 'Autocomplete | Showcase',
    loadComponent: async () =>
      (await import('./autocomplete-example/autocomplete-example.component')).AutocompleteExampleComponent,
  },
  {
    path: 'button-example',
    title: 'Button | Showcase',
    loadComponent: async () => (await import('./button-example/button-example.component')).ButtonExampleComponent,
  },
  {
    path: 'card-example',
    title: 'Card | Showcase',
    loadComponent: async () => (await import('./card-example/card-example.component')).CardExampleComponent,
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
