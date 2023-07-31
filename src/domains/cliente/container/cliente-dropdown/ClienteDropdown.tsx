import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ClienteRepository } from '@domains/cliente/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { FormAutocomplete } from '@app/components/Form/FormInputs/FormAutoComplete';

const ClienteDropdown = ({ ...props }: ClienteDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ClienteRepository.getAllClienteAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

const ClienteDropdownAutoComplete = ({ ...props }: ClienteDropdownProps) => {
  return <FormAutocomplete {...props} />;
};

interface ClienteDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ClienteDropdown;
export { ClienteDropdownAutoComplete };
