import { AUTOCOMPLETE_INPUT_INVALID } from '@lib/components/autocomplete';

export type ControlErrors =
  | 'required'
  | 'pattern'
  | 'email'
  | 'minlength'
  | 'maxlength'
  | 'min'
  | 'max'
  | typeof AUTOCOMPLETE_INPUT_INVALID;
