import { FormControl, FormHelperText, InputLabel, TextField } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

function FormTextField({ control, name, label, error, disabled, helperText, onChange: onChangeProp }: FormSelectProps) {
  const inputLabel = label || name;

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{inputLabel}</InputLabel>
      <Controller
        render={({ field }) => <TextField {...field} />}
        name={name}
        control={control}
      />
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
}

type FormSelectProps = {
  control: Control<any>;
  name: string;
  disabled?: boolean;
  label?: string;
  helperText?: string;
  error?: boolean;
  onChange?: any;
};

export default FormTextField;
