import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPCreateSchema } from '@domains/procedimiento-p/container/procedimiento-p-create/schemas';
import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';
import type { ProcedimientoPCreateSchemaType } from '@domains/procedimiento-p/container/procedimiento-p-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      monedaId: 1,
    },
    resolver: zodResolver(ProcedimientoPCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoPCreateSchemaType) => {
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
              id='monedaId'
              label='Moneda'
              {...register('monedaId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.monedaId}
              helperText={formErrors?.monedaId?.message}
              disabled={isSubmitting}
              value={watch('monedaId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className='d-flex jc-end'>
            <Button color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
              Cancelar
            </Button>
            <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>
              Crear
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPCreate;
