import { Control, Controller } from 'react-hook-form';
import { DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FormControl, FormHelperText, InputLabel } from '@mui/material';

import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import DatePickerCustomRenderInpunt from './DatePickerRenderInpunt';

type DateState = Date | null;

/**
 * Este componente es solo para Rango de Fechas en donde se requiera como obligatorio una fecha Desde/Hasta.
 * Sin componentes ni funcionalidades adicionales.
 */
function FormDateRangePicker({ control, name, label, inputFormat }: FormDesktopDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => {
        if (error instanceof Array) {
          error.forEach(x => (error = x));
        }

        const valueIsArray = Array.isArray(value);
        if (!valueIsArray) {
          console.error(`FormDateRangePicker: Tipo "${value}"no soportado, debe enviar un Array []`);
          value = [];
        }

        const selectsRange = true;

        return (
          <>
            <FormControl fullWidth error={!!error}>
              <InputLabel htmlFor='range-datepicker' sx={{ position: 'absolute', top: 0, left: -14 }}>
                {label || name}
              </InputLabel>
              <ReactDatePicker
                {...field}
                locale='es'
                selectsRange={selectsRange}
                startDate={(valueIsArray && value[0]) || null}
                endDate={(valueIsArray && value[1]) || null}
                onChange={(dates: DateState[]) => {
                  onChange(Array.isArray(dates) ? dates : []);
                }}
                placeholderText='DD / MM / YYYY - DD / MM / YYYY'
                dateFormat={inputFormat || 'dd / MM / yyyy'}
                isClearable
                clearButtonTitle='Limpiar'
                showPopperArrow={false}
                adjustDateOnChange={!selectsRange} //! no utilizar esta prop con range
                customInput={<DatePickerCustomRenderInpunt error={!!error} />}
                popperPlacement='top-start'
                clearButtonClassName='MuiButtonBase-root MuiIconButton-root MuiIconButton-sizeMedium MuiAutocomplete-clearIndicator css-1t4w124'
                // popperClassName='react-datepicker-popper' // concatena con la clase react-datepicker-popper
                // calendarClassName='react-datepicker' // concatena con la clase react-datepicker
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
