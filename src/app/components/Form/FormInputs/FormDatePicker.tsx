import * as React from 'react';
import { Control, Controller } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import { TextField } from '@mui/material';
import { FormInputsCommonProps } from '../form.interfaces';

function FormDesktopDatePicker({ control, name, label, inputFormat, error, ...props }: FormDesktopDatePickerProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DesktopDatePicker
            {...field}
            label={label}
            inputFormat={inputFormat || 'dd-MM-yyyy'}
            renderInput={params => <TextField {...params} error={!!error} fullWidth />}
            {...props}
          />
        )}
      />
    </>
  );
}

interface FormDesktopDatePickerProps extends FormInputsCommonProps {
  control: Control<any>;
  inputFormat?: string;
}

export default FormDesktopDatePicker;
