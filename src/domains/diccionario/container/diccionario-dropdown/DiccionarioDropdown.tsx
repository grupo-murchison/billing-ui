import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { DiccionarioRepository } from '@domains/diccionario/repository';

import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const DiccionarioDropdown = ({ id, label, disabled, error, helperText, value, ...props }: DiccionarioDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    DiccionarioRepository.getAllDiccionarioAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return (
    <FormControl fullWidth error={error} disabled={disabled}>
      <InputLabel>{label}</InputLabel>
      <Select id={id} label={label} value={value} {...props}>
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

type DiccionarioDropdownProps = {
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: number | string;
};

export default DiccionarioDropdown;
