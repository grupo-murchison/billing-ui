import { Checkbox, FormControlLabel, InputLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormCheckbox({ control, name, label, labelPlacement }: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} />}
          label={label}
          labelPlacement={labelPlacement || 'start'}
          checked={field.value}
          inputRef={field.ref}
        />
      )}
    />
  );
}

interface FormCheckboxProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
  labelPlacement?: 'start' | 'end';
}

export default FormCheckbox;
