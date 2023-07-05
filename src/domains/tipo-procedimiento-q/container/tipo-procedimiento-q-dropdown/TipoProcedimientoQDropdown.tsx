import { useEffect, useState } from 'react';

import { DropdownItemType, DropdownSchemaType } from '@app/utils/zod.util';

import { TipoDatoRepository } from '@domains/tipo-dato/repository';

import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { Dropdown } from '@app/components/FormInputs/Dropdown';
import { Control } from 'react-hook-form';
import { DropdownV2 } from '@app/components/FormInputs/Dropdown/Dropdown';
import { DropdownProps, FormSelectProps } from '@app/components/Form/form.interfaces';
import FormSelect from '@app/components/Form/FormSelect';

const TipoProcedimientoQDropdown = ({
  id,
  label,
  disabled,
  error,
  helperText,
  value,
  emptyOption,
  ...props
}: TipoDatoDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoDatoRepository.getAllTipoDatoAsDropdown()
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

export const TipoProcedimientoQDropdownController = ({
  onChange,
  control,
  name,
  error,
  disabled,
  label,
  helperText,
  emptyOption,
  ...props
}: FormSelectProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);
  console.log(options);

  useEffect(() => {
    TipoDatoRepository.getAllTipoDatoAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return (
    <FormSelect
      name={name}
      control={control}
      onChange={onChange}
      options={options}
      error={error}
      disabled={disabled}
      label={label}
      helperText={helperText}
      emptyOption={emptyOption}
    />
    // <DropdownV2
    //   name={name}
    //   control={control}
    //   onChange={onChange}
    //   options={options}
    //   error={error}
    //   disabled={disabled}
    //   labelDisplay={label}
    //   helperText={helperText}
    //   emptyOption={emptyOption}
    // />
  );
};

//TODO borrar: es de v1
type TipoDatoDropdownProps = {
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

export default TipoProcedimientoQDropdown;
