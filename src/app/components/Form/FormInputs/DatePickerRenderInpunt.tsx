import { TextField } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

// TODO los hago opcionales porque typescript resalta error de falta props cuando lo invocamos. Buscar una mejor solución.
interface DatePickerRenderCustomInpuntProps {
  value?: Date | null;
  onClick?: () => void;
}

const DatePickerCustomRenderInpunt = forwardRef(
  ({ value, onClick }: DatePickerRenderCustomInpuntProps, ref: ForwardedRef<HTMLInputElement>) => (
    <TextField onClick={onClick} value={value} ref={ref} fullWidth />
  ),
);

export default DatePickerCustomRenderInpunt;
