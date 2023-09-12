import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ReglaFechaPeriodoRepository } from '@domains/regla-fecha-periodo/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ReglaFechaPeriodoDropdown = ({ getOptions, ...props }: ReglaFechaPeriodoDropdownProps) => {
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

  useEffect(() => {
    getOptions && items.length >= 1 && getOptions(items);
  }, [getOptions, items.length]);

  return <FormSelect {...props} options={items} />;
};

interface ReglaFechaPeriodoDropdownProps extends Omit<FormSelectProps, 'options'> {
  getOptions?: (options: DropdownSchemaType) => void;
}

export default ReglaFechaPeriodoDropdown;
