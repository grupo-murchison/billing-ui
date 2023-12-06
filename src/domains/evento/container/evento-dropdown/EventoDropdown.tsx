import { useContext } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';

import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';

const EventoDropdown = ({ id, label, disabled, error, helperText, value, ...props }: EventoDropdownProps) => {
  const {
    state: { eventos },
  } = useContext(ProcedimientoCustomContext);

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select id={id} label={label} value={value} {...props}>
        <MenuItem value="" disabled>
          <em>Ninguno</em>
        </MenuItem>
        {eventos.map(({ code, label, value }) => (
          <MenuItem key={value} value={code}>
            {`${code} - ${label}`}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

type EventoDropdownProps = {
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  onChange?: (event: SelectChangeEvent) => void;
};

export default EventoDropdown;
