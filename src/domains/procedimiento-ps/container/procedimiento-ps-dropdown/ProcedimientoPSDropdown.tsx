import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ProcedimientoPSDropdown = ({ ...props }: ProcedimientoPSDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoPSRepository.getAllProcedimientoPSAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface ProcedimientoPSDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ProcedimientoPSDropdown;
