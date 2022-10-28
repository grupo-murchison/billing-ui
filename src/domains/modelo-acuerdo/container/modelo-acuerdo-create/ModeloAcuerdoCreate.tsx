import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoCreateSchema } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create/schemas';
import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';
import type { ModeloAcuerdoCreateSchemaType } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ModeloAcuerdoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ModeloAcuerdoCreateSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
    },
    resolver: zodResolver(ModeloAcuerdoCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ModeloAcuerdoCreateSchemaType) => {
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
    <Modal isOpen onClose={handleClose} title='Nuevo Modelo'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='descripcion'
              label='Descripción'
              {...register('descripcion')}
              error={!!formErrors.descripcion}
              helperText={formErrors?.descripcion?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Crear Modelo
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ModeloAcuerdoCreate;