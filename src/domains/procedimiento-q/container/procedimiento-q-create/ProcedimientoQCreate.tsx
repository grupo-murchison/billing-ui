import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { TipoProcedimientoQDropdown } from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown';
import { TipoProcedimientoCustomDropdown } from '@domains/tipo-procedimiento-custom/container/tipo-procedimiento-custom-dropdown';
import { TipoProcedimientoBuiltinDropdown } from '@domains/tipo-procedimiento-builtin/container/tipo-procedimiento-builtin-dropdown';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQCreateSchema } from '@domains/procedimiento-q/container/procedimiento-q-create/schemas';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import type { ProcedimientoQCreateSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoQCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoQCreateSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoQCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoQCreateSchemaType) => {
      await ProcedimientoQRepository.createProcedimientoQ(data);

      mainDataGrid.reload();
      _navigate('/procedimiento-q');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-q');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento Q'>
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
            <TextField
              id='descripcion'
              label='Descripción'
              {...register('descripcion')}
              error={!!formErrors.descripcion}
              helperText={formErrors?.descripcion?.message}
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <TipoProcedimientoQDropdown
              id='tipoProcedimientoQ'
              label='Tipo Procedimiento Q'
              {...register('tipoProcedimientoQId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.tipoProcedimientoQId}
              helperText={formErrors?.tipoProcedimientoQId?.message}
              disabled={isSubmitting}
              value={watch('tipoProcedimientoQId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TipoProcedimientoCustomDropdown
              id='tipoProcedimientoCustom'
              label='Tipo Procedimiento Custom'
              {...register('tipoProcedimientoCustomId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.tipoProcedimientoCustomId}
              helperText={formErrors?.tipoProcedimientoCustomId?.message}
              disabled={isSubmitting}
              value={watch('tipoProcedimientoCustomId')}
            />
          </Col>
          <Col md={6}>
            <TipoProcedimientoBuiltinDropdown
              id='tipoProcedimientoBuiltin'
              label='Tipo Procedimiento Builtin'
              {...register('tipoProcedimientoBuiltinId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.tipoProcedimientoBuiltinId}
              helperText={formErrors?.tipoProcedimientoBuiltinId?.message}
              disabled={isSubmitting}
              value={watch('tipoProcedimientoBuiltinId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Crear Procedimiento
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoQCreate;
