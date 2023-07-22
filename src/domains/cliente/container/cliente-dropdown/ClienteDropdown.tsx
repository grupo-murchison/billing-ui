import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ClienteRepository } from '@domains/cliente/repository';

import { FormSelectProps } from '@app/components/Form/form.interfaces';
import FormSelect from '@app/components/Form/FormSelect';

const ClienteDropdown = ({
  onChange,
  control,
  name,
  error,
  disabled,
  label,
  helperText,
  emptyOption,
  ...props
}: FormSelectProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ClienteRepository.getAllClienteAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return (
    <FormSelect
      name={name}
      control={control}
      onChange={onChange}
      options={items}
      error={error}
      disabled={disabled}
      label={label}
      helperText={helperText}
      emptyOption={emptyOption}
      {...props}
    />
  );
};

export default ClienteDropdown;
