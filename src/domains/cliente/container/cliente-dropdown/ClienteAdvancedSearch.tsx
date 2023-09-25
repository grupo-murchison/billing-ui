import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import { Button, Paper, Stack } from '@mui/material';
import { ClienteRepository } from '@domains/cliente/repository';
import { DataGrid } from '@app/components/DataGrid';
import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { ClienteContext } from '@domains/cliente/contexts/cliente.context';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ClienteAdvancedSearch = ({ setOpenModal, setOptions, resetField, name }: AnyValue) => {
  const { mainDataGrid } = useContext(ClienteContext);

  useEffect(() => {
    mainDataGrid.load();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      conceptoBusqueda: '',
      clienteId: '',
      descripcion: '',
      paisId: '',
    },
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        conceptoBusqueda: data.conceptoBusqueda ? data.conceptoBusqueda : undefined,
        codigo: data.codigo ? data.codigo : undefined,
        descripcion: data.descripcion ? data.descripcion : undefined,
        paisId: data.paisId?.value ? data.paisId.value : undefined,
      };
      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const [select, setSelection] = useState<ClienteRowSelection>({
    id: 0,
    codigo: '',
    descripcion: '',
  });

  type ClienteRowSelection =
    | {
        id: number;
        codigo: string;
        descripcion: string;
      }
    | Record<string, unknown>;

  const confirmValue = () => {
    const { id, codigo, descripcion } = select;

    if (id != 0) {
      const selectedData = [
        {
          value: id,
          code: codigo,
          label: `${codigo} - ${descripcion}`,
        },
      ];
      setOptions(selectedData);
      resetField(`${name}`, { defaultValue: selectedData[0] });
    }

    setOpenModal(false);
  };

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='search' isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Concepto Búsqueda'
              name='conceptoBusqueda'
            />
          </Col>
          <Col md={6}>
            <FormTextField control={control} label='Cliente' name='codigo' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} label='Denominación' name='descripcion' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='País' name='paisId' type='number' />
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  return (
    <>
      {toolbar}
      <DataGrid
        onRowClick={newSelection => {
          setSelection(newSelection.row);
        }}
        hookRef={mainDataGrid.ref}
        columns={[
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
        ]}
        repositoryFunc={ClienteRepository.getAllClienteByFilters}
      />
      <Stack direction='row' justifyContent='end' gap={2} sx={{ my: 2 }}>
        <Button onClick={() => setOpenModal(false)} variant='outlined' color='secondary'>
          Cancelar
        </Button>
        <Button onClick={confirmValue} variant='contained' color='primary'>
          Confirmar
        </Button>
      </Stack>
    </>
  );
};

export default ClienteAdvancedSearch;
