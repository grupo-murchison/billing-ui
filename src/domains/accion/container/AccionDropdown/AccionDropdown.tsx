import { useContext } from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';

import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';

const AccionDropdown = ({ id, label, disabled, error, helperText, value, ...props }: AccionDropdownProps) => {
  const {
    state: { acciones },
  } = useContext(ProcedimientoCustomContext);

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select id={id} label={label} value={value} {...props}>
        <MenuItem value=''>
          <em>Ninguno</em>
        </MenuItem>
        {acciones.map(({ code, label, value }) => (
          <MenuItem key={value} value={code}>
            {`${code} - ${label}`}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

type AccionDropdownProps = {
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
};

export default AccionDropdown;
