import * as React from 'react';
import { Checkbox, FormControlLabel, InputLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../form.interfaces';

function FormCheckbox({ control, name, label }: FormCheckboxProps) {
  return (
    <>
      <InputLabel></InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel control={<Checkbox {...field} />} label={label} labelPlacement='start' />
        )}
      />
    </>
  );
}

interface FormCheckboxProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
}

export default FormCheckbox;
