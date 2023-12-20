import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FormControl, InputLabel } from '@mui/material';
import ReactDatePicker from 'react-datepicker';

import { EventIcon } from '@assets/icons';
import FormDatePickerMenu from './FormDatePickerMenu';

type FilterOptions = '=' | '>=' | '<=' | 'between';
type DateState = Date | null;

function FormDesktopDatePickerV2({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateState[]>([null, null]);
  const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('between');

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
              {...field}
              selectsRange={selectedFilter === 'between' ? true : false}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update: DateState) => {
                console.log('ReactDatePicker', update);

                if (selectedFilter === '=') {
                  return onChange([update, update]);
                  return onChange([update, update]);
                }
                if (selectedFilter === '<=') {
                  return onChange([update, null]);
                }
                if (selectedFilter === '>=') {
                  return onChange([null, update]);
                }
                if (selectedFilter === 'between') {
                  return onChange(update);
                  // setDateRange(update);
                }
              }}
              placeholderText='dd/MM/yyyy'
              isClearable={true}
              selected={value}
              icon={<EventIcon />}
              showIcon
              showPopperArrow={false}
              wrapperClassName='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1t3q0d-MuiFormControl-root-MuiTextField-root'
            />
            <FormDatePickerMenu />
          </FormControl>
        </>
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

export default FormDesktopDatePickerV2;
