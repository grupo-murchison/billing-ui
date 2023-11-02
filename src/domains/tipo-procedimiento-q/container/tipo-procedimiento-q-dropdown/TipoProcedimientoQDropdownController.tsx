import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { TipoDatoRepository } from '@domains/tipo-dato/repository';

import FormSelect, { FormSelectProps as FormSelectPropsMui } from '@app/components/Form/FormInputs/FormSelect';

import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { FormInputsCommonProps } from '../../../../app/components/Form/form.interfaces';

const TipoProcedimientoQDropdownController = ({ ...props }: TipoProcedimientoQDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    TipoDatoRepository.getAllTipoDatoAsDropdown()
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



