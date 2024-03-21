import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { TablaDinamicaCreateSchema, TablaDinamicaCreateSchemaType } from './schemas';
import { useConfirmDialog } from '@app/hooks';
import { TablaDinamicaContext } from '../../contexts';
import TablaDinamicaRepository from '../../repository/tabla-dinamica.repository';

const TablasDinamicasCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(TablaDinamicaContext);
  const confirmDialog = useConfirmDialog();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<TablaDinamicaCreateSchemaType>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      codigo: '',
    },
    resolver: zodResolver(TablaDinamicaCreateSchema),
  });

  const onSubmit: SubmitHandler<TablaDinamicaCreateSchemaType> = useCallback(
    async data => {
      await TablaDinamicaRepository.createTablaDinamica(data)
        .then(() => {
          mainDataGrid.reload();
          _navigate('/tabla-dinamica');
        })
        .catch(err => {
          const error = JSON.parse(err.message);
          if (error?.statusCode === 400) {
            setError('codigo', { type: 'custom', message: error.message });
            confirmDialog.open({
              type: 'reject',
              title: 'No es posible realizar esta acción',
              message: `${error.message}`,
              onClickYes() {
                confirmDialog.close();
              },
            });
          }
        });
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/tabla-dinamica');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nueva Tabla Dinámica'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' />
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
    </Modal>
  );
};

export default TablasDinamicasCreate;
