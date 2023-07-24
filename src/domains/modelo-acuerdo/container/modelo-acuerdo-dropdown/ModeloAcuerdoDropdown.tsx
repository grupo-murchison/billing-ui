import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ModeloAcuerdoDropdown = ({ ...props }: ModeloAcuerdoDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ModeloAcuerdoRepository.getAllModeloAcuerdoAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface ModeloAcuerdoDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ModeloAcuerdoDropdown;
