import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoNegocioRepository } from '@domains/tipo-negocio/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const TipoNegocioDropdown = ({ ...props }: TipoNegocioDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoNegocioRepository.getAllTipoNegocioAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface TipoNegocioDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TipoNegocioDropdown;
