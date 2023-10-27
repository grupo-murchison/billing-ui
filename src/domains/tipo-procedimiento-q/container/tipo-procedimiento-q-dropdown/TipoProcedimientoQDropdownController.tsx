import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoDatoRepository } from '@domains/tipo-dato/repository';

import FormSelect, { FormSelectProps as FormSelectPropsMui } from '@app/components/Form/FormInputs/FormSelect';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../../../../app/components/Form/form.interfaces';

const TipoProcedimientoQDropdownController = ({ ...props }: TipoProcedimientoQDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoDatoRepository.getAllTipoDatoAsDropdown()
      .then(({ data }) => {
        console.log("🚀 ~ file: TipoProcedimientoQDropdownController.tsx:15 ~ .then ~ data:", data)
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface TipoProcedimientoQDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TipoProcedimientoQDropdownController;


function FormSelectss({
  control,
  name,
  label,
  options,
  disabledEmpty,
  disabled,
  readOnly,
  onChange: onChangeProp,
  emptyOption,
}: FormSelectProps) {
  const emptyValues = [{ value: '', label: 'Ninguno', code: '', disabled: disabledEmpty }];

  const fullOptions = emptyOption ? emptyValues.concat(options) : options;

  const inputLabel = label || name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth disabled={disabled} error={!!error?.message}>
          <InputLabel>{inputLabel}</InputLabel>
          <Select
            readOnly={readOnly}
            {...field}
            value={field.value === undefined ||
              field.value === null ||
              options.length === 0 ? '' : field.value}
            label={inputLabel}
            onChange={(_, data) => {
              field.onChange(_);
              onChangeProp && onChangeProp(data);
            }}
            MenuProps={{ disableScrollLock: true }}
          >
            {fullOptions.length <= 0 && <MenuItem value={emptyValues[0].value}>{emptyValues[0].label}</MenuItem>}

            {fullOptions.length > 0 &&
              fullOptions.map((x, index) => (
                <MenuItem key={index} value={x.value} disabled={x?.disabled}>
                  {emptyOption && index === 0 ? <em>{x.label}</em> : x.label}
                </MenuItem>
              ))}
          </Select>
          {!!error && <FormHelperText>{error?.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

export interface FormSelectProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
  options: AnyValue[];
  disabledEmpty?: boolean;
  emptyOption?: boolean;
  readOnly?: boolean;
}



