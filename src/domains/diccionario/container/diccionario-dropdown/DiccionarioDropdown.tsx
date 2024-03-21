import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { DiccionarioRepository } from '@domains/diccionario/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const DiccionarioDropdown = ({ ...props }: DiccionarioDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    DiccionarioRepository.getAllDiccionarioAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface DiccionarioDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default DiccionarioDropdown;
