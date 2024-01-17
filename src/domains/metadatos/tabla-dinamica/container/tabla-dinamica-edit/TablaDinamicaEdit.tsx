import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { TablaDinamicaContext } from '../../contexts';
import { TablaDinamicaEditSchema, TablaDinamicaEditSchemaType } from './schemas';
import { Box, FormLabel, Typography } from '@mui/material';
import { DatoDinamicoRoutes } from '@domains/metadatos/dato-dinamico/navigation';
import TablaDinamicaRepository from '../../repository/tabla-dinamica.repository';

const TablaDinamicaEdit = () => {
  const { tablaDinamicaId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(TablaDinamicaContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
  } = useForm<TablaDinamicaEditSchemaType>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      codigo: '',
    },
    resolver: zodResolver(TablaDinamicaEditSchema),
  });

  useEffect(() => {
    TablaDinamicaRepository.getTablaDinamicaById(tablaDinamicaId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [tablaDinamicaId, reset]);

  const handleClose = useCallback(() => {
    _navigate('/tabla-dinamica');
  }, [_navigate]);

  const onSubmit: SubmitHandler<TablaDinamicaEditSchemaType> = useCallback(
    async data => {
      await TablaDinamicaRepository.updateTablaDinamica({ ...data, id: Number(tablaDinamicaId) });
      mainDataGrid.reload();
      _navigate('/tabla-dinamica');
    },
    [_navigate, mainDataGrid],
  );

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Tabla Dinámica'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        {' '}
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled label='Código' name='codigo' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Nombre' name='nombre' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcion' />
          </Col>
        </Row>
      </Form>
      <Box my={2}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Datos dinámicos
          </Typography>
        </FormLabel>
      </Box>
      <DatoDinamicoRoutes />
    </Modal>
  );
};

export default TablaDinamicaEdit;
