import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ReglaFechaPeriodoRepository } from '@domains/regla-fecha-periodo/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ReglaFechaPeriodoDropdown = ({ ...props }: ReglaFechaPeriodoDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ReglaFechaPeriodoRepository.getAllReglasFechaPeriodoAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface ReglaFechaPeriodoDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ReglaFechaPeriodoDropdown;
