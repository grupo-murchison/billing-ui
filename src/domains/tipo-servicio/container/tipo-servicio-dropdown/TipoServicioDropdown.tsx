import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoServicioRepository } from '@domains/tipo-servicio/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const TipoServicioDropdown = ({ ...props }: TipoServicioDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoServicioRepository.getAllTiposServicioAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface TipoServicioDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TipoServicioDropdown;
