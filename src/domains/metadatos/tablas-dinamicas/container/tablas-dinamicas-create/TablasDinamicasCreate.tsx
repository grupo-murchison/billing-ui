import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { TablasDinamicasCreateSchema, TablasDinamicasCreateSchemaType } from './schemas';
import TablasDinamicasRepository from '../../repository/tablas-dinamicas.repository';
import { useConfirmDialog } from '@app/hooks';
import { TablasDinamicasContext } from '../../contexts';

const TablasDinamicasCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(TablasDinamicasContext);
  const confirmDialog = useConfirmDialog();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<TablasDinamicasCreateSchemaType>({
    defaultValues: {
      nombreTabla: '',
      descripcionTabla: '',
    },
    resolver: zodResolver(TablasDinamicasCreateSchema),
  });

  const onSubmit: SubmitHandler<TablasDinamicasCreateSchemaType> = useCallback(
    async data => {
      await TablasDinamicasRepository.createTablasDinamicas(data)
        .then(exito => {
          mainDataGrid.reload();
          _navigate('/tablas-dinamicas');
        })
        .catch(err => {
          const error = JSON.parse(err.message);
          if (error?.statusCode === 400) {
            setError('nombreTabla', { type: 'custom', message: error.message });
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
    _navigate('/tablas-dinamicas');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nueva Tabla Dinámica'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Nombre' name='nombreTabla' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcionTabla' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default TablasDinamicasCreate;
