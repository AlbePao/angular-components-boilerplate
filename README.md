# Angular Components Boilerplate

This boilerplate is an Angular v20 project with a collection of custom components previously developed by me to fit most of use cases in an enterprise application.

The architecture of the project is inspired from [angular-boilerplate](https://github.com/ju4n97/angular-boilerplate) by [ju4n97](https://github.com/ju4n97)

## Features

- [Angular v20](https://angular.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [ngx-translate v16](https://ngx-translate.org/)
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

| Color                                                                    | HEX Code  | Name           |
| ------------------------------------------------------------------------ | --------- | -------------- |
| <div style="width: 32px; height: 32px; background-color: #F7F7F8"></div> | `#F7F7F8` | `gray-lighter` |
| <div style="width: 32px; height: 32px; background-color: #EDEEF2"></div> | `#EDEEF2` | `gray-light`   |
| <div style="width: 32px; height: 32px; background-color: #DADBDF"></div> | `#DADBDF` | `gray`         |
| <div style="width: 32px; height: 32px; background-color: #B0B0B0"></div> | `#B0B0B0` | `gray-dark`    |
| <div style="width: 32px; height: 32px; background-color: #636363"></div> | `#636363` | `gray-darker`  |

### Primary palette

| Color                                                                    | HEX Code  | Name              |
| ------------------------------------------------------------------------ | --------- | ----------------- |
| <div style="width: 32px; height: 32px; background-color: #DEE7F8"></div> | `#DEE7F8` | `primary-lighter` |
| <div style="width: 32px; height: 32px; background-color: #BCD0F0"></div> | `#BCD0F0` | `primary-light`   |
| <div style="width: 32px; height: 32px; background-color: #2570EA"></div> | `#2570EA` | `primary`         |
| <div style="width: 32px; height: 32px; background-color: #1F498E"></div> | `#1F498E` | `primary-dark`    |

### Secondary palette

| Color                                                                    | HEX Code  | Name                |
| ------------------------------------------------------------------------ | --------- | ------------------- |
| <div style="width: 32px; height: 32px; background-color: #EEE1FF"></div> | `#EEE1FF` | `secondary-lighter` |
| <div style="width: 32px; height: 32px; background-color: #DEC4FF"></div> | `#DEC4FF` | `secondary-light`   |
| <div style="width: 32px; height: 32px; background-color: #9747FF"></div> | `#9747FF` | `secondary`         |
| <div style="width: 32px; height: 32px; background-color: #6730AD"></div> | `#6730AD` | `secondary-dark`    |

### Success palette

| Color                                                                    | HEX Code  | Name              |
| ------------------------------------------------------------------------ | --------- | ----------------- |
| <div style="width: 32px; height: 32px; background-color: #E1FCE7"></div> | `#E1FCE7` | `success-lighter` |
| <div style="width: 32px; height: 32px; background-color: #C4FAD0"></div> | `#C4FAD0` | `success-light`   |
| <div style="width: 32px; height: 32px; background-color: #47EF6C"></div> | `#47EF6C` | `success`         |
| <div style="width: 32px; height: 32px; background-color: #2CAC49"></div> | `#2CAC49` | `success-dark`    |

### Danger palette

| Color                                                                    | HEX Code  | Name             |
| ------------------------------------------------------------------------ | --------- | ---------------- |
| <div style="width: 32px; height: 32px; background-color: #FADBE5"></div> | `#FADBE5` | `danger-lighter` |
| <div style="width: 32px; height: 32px; background-color: #F5B8CA"></div> | `#F5B8CA` | `danger-light`   |
| <div style="width: 32px; height: 32px; background-color: #DF215A"></div> | `#DF215A` | `danger`         |
| <div style="width: 32px; height: 32px; background-color: #BA2853"></div> | `#BA2853` | `danger-dark`    |

### Info palette

| Color                                                                    | HEX Code  | Name           |
| ------------------------------------------------------------------------ | --------- | -------------- |
| <div style="width: 32px; height: 32px; background-color: #FFFBEC"></div> | `#FFFBEC` | `info-lighter` |
| <div style="width: 32px; height: 32px; background-color: #FFF7D9"></div> | `#FFF7D9` | `info-light`   |
| <div style="width: 32px; height: 32px; background-color: #FFE589"></div> | `#FFE589` | `info`         |
| <div style="width: 32px; height: 32px; background-color: #F2AE2A"></div> | `#F2AE2A` | `info-dark`    |

## Responsive grid system

The grid system uses a series of containers, rows, and columns to layout and align content. It’s built with flexbox and is fully responsive and integrated with [TailwindCSS breakpoints](https://tailwindcss.com/docs/responsive-design) to allow different column sizes according to minimum screen width.

The layout uses grid system best practices by [working mobile first](https://tailwindcss.com/docs/responsive-design#working-mobile-first) as suggested by TailwindCSS documentation.

## Lint

This project uses [angular-eslint](https://github.com/angular-eslint/angular-eslint#readme) to lint with ESLint.

```bash
ng lint
```
