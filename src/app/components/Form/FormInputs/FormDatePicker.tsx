import { Control, Controller } from 'react-hook-form';
import { DesktopDatePicker, DesktopDatePickerProps } from '@mui/x-date-pickers';
// import { FormInputsCommonProps } from '../form.interfaces';

function FormDesktopDatePicker({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
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
            label={label}
            format={inputFormat || 'dd/MM/yyyy'}
            formatDensity='spacious'
            value={value}
            onChange={event => {
              onChange(event);
            }}
            localeText={{
              clearButtonLabel: 'Limpiar',
            }}
          />
        )}
      />
    </>
  );
}

interface FormDesktopDatePickerProps extends DesktopDatePickerProps<TDate> {
  control: Control<AnyValue>;
  inputFormat?: string;
  name: string;
  label: string;
}

export default FormDesktopDatePicker;
