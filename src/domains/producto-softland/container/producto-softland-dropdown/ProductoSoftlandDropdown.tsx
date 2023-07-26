import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ProductoSoftlandDropdown = ({ ...props }: ProductoSoftlandDropdownProps) => {
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

  return <FormSelect {...props} options={items} />;
};

interface ProductoSoftlandDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ProductoSoftlandDropdown;
