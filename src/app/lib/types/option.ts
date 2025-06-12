export interface Option<T = string, E extends OptionExtra = never> {
  value: T;
  label: string;
  icon?: string;
  disabled?: boolean;
  extra?: E;
}

export type OptionExtra = Record<string, unknown>;
