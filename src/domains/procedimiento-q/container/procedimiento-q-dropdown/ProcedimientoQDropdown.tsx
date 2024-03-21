import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ProcedimientoQDropdown = ({ ...props }: ProcedimientoQDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoQRepository.getAllProcedimientoQAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface ProcedimientoQDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ProcedimientoQDropdown;
