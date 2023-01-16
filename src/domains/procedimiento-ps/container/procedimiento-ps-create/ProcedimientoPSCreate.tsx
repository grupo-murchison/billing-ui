import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Button, Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSCreateSchema } from '@domains/procedimiento-ps/container/procedimiento-ps-create/schemas';
import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';
import type { ProcedimientoPSCreateSchemaType } from '@domains/procedimiento-ps/container/procedimiento-ps-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';

const ProcedimientoPSCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPSContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPSCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPSCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoPSCreateSchemaType) => {
      await ProcedimientoPSRepository.createProcedimientoPS(data);

      mainDataGrid.reload();

      _navigate('/procedimiento-ps');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-ps');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento PS'>
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
          <Col md={12} className='d-flex jc-end'>
            <Button color='secondary' outlined disabled={isSubmitting} onClick={handleClose}>
              Cancelar
            </Button>
            <Button color='primary' type='submit' disabled={isSubmitting}>
              Crear
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPSCreate;
