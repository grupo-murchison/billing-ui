import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';

import { FormSelectProps } from '@app/components/Form/form.interfaces';
import FormSelect from '@app/components/Form/FormSelect';

const ProcedimientoCustomDropdownController = ({
  onChange,
  control,
  name,
  error,
  disabled,
  label,
  helperText,
  emptyOption,
  ...props
}: FormSelectProps) => {
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

  return (
    <FormSelect
      name={name}
      control={control}
      onChange={onChange}
      options={options}
      error={error}
      disabled={disabled}
      label={label}
      helperText={helperText}
      emptyOption={emptyOption}
    />
  );
};

export default ProcedimientoCustomDropdownController;
