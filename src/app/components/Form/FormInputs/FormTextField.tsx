import { FormControl, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormTextField({ control, name, label, ...props }: FormTextFieldProps) {
  const inputLabel = label || name;

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error}>
          <TextField
            {...props}
            {...field}
            label={inputLabel}
            onChange={(ev) => {
              const value = ev.target.value
              const numericValue = parseFloat(value)
              if  ( isNaN(numericValue) || value.length !== numericValue.toString().length ) {
                  return field.onChange(value) 
              }
              return field.onChange(numericValue) 
          }}
            error={!!error}
            helperText={error?.message}
            inputRef={field.ref}
            value={field.value}
            onBlur={field.onBlur}
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
