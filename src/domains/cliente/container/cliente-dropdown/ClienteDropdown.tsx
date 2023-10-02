import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ClienteRepository } from '@domains/cliente/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { FormAutocomplete } from '@app/components/Form/FormInputs/FormAutoComplete';
import FormPopUp from '@app/components/Form/FormInputs/FormAutoComplete/FormPopUp';

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
  return <FormAutocomplete {...props} repositoryFunc={ClienteRepository.getAllClienteAsDropdownAutoComplete} />;
};

const ClientePopUp = ({ ...props }: ClienteSearchDropdownProps) => {
  return <FormPopUp {...props} repositoryFunc={ClienteRepository.getAllClienteAsDropdownAutoComplete} />;
};

interface ClienteDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

interface ClienteSearchDropdownProps extends ClienteDropdownProps {
  resetField: AnyValue;
}

export default ClienteDropdown;
export { ClienteDropdownAutoComplete, ClientePopUp };
