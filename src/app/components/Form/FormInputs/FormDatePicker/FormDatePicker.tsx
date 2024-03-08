import { Control, Controller } from 'react-hook-form';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FormControl, InputLabel } from '@mui/material';
// import { FormInputsCommonProps } from '../form.interfaces';

function FormDesktopDatePicker({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl fullWidth error={!!error?.message}>
          <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
            {label || name}
          </InputLabel>

          <DesktopDatePicker
            {...props}
            slotProps={{
              actionBar: {
                actions: ['clear'],
              },
              textField: {
                fullWidth: true,
                helperText: error?.message,
                error: !!error,
              },
            }}
            format={inputFormat || 'dd/MM/yyyy'}
            formatDensity='spacious'
            value={value}
            onChange={event => {
              onChange(event);
            }}
            localeText={{
              clearButtonLabel: 'Limpiar',
            }}
            sx={{ marginTop: '3.25rem' }}
          />
        </FormControl>
      )}
    />
  );
}

interface FormDesktopDatePickerProps extends DesktopDatePickerProps<TDate> {
  control: Control<AnyValue>;
  inputFormat?: string;
  name: string;
  label: string;
}

export default FormDesktopDatePicker;
