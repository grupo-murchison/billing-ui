import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSEditValidationSchema } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';
import type { ProcedimientoPSEditFormDataType } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';

import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useConfirmDialog } from '@app/hooks';
import { ProcedimientoPSIntervaloWithinProcedimientoPSRoutes } from '@domains/procedimiento-ps-intervalo/navigation';

const ProcedimientoPSEdit = () => {
  const { procedimientoPSId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPSContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<ProcedimientoPSEditFormDataType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPSEditValidationSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-ps');
  }, [_navigate]);

  const onSubmit: SubmitHandler<ProcedimientoPSEditFormDataType> = useCallback(
    async data => {
      await ProcedimientoPSRepository.updateProcedimientoPS({ ...data, id: Number(procedimientoPSId) })
        .then(() => {
          mainDataGrid.reload();
          _navigate('/procedimiento-ps');
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

  useEffect(() => {
    ProcedimientoPSRepository.getProcedimientoPSById(procedimientoPSId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPSId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' fullWidth />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Denominación'
              name='denominacion'
              fullWidth
            />
          </Col>
        </Row>
      </Form>
      <ProcedimientoPSIntervaloWithinProcedimientoPSRoutes />
    </Modal>
  );
};

export default ProcedimientoPSEdit;
