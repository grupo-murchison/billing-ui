import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoCreateSchema } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create/schemas';
import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';
import type { ModeloAcuerdoCreateSchemaType } from '@domains/modelo-acuerdo/container/modelo-acuerdo-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ModeloAcuerdoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
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
          <Col md={12}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcion' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModeloAcuerdoCreate;
