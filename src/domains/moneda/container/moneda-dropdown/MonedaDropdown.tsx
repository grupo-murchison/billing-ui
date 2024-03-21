import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { MonedaRepository } from '@domains/moneda/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const MonedaDropdown = ({ ...props }: MonedaDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    MonedaRepository.getAllMonedaAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface MonedaDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default MonedaDropdown;
