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
            onChange={e => field.onChange(typeResolver(e.target.value, props.type))}
            error={!!error}
            helperText={error?.message}
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

function typeResolver(value: string, type: React.InputHTMLAttributes<unknown>['type']) {
  let _value;
  switch (type) {
    case 'number':      
      _value = Number.isNaN(+value) ? '' : +value;
      break;

    default:
      _value = value;
      break;
  }
  return _value;
}

export default FormTextField;
