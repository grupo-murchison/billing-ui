import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoEditSchema } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit/schemas';
import type { ModeloAcuerdoEditSchemaType } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ModeloAcuerdoEdit = () => {
  const { modeloAcuerdoId } = useParams();
  const _navigate = useNavigate();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ModeloAcuerdoEditSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
    },
    resolver: zodResolver(ModeloAcuerdoEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/modelo-acuerdo');
  }, [_navigate]);

  useEffect(() => {
    ModeloAcuerdoRepository.getModeloAcuerdoById(modeloAcuerdoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [modeloAcuerdoId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Modelo Acuerdo'>
      <form noValidate autoComplete='off'>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='nombre'
              label='Nombre'
              {...register('nombre')}
              error={!!formErrors.nombre}
              helperText={formErrors?.nombre?.message}
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
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button variant='outlined' color='secondary' onClick={handleClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Actualizar
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ModeloAcuerdoEdit;
