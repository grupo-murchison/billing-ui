import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import FormSelect, { FormSelectProps as FormSelectPropsMui } from '@app/components/Form/FormInputs/FormSelect';

import { Control } from 'react-hook-form';
import { FormInputsCommonProps } from '../../../../app/components/Form/form.interfaces';
import { TipoProcedimientoQRepository } from '@domains/tipo-procedimiento-q/repository';

const TipoProcedimientoQDropdownController = ({ ...props }: TipoProcedimientoQDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoProcedimientoQRepository.getAllTipoProcedimientoQAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

interface TipoProcedimientoQDropdownProps extends Omit<FormSelectPropsMui, 'options'> {
  options?: undefined;
}

export default TipoProcedimientoQDropdownController;




export interface FormSelectProps extends FormInputsCommonProps {
  control: Control<AnyValue>;
  options: AnyValue[];
  disabledEmpty?: boolean;
  emptyOption?: boolean;
  readOnly?: boolean;
}



