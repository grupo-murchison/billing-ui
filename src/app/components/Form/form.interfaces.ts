import { ReactNode } from 'react';
import { Control } from 'react-hook-form';

export type FromProps = ActionButtonsProps & {
  children?: ReactNode;
  onSubmit?: () => void;
  label?: HintedString<TLabel>;
};

export type ActionButtonsProps = {
  isSubmitting?: boolean;
  handleClose?: () => void;
  label?: string;
};

type HintedString<T extends string> = (string & {}) | T;

type TLabel = 'search' | 'create' | 'update';

export type FormSelectProps = {
  control: Control<any>;
  name: string;
  options?: any[];
  disabled?: boolean;
  disabledEmpty?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  onChange?: any;
  emptyOption?: boolean;
};

export type FormInputsCommonProps = {
  disabled?: boolean;
  error?: boolean;
  label: string;
  helperText?: string;
  name: string;
  onChange?: any;
};
