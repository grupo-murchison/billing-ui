import { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { DesktopDatePickerProps } from '@mui/x-date-pickers';
import { FormControl, InputLabel } from '@mui/material';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';

import ReactDatePicker, { registerLocale } from 'react-datepicker';
import es from 'date-fns/locale/es';
registerLocale('es', es);

import { EventIcon } from '@assets/icons';
// import FormDatePickerMenu from './FormDatePickerMenu';
// import { DateLib } from '@libs';
import DatePickerCustomRenderInpunt from './DatePickerRenderInpunt';

export type FilterOptions = '=' | '>=' | '<=' | 'between';
type DateState = Date | null;

// function FormDesktopDatePickerV2({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
//   const [dateRange, setDateRange] = useState<DateState[]>([null, null]);
//   const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('between');

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
//         <>
//           <FormControl fullWidth error={!!error}>
//             <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
//               {label || name}
//             </InputLabel>
//             <ReactDatePicker
//               {...field}
//               selectsRange={selectedFilter === 'between' ? true : false}
//               startDate={dateRange[0]}
//               endDate={dateRange[1]}
//               onChange={(update: DateState) => {
//                 console.log('ReactDatePicker', update);

//                 if (selectedFilter === '=') {
//                   return onChange([update, update]);
//                   return onChange([update, update]);
//                 }
//                 if (selectedFilter === '<=') {
//                   return onChange([update, null]);
//                 }
//                 if (selectedFilter === '>=') {
//                   return onChange([null, update]);
//                 }
//                 if (selectedFilter === 'between') {
//                   return onChange(update);
//                   // setDateRange(update);
//                 }
//               }}
//               placeholderText='dd/MM/yyyy'
//               isClearable={true}
//               selected={value}
//               icon={<EventIcon />}
//               showIcon
//               showPopperArrow={false}
//               wrapperClassName='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1t3q0d-MuiFormControl-root-MuiTextField-root'
//             />
//             <FormDatePickerMenu />
//           </FormControl>
//         </>
//       )}
//     />
//   );
// }

// function FormDesktopDatePickerV2FUNCIONANDO({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
//   const [dateRange, setDateRange] = useState<DateState[]>([null, null]);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
//         <>
//           <FormControl fullWidth error={!!error}>
//             <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
//               {label || name}
//             </InputLabel>
//             <ReactDatePicker
//               locale='es'
//               selectsRange={true}
//               startDate={dateRange[0]}
//               endDate={dateRange[1]}
//               onChange={(dates: DateState[]) => {
//                 setDateRange(dates);
//                 onChange(dates);
//               }}
//               placeholderText='dd / MM / yyyy'
//               isClearable={true}
//               icon={<EventIcon />}
//               showIcon
//               showPopperArrow={false}
//               wrapperClassName='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1t3q0d-MuiFormControl-root-MuiTextField-root'
//               className='react-datepicker__base'
//               dateFormat='dd/MM/yyyy'
//             />
//             {/* <FormDatePickerMenu setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} /> */}
//           </FormControl>
//         </>
//       )}
//     />
//   );
// }

/**
 * Componente experimental en desarrollo. Debe mutar su comportamiento por desición del usuario
 * en base una funcionalidad adicional de tipo filtros o comandos preestablecidos
 */
function FormDesktopDatePickerV2({ control, name, label, inputFormat }: FormDesktopDatePickerProps) {
  const [dateRange, setDateRange] = useState<DateState[]>([null, null]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
        <>
          <FormControl fullWidth error={!!error}>
            <InputLabel htmlFor={name} sx={{ position: 'absolute', top: 0, left: -14 }}>
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
              customInput={<DatePickerCustomRenderInpunt error={!!error} />}
            />
            {/* <FormDatePickerMenu setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} /> */}
          </FormControl>
        </>
      )}
    />
  );
}

// function FormDesktopDatePickerV4({ control, name, label, inputFormat, ...props }: FormDesktopDatePickerProps) {
//   // const [dateRange, setDateRange] = useState<DateState[]>([null, null]);
//   const [selectedFilter, setSelectedFilter] = useState<FilterOptions>('between');
//   const [startDate, setStartDate] = useState(new Date());
//   const [endDate, setEndDate] = useState(null);

//   const onChangeDates = (dates: any) => {
//     if (selectedFilter === '=') {
//       setStartDate(dates);
//     }
//     if (selectedFilter === '>=') {
//       setStartDate(dates);
//     }
//     if (selectedFilter === '<=') {
//       setStartDate(dates);
//       // setLabelInfo('Hasta');
//     }
//     if (selectedFilter === 'between') {
//       const [start, end] = dates;
//       setStartDate(start);
//       setEndDate(end);
//       // setLabelInfo('Rango de Fechas');
//     }
//   };

//   return (
//     <Controller
//       name={name}
//       control={control}
//       render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
//         <>
//           <FormControl fullWidth error={!!error}>
//             <InputLabel htmlFor='custom-textfield' sx={{ position: 'absolute', top: 0, left: -14 }}>
//               {label || name}
//             </InputLabel>
//             <ReactDatePicker
//               {...field}
//               selectsRange={selectedFilter === 'between' ? true : false}
//               selected={startDate}
//               startDate={startDate}
//               endDate={selectedFilter === 'between' ? endDate : null}
//               // selectsRange
//               onChange={onChangeDates}
//               placeholderText='dd / MM / yyyy'
//               isClearable={true}
//               icon={<EventIcon />}
//               showIcon
//               showPopperArrow={false}
//               wrapperClassName='MuiFormControl-root MuiFormControl-fullWidth MuiTextField-root css-1t3q0d-MuiFormControl-root-MuiTextField-root'
//               className='react-datepicker__base'
//               // value={DateLib.parseToDBString(startDate)}
//             />
//             <FormDatePickerMenu setSelectedFilter={setSelectedFilter} selectedFilter={selectedFilter} />
//           </FormControl>
//         </>
//       )}
//     />
//   );
// }

interface FormDesktopDatePickerProps extends DesktopDatePickerProps<Date> {
  control: Control<AnyValue>;
  inputFormat?: string;
  name: string;
  label: string;
}

export default FormDesktopDatePickerV2;
