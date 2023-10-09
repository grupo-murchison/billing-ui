import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import { Button, Paper, Stack } from '@mui/material';
import { DataGrid } from '@app/components/DataGrid';
import { useCallback, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useDataGrid } from '@app/hooks';
import FormActionButtons from '@app/components/Form/FormActionButtons';

const ModalFormPopUp = ({ setOpenModal, setOptions, resetField, name, repositoryFunc, columns, toolbar }: AnyValue) => {
  const mainDataGrid = useDataGrid();

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

  const handleConfirm = () => {
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

  const handleClose = () => {
    setOpenModal(false);
  };

  // const toolbar = (
  //   <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
  //     <Form isSubmitting={isSubmitting}>
  //       <Row>
  //         <Col md={6}>
  //           <FormTextField
  //             control={control}
  //             disabled={isSubmitting}
  //             label='Concepto Búsqueda'
  //             name='conceptoBusqueda'
  //           />
  //         </Col>
  //         <Col md={6}>
  //           <FormTextField control={control} label='Cliente' name='codigo' />
  //         </Col>
  //       </Row>
  //       <Row>
  //         <Col md={6}>
  //           <FormTextField control={control} label='Denominación' name='descripcion' />
  //         </Col>
  //         <Col md={6}>
  //           <FormTextField control={control} disabled={isSubmitting} label='País' name='paisId' type='number' />
  //         </Col>
  //       </Row>
  //       <Stack direction='row' justifyContent='end'>
  //         <Button onClick={handleSubmit(onSubmit)} variant='contained' color='primary'>
  //           Buscar
  //         </Button>
  //       </Stack>
  //     </Form>
  //   </Paper>
  // );

  return (
    <>
      {toolbar}
      <DataGrid
        onRowClick={newSelection => {
          setSelection(newSelection.row);
        }}
        hookRef={mainDataGrid.ref}
        columns={columns}
        repositoryFunc={repositoryFunc}
      />
      <Stack mt={2}>
        <FormActionButtons isSubmitting={isSubmitting} handleClose={handleClose} handleConfirm={handleConfirm} />
      </Stack>
    </>
  );
};

export default ModalFormPopUp;
