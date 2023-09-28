import { Switch, FormControlLabel, InputLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormSwitch({ control, name, label, labelPlacement }: FormCheckboxProps) {
  return (
    <>
      <InputLabel></InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            control={<Switch {...field} />}
            label={label}
            labelPlacement={labelPlacement || 'start'}
          />
        )}
      />
    </>
  );
}

interface FormCheckboxProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
  labelPlacement?: 'start' | 'end';
}

export default FormSwitch;
