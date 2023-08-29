import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoContratoRepository } from '@domains/tipo-contrato/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { FormAutocomplete } from '@app/components/Form/FormInputs/FormAutoComplete';

const TipoContratoDropdown = ({ ...props }: TipoContratoDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoContratoRepository.getAllTiposContratoAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

const TipoContratoDropdownAutoComplete = ({ ...props }: TipoContratoDropdownProps) => {
  return (
    <FormAutocomplete {...props} repositoryFunc={TipoContratoRepository.getAllTipoContratoAsDropdownAutoComplete} />
  );
};

interface TipoContratoDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default TipoContratoDropdown;

export { TipoContratoDropdownAutoComplete };
