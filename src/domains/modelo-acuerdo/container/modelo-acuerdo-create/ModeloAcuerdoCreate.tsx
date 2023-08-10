import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoCreateSchema } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create/schemas';
import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';
import type { ModeloAcuerdoCreateSchemaType } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';
import Form from '@app/components/Form/Form';

const ModeloAcuerdoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const {
    register,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ModeloAcuerdoCreateSchemaType>({
    defaultValues: {
      codigo: '',
      nombre: '',
      descripcion: '',
    },
    resolver: zodResolver(ModeloAcuerdoCreateSchema),
  });

  const onSubmit: SubmitHandler<ModeloAcuerdoCreateSchemaType> = useCallback(
    async data => {
      await ModeloAcuerdoRepository.createModeloAcuerdo(data);
      mainDataGrid.reload();
      _navigate('/modelo-acuerdo');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/modelo-acuerdo');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Modelo Acuerdo'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id='nombre'
              label='Nombre'
              {...register('nombre')}
              error={!!formErrors.nombre}
              helperText={formErrors?.nombre?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TextField
              id='descripcion'
              label='Descripción'
              {...register('descripcion')}
              error={!!formErrors.descripcion}
              helperText={formErrors?.descripcion?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModeloAcuerdoCreate;
