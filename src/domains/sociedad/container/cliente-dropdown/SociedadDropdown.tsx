import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { SociedadRepository } from '@domains/sociedad/repository';

import { Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';

const SociedadDropdown = ({ id, label, disabled, error, helperText, value, ...props }: SociedadDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    SociedadRepository.getAllSociedadAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return (
    <>
      {items.length > 0 && (
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
      )}
    </>
  );
};

type SociedadDropdownProps = {
  id?: string;
  label: string;
  error?: boolean;
  helperText?: string;
  disabled?: boolean;
  value?: number | string;
};

export default SociedadDropdown;
