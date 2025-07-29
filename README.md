# Angular Components Boilerplate

This boilerplate is an Angular v20 project with a collection of custom components previously developed by me to fit most of use cases in an enterprise application.

The architecture of the project is inspired from [angular-boilerplate](https://github.com/ju4n97/angular-boilerplate) by [ju4n97](https://github.com/ju4n97)

## Features

- [Angular v20](https://angular.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [ngx-translate v17](https://ngx-translate.org/)
- [Fontsource](https://fontsource.org/)

## Components documentation

### Shared components

Atomic components used across the whole application and in other composed components such as dialogs, layouts or page wrappers

- [Accordion](./src/app/lib/components/accordion/accordion.md)
- [Alert](./src/app/lib/components/alert/alert.md)
- [Alert Popup](./src/app/lib/components/alert-popup/alert-popup.md)
- [Autocomplete](./src/app/lib/components/autocomplete/autocomplete.md)
- [Button](./src/app/lib/components/button/button.md)
- [Card](./src/app/lib/components/card/card.md)
- [Checkbox](./src/app/lib/components/checkbox/checkbox.md)
- [Chip](./src/app/lib/components/chip/chip.md)
- [Dialog](./src/app/lib/components/dialog/dialog.md)
- [Form Field](./src/app/lib/components/form-field/form-field.md)
- [Icon](./src/app/lib/components/icon/icon.md)
- [Input](./src/app/lib/components/input/input.md)
- [Letter Box](./src/app/lib/components/letter-box/letter-box.md)
- [Menu](./src/app/lib/components/menu/menu.md)
- [Multiselect](./src/app/lib/components/multiselect/multiselect.md)
- [Paginator](./src/app/lib/components/paginator/paginator.md)
- [Pill](./src/app/lib/components/pill/pill.md)
- [Progress Bar](./src/app/lib/components/progress-bar/progress-bar.md)
- [Radio Group](./src/app/lib/components/radio-group/radio-group.md)
- [Radio Options](./src/app/lib/components/radio-options/radio-options.md)
- [Select](./src/app/lib/components/select/select.md)
- [Spinner](./src/app/lib/components/spinner/spinner.md)
- [Table](./src/app/lib/components/table/table.md)
- [Tabs Group](./src/app/lib/components/tabs-group/tabs-group.md)
- [Toast](./src/app/lib/components/toast/toast.md)
- [Toggle](./src/app/lib/components/toggle/toggle.md)
- [Tooltip](./src/app/lib/components/tooltip/tooltip.md)

### Layouts

Composed components used as layout wrappers for application routes

- [Horizontal Layout](./src/app/lib/layouts/horizontal-layout/horizontal-layout.component.md)
- [Main Layout](./src/app/lib/layouts/main-layout/main-layout.component.md)
- [Welcome Layout](./src/app/lib/layouts/welcome-layout/welcome-layout.component.md)

## Directives documentation

- [Focus Shortcut](./src/app/lib/directives/focus-shortcut.directive.md)
- [Focus Trigger](./src/app/lib/directives/focus-trigger.directive.md)
- [Form Focus Handler](./src/app/lib/directives/form-focus-handler.directive.md)
- [Input Date ISO](./src/app/lib/directives/input-date-iso.directive.md)

## Pipes Documentation

- [Placeholder](./src/app/lib/pipes/placeholder.md)

## Types documentation

- [Option](./src/app/lib/types/option.md)

## Services documentation

- [Hotkeys Service](./src/app/lib/services/hot-keys.service.md)

## Colors

### Gray palette

| Color                                                    | HEX Code  | Name           |
| -------------------------------------------------------- | --------- | -------------- |
| ![#F7F7F8](https://placehold.co/32x32/F7F7F8/F7F7F8.png) | `#F7F7F8` | `gray-lighter` |
| ![#EDEEF2](https://placehold.co/32x32/EDEEF2/EDEEF2.png) | `#EDEEF2` | `gray-light`   |
| ![#DADBDF](https://placehold.co/32x32/DADBDF/DADBDF.png) | `#DADBDF` | `gray`         |
| ![#B0B0B0](https://placehold.co/32x32/B0B0B0/B0B0B0.png) | `#B0B0B0` | `gray-dark`    |
| ![#636363](https://placehold.co/32x32/636363/636363.png) | `#636363` | `gray-darker`  |

### Primary palette

| Color                                                    | HEX Code  | Name              |
| -------------------------------------------------------- | --------- | ----------------- |
| ![#DEE7F8](https://placehold.co/32x32/DEE7F8/DEE7F8.png) | `#DEE7F8` | `primary-lighter` |
| ![#BCD0F0](https://placehold.co/32x32/BCD0F0/BCD0F0.png) | `#BCD0F0` | `primary-light`   |
| ![#2570EA](https://placehold.co/32x32/2570EA/2570EA.png) | `#2570EA` | `primary`         |
| ![#1F498E](https://placehold.co/32x32/1F498E/1F498E.png) | `#1F498E` | `primary-dark`    |

### Secondary palette

| Color                                                    | HEX Code  | Name                |
| -------------------------------------------------------- | --------- | ------------------- |
| ![#EEE1FF](https://placehold.co/32x32/EEE1FF/EEE1FF.png) | `#EEE1FF` | `secondary-lighter` |
| ![#DEC4FF](https://placehold.co/32x32/DEC4FF/DEC4FF.png) | `#DEC4FF` | `secondary-light`   |
| ![#9747FF](https://placehold.co/32x32/9747FF/9747FF.png) | `#9747FF` | `secondary`         |
| ![#6730AD](https://placehold.co/32x32/6730AD/6730AD.png) | `#6730AD` | `secondary-dark`    |

### Success palette

| Color                                                    | HEX Code  | Name              |
| -------------------------------------------------------- | --------- | ----------------- |
| ![#E1FCE7](https://placehold.co/32x32/E1FCE7/E1FCE7.png) | `#E1FCE7` | `success-lighter` |
| ![#C4FAD0](https://placehold.co/32x32/C4FAD0/C4FAD0.png) | `#C4FAD0` | `success-light`   |
| ![#47EF6C](https://placehold.co/32x32/47EF6C/47EF6C.png) | `#47EF6C` | `success`         |
| ![#2CAC49](https://placehold.co/32x32/2CAC49/2CAC49.png) | `#2CAC49` | `success-dark`    |

### Danger palette

| Color                                                    | HEX Code  | Name             |
| -------------------------------------------------------- | --------- | ---------------- |
| ![#FADBE5](https://placehold.co/32x32/FADBE5/FADBE5.png) | `#FADBE5` | `danger-lighter` |
| ![#F5B8CA](https://placehold.co/32x32/F5B8CA/F5B8CA.png) | `#F5B8CA` | `danger-light`   |
| ![#DF215A](https://placehold.co/32x32/DF215A/DF215A.png) | `#DF215A` | `danger`         |
| ![#BA2853](https://placehold.co/32x32/BA2853/BA2853.png) | `#BA2853` | `danger-dark`    |

### Info palette

| Color                                                    | HEX Code  | Name           |
| -------------------------------------------------------- | --------- | -------------- |
| ![#FFFBEC](https://placehold.co/32x32/FFFBEC/FFFBEC.png) | `#FFFBEC` | `info-lighter` |
| ![#FFF7D9](https://placehold.co/32x32/FFF7D9/FFF7D9.png) | `#FFF7D9` | `info-light`   |
| ![#FFE589](https://placehold.co/32x32/FFE589/FFE589.png) | `#FFE589` | `info`         |
| ![#F2AE2A](https://placehold.co/32x32/F2AE2A/F2AE2A.png) | `#F2AE2A` | `info-dark`    |

## Responsive grid system

The grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive and integrated with [TailwindCSS breakpoints](https://tailwindcss.com/docs/responsive-design) to allow different column sizes according to minimum screen width.

The layout uses grid system best practices by [working mobile first](https://tailwindcss.com/docs/responsive-design#working-mobile-first) as suggested by TailwindCSS documentation.

## Lint

This project uses [angular-eslint](https://github.com/angular-eslint/angular-eslint#readme) to lint with ESLint.

```bash
ng lint
```
