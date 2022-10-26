import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';
import { ConceptoAcuerdoCreateSchema } from '@domains/concepto-acuerdo/container/concepto-acuerdo-create/schemas';
import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import type { ConceptoAcuerdoCreateSchemaType } from '@domains/concepto-acuerdo/container/concepto-acuerdo-create/schemas';

import { TipoServicioDropdown } from '@domains/tipo-servicio/container/tipo-servicio-dropdown';
import { ProcedimientoPDropdown } from '@domains/procedimiento-p/container/procedimiento-p-dropdown';
import { ProcedimientoQDropdown } from '@domains/procedimiento-q/container/procedimiento-q-dropdown';
import { ProcedimientoPSDropdown } from '@domains/procedimiento-ps/container/procedimiento-ps-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ConceptoAcuerdoCreate = () => {
  const _navigate = useNavigate();
  const { modeloAcuerdoId } = useParams();

  const { mainDataGrid } = useContext(ConceptoAcuerdoContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ConceptoAcuerdoCreateSchemaType>({
    defaultValues: {
      modeloAcuerdoId: parseInt(modeloAcuerdoId || '-1'),
    },
    resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ConceptoAcuerdoCreateSchemaType) => {
      await ConceptoAcuerdoRepository.createConceptoAcuerdo(data);

      mainDataGrid.reload();

      _navigate(`/modelo-acuerdo/${modeloAcuerdoId}/edit`);
    },
    [_navigate, mainDataGrid, modeloAcuerdoId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/modelo-acuerdo/${modeloAcuerdoId}/edit`);
  }, [_navigate, modeloAcuerdoId]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Concepto'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Row>
          <Col md={12}>
            <TextField
              id='descripcion'
              label='Descripción'
              error={!!formErrors.descripcion}
              helperText={formErrors?.descripcion?.message}
              disabled={isSubmitting}
              {...register('descripcion')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TipoServicioDropdown
              id='tipoServicio'
              label='Tipo Servicio'
              {...register('tipoServicioId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.tipoServicioId}
              helperText={formErrors?.tipoServicioId?.message}
              disabled={isSubmitting}
              value={watch('tipoServicioId')}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoPSDropdown
              id='procedimientoProductoSoftland'
              label='Procedimiento PS'
              {...register('procedimientoProductoSoftlandId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.procedimientoProductoSoftlandId}
              helperText={formErrors?.procedimientoProductoSoftlandId?.message}
              disabled={isSubmitting}
              value={watch('procedimientoProductoSoftlandId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoPDropdown
              id='procedimientoP'
              label='Procedimiento P'
              {...register('procedimientoPId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.procedimientoPId}
              helperText={formErrors?.procedimientoPId?.message}
              disabled={isSubmitting}
              value={watch('procedimientoPId')}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoQDropdown
              id='procedimientoQ'
              label='Procedimiento Q'
              {...register('procedimientoQId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.procedimientoQId}
              helperText={formErrors?.procedimientoQId?.message}
              disabled={isSubmitting}
              value={watch('procedimientoQId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Crear Concepto
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ConceptoAcuerdoCreate;
