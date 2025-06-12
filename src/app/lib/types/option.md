# `Option<T, E>` interface

The `Option<T, E>` interface is the backbone of data in all of the application. Almost every component that handles or displays data inherits from this interface

- `value` value of type `T` of the option
- `label` label of the option
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display next to the label
- `disabled` (optional) whether the option is disabled or not
- `extra` (optional) extra data of type `E` associated to option
