import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { TablasDinamicasRepository } from '../../repository';

const TablasDinamicasDropdown = ({ ...props }: TablasDinamicasDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TablasDinamicasRepository.getAllTablasDinamicasAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface TablasDinamicasDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TablasDinamicasDropdown;
