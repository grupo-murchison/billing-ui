import { useEffect, useState } from 'react';

import { DropdownSchemaType } from '@app/utils/zod.util';

import { ClienteRepository } from '@domains/cliente/repository';

import FormSelect, { FormSelectProps } from '@app/components/Form/FormInputs/FormSelect';
import { FormAutocomplete } from '@app/components/Form/FormInputs/FormAutoComplete';
import FormPopUp from '@app/components/Form/FormInputs/FormAutoComplete/FormPopUp';
import { GridColDef } from '@mui/x-data-grid';

const ClienteDropdown = ({ ...props }: ClienteDropdownProps) => {
  const [options, setOptions] = useState<DropdownSchemaType>([]);

  useEffect(() => {
    ClienteRepository.getAllClienteAsDropdown()
      .then(({ data }) => {
        setOptions(data);
      })
      .catch(() => {
        setOptions([]);
      });
  }, []);

  return <FormSelect {...props} options={options} />;
};

const ClienteDropdownAutoComplete = ({ ...props }: ClienteDropdownProps) => {
  return <FormAutocomplete {...props} repositoryFunc={ClienteRepository.getAllClienteAsDropdownAutoComplete} />;
};


const ClientePopUp = ({ ...props }: ClientePopUpProps) => {

  const ClientePopUpColumns: GridColDef[] = [
    {
      field: 'conceptoBusqueda',
      headerName: 'Concepto Búsqueda',
      valueGetter: params => (params.row.conceptoBusqueda ? params.row.conceptoBusqueda : undefined),
    },
    {
      field: 'codigo',
      headerName: 'Cliente',
      valueGetter: params => (params.row.codigo ? params.row.codigo : undefined),
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      valueGetter: params => (params.row.descripcion ? params.row.descripcion : undefined),
    },
    {
      field: 'paisId',
      headerName: 'País',
      valueGetter: params => (params.row.paisCodigo ? params.row.paisCodigo : undefined),
    },
  ];

  return (
    <FormPopUp
      {...props}
      repositoryFunc={ClienteRepository.getAllClienteAsDropdownAutoComplete}
      columnsPopUp={ClientePopUpColumns}
      // toolbarPopUp={toolbarPopUp}
      repositoryFuncPopUp={ClienteRepository.getAllClienteByFilters}
    />
  );
};

interface ClienteDropdownProps extends Omit<FormSelectProps, 'options'> {
  options?: undefined;
}

interface ClientePopUpProps extends ClienteDropdownProps {
  resetField: AnyValue;
}

export default ClienteDropdown;
export { ClienteDropdownAutoComplete, ClientePopUp };
