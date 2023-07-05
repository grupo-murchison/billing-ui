import { ReactNode } from 'react';
import { Control } from 'react-hook-form';
import { DropdownItemType } from '@app/utils/zod.util';

export type FromProps = {
  children?: ReactNode;
  onSubmit: any;
  isSubmitting: boolean;
  handleClose: any;
  isUpdate?: boolean;
};

export type ActionButtonsProps = {
  isSubmitting: boolean;
  handleClose: any;
  isUpdate?: boolean;
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
