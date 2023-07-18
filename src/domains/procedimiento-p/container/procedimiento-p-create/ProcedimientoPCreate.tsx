import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPCreateSchema } from '@domains/procedimiento-p/container/procedimiento-p-create/schemas';
import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';
import type { ProcedimientoPCreateSchemaType } from '@domains/procedimiento-p/container/procedimiento-p-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';
import Form from '@app/components/Form/Form';

const ProcedimientoPCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      monedaId: 1,
    },
    resolver: zodResolver(ProcedimientoPCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoPCreateSchemaType> = useCallback(
    async data => {
      await ProcedimientoPRepository.createProcedimientoP(data);
      mainDataGrid.reload();
      _navigate('/procedimiento-p');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-p');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento Precio'>
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
              emptyOption={false}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPCreate;
