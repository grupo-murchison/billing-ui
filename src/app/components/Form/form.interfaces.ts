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
  control: Control<any>;
  name: string;
  error?: boolean;
  disabled?: boolean;
  label: string;
  helperText?: string;
  emptyOption?: DropdownItemType & {
    disabled?: boolean;
  };
};
