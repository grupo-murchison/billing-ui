import { FormControl, FormHelperText, TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormTextField({ control, name, label, error, helperText, ...props }: FormTextFieldProps) {
  const inputLabel = label || name;

  return (
    <FormControl fullWidth error={!!error}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error }  }) => (
          <TextField
            {...props}
            {...field}
            label={inputLabel}
            onChange={e => field.onChange(typeResolver(e.target.value, props.type))}
            error={!!error}
            helperText={error?.message} 
          />
        )}
      />
      {/* {helperText && <FormHelperText>{helperText}</FormHelperText>} */}
    </FormControl>
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
      _value = +value || '';
      break;

    default:
      _value = value;
      break;
  }
  return _value;
}

export default FormTextField;
