import { EventIcon, FilterAltIcon } from '@assets/icons';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { ForwardedRef, forwardRef } from 'react';

// TODO los hago opcionales porque typescript resalta error de falta props cuando lo invocamos. Buscar una mejor solución.
interface DatePickerRenderCustomInpuntProps {
  value?: Date | null;
  onClick?: () => void;
  error: boolean;
  name?: string;
}

const DatePickerCustomRenderInpunt = forwardRef(
  ({ value, onClick, error, ...props }: DatePickerRenderCustomInpuntProps, ref: ForwardedRef<HTMLInputElement>) => {
    // TODO falta por hacer por eso deshabilito filter
    const onClickFilter = () => console.error('DatePickerCustomRenderInpunt onClickFilter no implementada.');
    const filterDeshabilitadoAproposito = true;

    return (
      <TextField
        {...props}
        id={props?.name}
        value={value}
        ref={ref}
        fullWidth
        error={error}
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <IconButton aria-label='open calendar' onClick={onClick} edge='start' size='small'>
                <EventIcon />
              </IconButton>
            </InputAdornment>
          ),
          endAdornment: filterDeshabilitadoAproposito ? null : (
            <InputAdornment position='end'>
              <IconButton
                aria-label='open filter'
                onClick={onClickFilter}
                edge='start'
                size='small'
                style={{ marginRight: 10 }}
              >
                <FilterAltIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    );
  },
);

export default DatePickerCustomRenderInpunt;
