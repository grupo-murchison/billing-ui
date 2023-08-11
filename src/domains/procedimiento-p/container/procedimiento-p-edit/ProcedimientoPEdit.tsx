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

import { TextField } from '@mui/material';
import Form from '@app/components/Form/Form';

const ProcedimientoPEdit = () => {
  const { procedimientoPId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors: formErrors, isSubmitting },
    handleSubmit,
    control,
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
      await ProcedimientoPRepository.updateProcedimientoP({ ...data, id: Number(procedimientoPId) });
      mainDataGrid.reload();
      _navigate('/procedimiento-p');
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
              id='denominacion'
              label='Denominación'
              {...register('denominacion')}
              error={!!formErrors.denominacion}
              helperText={formErrors?.denominacion?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <MonedaDropdown
              control={control}
              name='monedaId'
              error={!!formErrors.monedaId}
              disabled={isSubmitting}
              label='Moneda'
              helperText={formErrors?.monedaId?.message}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPEdit;
