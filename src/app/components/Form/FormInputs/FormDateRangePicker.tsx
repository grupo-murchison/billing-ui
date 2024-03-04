import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FormControl, InputLabel } from '@mui/material';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import { EventIcon } from '@assets/icons';

export type FilterOptions = '=' | '>=' | '<=' | 'between';
type DateState = Date | null;

function FormDateRangePicker({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateState[]>([null, null]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <>
          <FormControl fullWidth error={!!error?.message}>
            <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
              {label || name}
            </InputLabel>
            <ReactDatePicker
              locale='es'
              selectsRange={true}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(dates: DateState[]) => {
                setDateRange(dates);
                onChange(dates);
              }}
              placeholderText='dd / MM / yyyy'
              isClearable={true}
              icon={<EventIcon />}
              showIcon
              showPopperArrow={false}
              wrapperClassName='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1t3q0d-MuiFormControl-root-MuiTextField-root'
              className='react-datepicker__base'
              dateFormat='dd/MM/yyyy'
              clearButtonClassName='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator'
            />
          </FormControl>
        </>
      )}
    />
  );
}

interface FormDesktopDatePickerProps extends DesktopDatePickerProps<Date> {
  control: Control<AnyValue>;
  inputFormat?: string;
  name: string;
  label: string;
}

export default FormDateRangePicker;
