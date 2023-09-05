import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { ModeloAcuerdoEditSchema } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit/schemas';
import type { ModeloAcuerdoEditSchemaType } from '@domains/modelo-acuerdo/container/modelo-acuerdo-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { ModeloAcuerdoContext } from '@domains/modelo-acuerdo/contexts';
import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ModeloAcuerdoEdit = () => {
  const { modeloAcuerdoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
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
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
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

export default ModeloAcuerdoEdit;
