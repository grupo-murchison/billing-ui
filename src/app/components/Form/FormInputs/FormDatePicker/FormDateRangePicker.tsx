import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import { EventIcon } from '@assets/icons';
import DatePickerCustomRenderInpunt from './DatePickerRenderInpunt';

type DateState = Date | null;

/**
 * Este componente es solo para Rango de Fechas en donde se requiera como obligatorio una fecha Desde/Hasta.
 * Sin componentes ni funcionalidades adicionales.
 */
function FormDateRangePicker({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateState[]>([null, null]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        if (error instanceof Array) {
          error.forEach(x => (error = x));
        }

        return (
          <>
            <FormControl fullWidth error={!!error}>
              <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
                {label || name}
              </InputLabel>
              <ReactDatePicker
                {...field}
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
                dateFormat='dd/MM/yyyy'
                customInput={<DatePickerCustomRenderInpunt error={error} />}
              />
              {!!error && <FormHelperText>{error?.message}</FormHelperText>}
            </FormControl>
          </>
        );
      }}
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
