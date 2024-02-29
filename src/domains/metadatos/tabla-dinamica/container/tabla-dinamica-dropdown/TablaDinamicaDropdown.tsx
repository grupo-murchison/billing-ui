import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { TablaDinamicaRepository } from '../../repository';

const TablaDinamicaDropdown = ({ ...props }: TablaDinamicaDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TablaDinamicaRepository.getAllTablaDinamicaAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface TablaDinamicaDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TablaDinamicaDropdown;
