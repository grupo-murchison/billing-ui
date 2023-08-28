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
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DesktopDatePicker
            label={label}
            inputFormat={inputFormat || 'dd-MM-yyyy'}
            value={value}
            onChange={event => {
              onChange(event);
            }}
            renderInput={params => <TextField {...params} error={!!error} fullWidth helperText={error?.message} />}
          />
        )}
      />
    </>
  );
}

interface FormDesktopDatePickerProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
  inputFormat?: string;
}

export default FormDesktopDatePicker;
