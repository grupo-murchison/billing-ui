import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormSelect({
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
  const emptyValues = [{ value: '', label: 'Ninguno', disabled: disabledEmpty }];

  const fullOptions = emptyOption ? emptyValues.concat(options) : options;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth disabled={disabled} error={!!error?.message}>
          <InputLabel htmlFor='custom-textfield' shrink={false} sx={{ position: 'absolute', top: 0, left: -14 }}>
            {label || name}
          </InputLabel>

          <Select
            readOnly={readOnly}
            {...field}
            value={field.value === undefined || field.value === null || options.length === 0 ? '' : field.value}
            onChange={(_, data) => {
              field.onChange(_);
              onChangeProp && onChangeProp(data);
            }}
            MenuProps={{ disableScrollLock: true }}
            sx={{ marginTop: '3.25rem' }}
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

export default FormSelect;
