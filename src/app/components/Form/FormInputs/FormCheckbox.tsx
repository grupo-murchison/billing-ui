import { Checkbox, FormControlLabel, InputLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormCheckbox({ control, name, label, labelPlacement, checked }: FormCheckboxProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControlLabel
          control={<Checkbox {...field} defaultChecked={checked} />}
          label={label}
          labelPlacement={labelPlacement || 'start'}
        />
      )}
    />
  );
}

interface FormCheckboxProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
  checked?: boolean;
  labelPlacement?: 'start' | 'end';
}

export default FormCheckbox;
