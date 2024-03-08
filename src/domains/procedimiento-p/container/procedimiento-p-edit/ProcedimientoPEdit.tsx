import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPEditSchema } from '@domains/procedimiento-p/container/procedimiento-p-edit/schemas';
import type { ProcedimientoPEditSchemaType } from '@domains/procedimiento-p/container/procedimiento-p-edit/schemas';

import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { useConfirmDialog } from '@app/hooks';

const ProcedimientoPEdit = () => {
  const { procedimientoPId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
    setError,
  } = useForm<ProcedimientoPEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPEditSchema),
  });

  useEffect(() => {
    ProcedimientoPRepository.getProcedimientoPById(procedimientoPId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPId, reset]);

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-p');
  }, [_navigate]);

  const onSubmit: SubmitHandler<ProcedimientoPEditSchemaType> = useCallback(
    async data => {
      await ProcedimientoPRepository.updateProcedimientoP({ ...data, id: Number(procedimientoPId) })
        .then(() => {
          mainDataGrid.reload();
          _navigate('/procedimiento-p');
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

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Precio'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        {' '}
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Denominación' name='denominacion' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <MonedaDropdown control={control} name='monedaId' disabled={isSubmitting} label='Moneda' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPEdit;
