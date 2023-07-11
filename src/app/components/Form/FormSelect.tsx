import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

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
  const fullOptions = emptyOption
    ? [{ value: null, label: 'Ninguno', disabled: disabledEmpty }].concat(options)
    : options;

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

type FormSelectProps = {
  control: Control<any>;
  name: string;
  options: any[];
  disabled?: boolean;
  disabledEmpty?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  onChange?: any;
  emptyOption?: boolean;
};

export default FormSelect;
