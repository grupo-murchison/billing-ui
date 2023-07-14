import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';

import FormSelect from '@app/components/Form/FormSelect';
import { FormSelectProps } from '@app/components/Form/form.interfaces';

const ProductoSoftlandDropdown = ({
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
    ProductoSoftlandRepository.getAllProductoSoftlandAsDropdown()
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
    />
  );
};

export default ProductoSoftlandDropdown;
