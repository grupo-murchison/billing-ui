import { useContext } from 'react';
import { Controller, Control } from 'react-hook-form';
import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  FormLabel,
  InputLabel,
  FormHelperText,
  SelectChangeEvent,
} from '@mui/material';

import { DropdownItemType } from '@app/utils/zod.util';

export type DropdownProps = {
  control: Control<any>;
  options: DropdownItemType[];
  name: string;
  labelDisplay: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  emptyOption?: DropdownItemType & {
    disabled?: boolean;
  };
};

export const Dropdown = ({
  control,
  name,
  options,
  error,
  disabled,
  labelDisplay,
  helperText,
  emptyOption,
}: DropdownProps) => (
  <FormControl fullWidth error={error} disabled={disabled}>
    <InputLabel>{labelDisplay}</InputLabel>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <MuiSelect {...field} label={labelDisplay}>
          {emptyOption ? (
            <MenuItem key={emptyOption.value} value={emptyOption.code} disabled={emptyOption.disabled}>
              <em>{emptyOption.label}</em>
            </MenuItem>
          ) : null}
          {options.map(({ value, code, label }) => (
            <MenuItem key={value} value={code}>
              {label}
            </MenuItem>
          ))}
        </MuiSelect>
      )}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
