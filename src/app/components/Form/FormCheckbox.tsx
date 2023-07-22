import * as React from 'react';
import { Checkbox } from '@mui/material';
import { Control, Controller } from 'react-hook-form';

function FormCheckbox({ control, name, label }: FormCheckboxProps) {
  return (
    <>
      <label>{label}</label>
      <Controller name={name} control={control} render={({ field }) => <Checkbox {...field} />} />
    </>
  );
}

type FormCheckboxProps = {
  control: Control<any>;
  name: string;
  label: string;
};

export default FormCheckbox;
