import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoContratoRepository } from '@domains/tipo-contrato/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const TipoContratoDropdown = ({ ...props }: TipoContratoDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoContratoRepository.getAllTiposContratoAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface TipoContratoDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TipoContratoDropdown;
