import { useContext} from 'react';
import { Select, MenuItem, FormControl, InputLabel, FormHelperText, SelectChangeEvent } from '@mui/material';

import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';

const FuncionDropdown = ({ id, label, disabled, error, helperText, value, ...props }: FuncionDropdownProps) => {
  const {
    state: { funciones },
  } = useContext(ProcedimientoCustomContext);

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select id={id} label={label} value={value} {...props}>
        {funciones.map(({ code, label, value }) => (
          <MenuItem key={value} value={code}>
            {`${code} - ${label}`}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

type FuncionDropdownProps = {
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
};

export default FuncionDropdown;
