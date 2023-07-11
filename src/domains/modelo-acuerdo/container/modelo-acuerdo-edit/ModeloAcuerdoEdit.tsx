import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoEditSchema } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit/schemas';
import type { ModeloAcuerdoEditSchemaType } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';
import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';
import Form from '@app/components/Form/Form';

const ModeloAcuerdoEdit = () => {
  const { modeloAcuerdoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ModeloAcuerdoEditSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
    },
    resolver: zodResolver(ModeloAcuerdoEditSchema),
  });

  const onSubmit: SubmitHandler<ModeloAcuerdoEditSchemaType> = useCallback(
    async data => {
      await ModeloAcuerdoRepository.updateModeloAcuerdo(data, +modeloAcuerdoId!);
      mainDataGrid.reload();
      _navigate('/modelo-acuerdo');
    },
    [_navigate, mainDataGrid],
  );

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
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} isUpdate>
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
      </Form>
    </Modal>
  );
};

export default ModeloAcuerdoEdit;
