import { ReactNode } from 'react';
import { Control } from 'react-hook-form';

export type FromProps = {
  children?: ReactNode;
  //TODO esto deberia ser opcional para las View? onSubmit y isSubmitting
  onSubmit?: any;
  isSubmitting: boolean;
  handleClose: any;
  isUpdate?: boolean;
  isView?: boolean;
};

export type ActionButtonsProps = {
  isSubmitting: boolean;
  handleClose: any;
  isUpdate?: boolean;
  isView?: boolean;
};

export type DropdownProps = {
  onChange?: any;
  control: Control<any>;
  name: string;
  error?: boolean;
  disabled?: boolean;
  label: string;
  helperText?: string;
  emptyOption?: boolean;
};

export type FormSelectProps = {
  control: Control<any>;
  name: string;
  options?: any[]; //TODO estas options deberian ser opcionales?
  disabled?: boolean;
  disabledEmpty?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  onChange?: any;
  emptyOption?: boolean;
};
