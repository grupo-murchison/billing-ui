import { useEffect, useState } from 'react';

import { DropdownItemType, DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoBuiltinRepository } from '@domains/procedimiento-builtin/repository';

import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { DropdownV2 } from '@app/components/FormInputs/Dropdown/Dropdown';
import { Control } from 'react-hook-form';
import { DropdownProps } from '@app/components/Form/form.interfaces';

const ProcedimientoBuiltinDropdown = ({
  id,
  label,
  disabled,
  error,
  helperText,
  value,
  emptyOption,
  ...props
}: ProcedimientoBuiltinDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoBuiltinRepository.getAllProcedimientoBuiltinAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select id={id} label={label} value={value} {...props}>
        {emptyOption ? (
          <MenuItem key={emptyOption.value} value={emptyOption.code} disabled={emptyOption.disabled}>
            <em>{emptyOption.label}</em>
          </MenuItem>
        ) : null}
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

type ProcedimientoBuiltinDropdownProps = {
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: number | string;
  emptyOption?: DropdownItemType & {
    disabled?: boolean;
  };
};

export const ProcedimientoBuiltinDropdownController = ({
  control,
  name,
  error,
  disabled,
  label,
  helperText,
  emptyOption,
  ...props
}: DropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoBuiltinRepository.getAllProcedimientoBuiltinAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return (
    <DropdownV2
      name={name}
      control={control}
      options={items}
      error={error}
      disabled={disabled}
      labelDisplay={label}
      helperText={helperText}
      emptyOption={emptyOption}
    />
  );
};

type ProcedimientoBuiltinDropdownPropsV2 = {
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

export default ProcedimientoBuiltinDropdown;
