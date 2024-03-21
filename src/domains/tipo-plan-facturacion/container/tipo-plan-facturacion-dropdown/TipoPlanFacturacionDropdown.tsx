import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoPlanFacturacionRepository } from '@domains/tipo-plan-facturacion/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const TipoPlanFacturacionDropdown = ({ ...props }: TipoPlanFacturacionDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoPlanFacturacionRepository.getAllTiposPlanFacturacionAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface TipoPlanFacturacionDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TipoPlanFacturacionDropdown;
