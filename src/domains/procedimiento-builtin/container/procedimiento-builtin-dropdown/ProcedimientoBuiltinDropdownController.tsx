import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoBuiltinRepository } from '@domains/procedimiento-builtin/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ProcedimientoBuiltinDropdownController = ({ ...props }: ProcedimientoBuiltinDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoBuiltinRepository.getAllProcedimientoBuiltinAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface ProcedimientoBuiltinDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ProcedimientoBuiltinDropdownController;
