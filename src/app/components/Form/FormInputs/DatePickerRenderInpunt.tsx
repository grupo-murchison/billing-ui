import { TextField } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

// TODO los hago opcionales porque typescript resalta error de falta props cuando lo invocamos. Buscar una mejor solución.
interface DatePickerRenderCustomInpuntProps {
  value?: Date | null;
  onClick?: () => void;
  error: FieldError | undefined;
}

const DatePickerCustomRenderInpunt = forwardRef(
  ({ value, onClick, error }: DatePickerRenderCustomInpuntProps, ref: ForwardedRef<HTMLInputElement>) => {
    console.log('error', error);
    return <TextField onClick={onClick} value={value} ref={ref} fullWidth error={!!error} />;
  },
);

export default DatePickerCustomRenderInpunt;
