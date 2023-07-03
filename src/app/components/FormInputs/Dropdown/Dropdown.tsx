import { Controller, Control } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

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
        <Select {...field} label={labelDisplay}>
          {emptyOption ? (
            <MenuItem key={emptyOption.value} value={emptyOption.code} disabled={emptyOption.disabled}>
              <em>{emptyOption.label}</em>
            </MenuItem>
          ) : null}
          {options.map(({ value, code, label }) => (
            <MenuItem key={value} value={code}>
              {`${code} - ${label}`}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);

//TODO todavia no elimine el dropdown v1 porque lo estan utilizando en procedimientoCustom

export const DropdownV2 = ({
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
        <Select {...field} label={labelDisplay}>
          {emptyOption ? (
            <MenuItem key={emptyOption.code} value={emptyOption.value} disabled={emptyOption.disabled}>
              <em>{emptyOption.label}</em>
            </MenuItem>
          ) : null}
          {options.map(({ value, code, label }) => (
            <MenuItem key={code} value={value}>
              {`${code} - ${label}`}
            </MenuItem>
          ))}
        </Select>
      )}
    />
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
