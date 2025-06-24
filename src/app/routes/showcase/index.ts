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
    path: 'chip-example',
    title: 'Chip | Showcase',
    loadComponent: async () => (await import('./chip-example/chip-example.component')).ChipExampleComponent,
  },
  {
    path: 'dialog-example',
    title: 'Dialog | Showcase',
    loadComponent: async () => (await import('./dialog-example/dialog-example.component')).DialogExampleComponent,
  },
  {
    path: 'form-field-example',
    title: 'Form Field | Showcase',
    loadComponent: async () =>
      (await import('./form-field-example/form-field-example.component')).FormFieldExampleComponent,
  },
  {
    path: 'icon-example',
    title: 'Icon | Showcase',
    loadComponent: async () => (await import('./icon-example/icon-example.component')).IconExampleComponent,
  },
  {
    path: 'input-example',
    title: 'Input | Showcase',
    loadComponent: async () => (await import('./input-example/input-example.component')).InputExampleComponent,
  },
  {
    path: 'letter-box-example',
    title: 'Letter Box | Showcase',
    loadComponent: async () =>
      (await import('./letter-box-example/letter-box-example.component')).LetterBoxExampleComponent,
  },
  {
    path: 'menu-example',
    title: 'Menu | Showcase',
    loadComponent: async () => (await import('./menu-example/menu-example.component')).MenuExampleComponent,
  },
  {
    path: 'multiselect-example',
    title: 'Multiselect | Showcase',
    loadComponent: async () =>
      (await import('./multiselect-example/multiselect-example.component')).MultiselectExampleComponent,
  },
  {
    path: 'paginator-example',
    title: 'Paginator | Showcase',
    loadComponent: async () =>
      (await import('./paginator-example/paginator-example.component')).PaginatorExampleComponent,
  },
  {
    path: 'pill-example',
    title: 'Pill | Showcase',
    loadComponent: async () => (await import('./pill-example/pill-example.component')).PillExampleComponent,
  },
  {
    path: 'progress-bar-example',
    title: 'Progress Bar | Showcase',
    loadComponent: async () =>
      (await import('./progress-bar-example/progress-bar-example.component')).ProgressBarExampleComponent,
  },
  {
    path: 'radio-group-example',
    title: 'Radio Group | Showcase',
    loadComponent: async () =>
      (await import('./radio-group-example/radio-group-example.component')).RadioGroupExampleComponent,
  },
  {
    path: 'radio-options-example',
    title: 'Radio Options | Showcase',
    loadComponent: async () =>
      (await import('./radio-options-example/radio-options-example.component')).RadioOptionsExampleComponent,
  },
  {
    path: 'select-example',
    title: 'Select | Showcase',
    loadComponent: async () => (await import('./select-example/select-example.component')).SelectExampleComponent,
  },
  {
    path: 'spinner-example',
    title: 'Spinner | Showcase',
    loadComponent: async () => (await import('./spinner-example/spinner-example.component')).SpinnerExampleComponent,
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
