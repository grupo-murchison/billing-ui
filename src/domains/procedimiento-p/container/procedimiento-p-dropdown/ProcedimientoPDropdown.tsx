import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ProcedimientoPDropdown = ({ ...props }: ProcedimientoPDropdownProps) => {
  const [items, setItems] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoPRepository.getAllProcedimientoPAsDropdown()
      .then(({ data }) => {
        setItems(data);
      })
      .catch(() => {
        setItems([]);
      });
  }, []);

  return <FormSelect {...props} options={items} />;
};

interface ProcedimientoPDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ProcedimientoPDropdown;
