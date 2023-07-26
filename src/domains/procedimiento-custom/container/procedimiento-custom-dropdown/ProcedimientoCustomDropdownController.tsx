import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';

const ProcedimientoCustomDropdownController = ({ ...props }: ProcedimientoCustomDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ProcedimientoCustomRepository.getAllProcedimientoCustomAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface ProcedimientoCustomDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

export default ProcedimientoCustomDropdownController;
