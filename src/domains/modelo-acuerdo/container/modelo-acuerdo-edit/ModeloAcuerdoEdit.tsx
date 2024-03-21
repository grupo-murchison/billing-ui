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
import { useConfirmDialog } from '@app/hooks';

const ModeloAcuerdoEdit = () => {
  const { modeloAcuerdoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ModeloAcuerdoContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
    setError,
  } = useForm<ModeloAcuerdoEditSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
    },
    resolver: zodResolver(ModeloAcuerdoEditSchema),
  });

  const onSubmit: SubmitHandler<ModeloAcuerdoEditSchemaType> = useCallback(
    async data => {
      await ModeloAcuerdoRepository.updateModeloAcuerdo(data, +modeloAcuerdoId!)
        .then(() => {
          mainDataGrid.reload();
          _navigate('/modelo-acuerdo');
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
