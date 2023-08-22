import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormSelect({
  control,
  name,
  label,
  options,
  error,
  disabledEmpty,
  disabled,
  helperText,
  onChange: onChangeProp,
  emptyOption,
}: FormSelectProps) {
  const emptyValues = [{ value: null, label: 'Ninguno', disabled: disabledEmpty }]; // FIXME no puede ser value: null, debe ser value: '', para cambiar esto se deben revisar luego todos los formularios

  const fullOptions = emptyOption ? emptyValues.concat(options) : options;

  const inputLabel = label || name;

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{inputLabel}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            label={inputLabel}
            onChange={(_, data) => {
              field.onChange(_);
              onChangeProp && onChangeProp(data);
            }}
          >
            {fullOptions.length > 0 &&
              fullOptions.map((x, index) => (
                <MenuItem key={index} value={x.value} disabled={x?.disabled}>
                  {emptyOption && index === 0 ? <em>{x.label}</em> : x.label}
                </MenuItem>
              ))}
          </Select>
        )}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

export interface FormSelectProps extends FormInputsCommonProps {
  control: Control<any>;
  options: any[];
  disabledEmpty?: boolean;
  emptyOption?: boolean;
}

export default FormSelect;
