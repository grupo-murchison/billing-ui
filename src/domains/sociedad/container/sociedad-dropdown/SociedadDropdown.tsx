import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { SociedadRepository } from '@domains/sociedad/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { FormAutocomplete } from '@app/components/Form/FormInputs/FormAutoComplete';

const SociedadDropdown = ({ ...props }: SociedadDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    SociedadRepository.getAllSociedadAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

const SociedadDropdownAutoComplete = ({ ...props }: SociedadDropdownProps) => {
  return <FormAutocomplete {...props} repositoryFunc={SociedadRepository.getAllSociedadAsDropdownAutoComplete} />;
};

interface SociedadDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default SociedadDropdown;
export { SociedadDropdownAutoComplete };
