import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { EventoRepository } from '@domains/evento/repository';

const EventoDropdown = ({ ...props }: EventoDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    EventoRepository.getAllEventoAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface EventoDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default EventoDropdown;
