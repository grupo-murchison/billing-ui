import { FormControl, InputLabel, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormTextField({ control, name, label, ...props }: FormTextFieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <InputLabel htmlFor={name} sx={{ position: 'absolute', top: 0, left: -14 }}>
            {label || name}
          </InputLabel>

          <TextField
            {...props}
            {...field}
            id={name}
            onChange={ev => {
              const value = ev.target.value;
              const numericValue = parseFloat(value);
              if (isNaN(numericValue) || value.length !== numericValue.toString().length) {
                return field.onChange(value);
              }
              return field.onChange(numericValue);
            }}
            error={!!error}
            helperText={error?.message}
            inputRef={field.ref}
            value={field.value}
            onBlur={field.onBlur}
            sx={{ marginTop: '3.25rem' }}
          />
        </FormControl>
      )}
    />
  );
}

type FormTextFieldProps = FormInputsCommonProps &
  TextFieldProps & {
    control: Control<AnyValue>;
  };

export default FormTextField;
