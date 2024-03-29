import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import {  FormAutocompleteMultiple } from '@app/components/Form/FormInputs/FormAutoComplete';
import { EventoClienteRepository } from '@domains/evento-cliente/repository';

const EventosDropdown = ({ ...props }: EventosDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    EventoClienteRepository.getAllEventsAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

const EventosDropdownAutoComplete = ({ ...props }: EventosDropdownProps) => {
  return <FormAutocompleteMultiple {...props} repositoryFunc={EventoClienteRepository.getAllEventsAsDropdownAutoComplete} />;
};

interface EventosDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default EventosDropdown;
export { EventosDropdownAutoComplete };
