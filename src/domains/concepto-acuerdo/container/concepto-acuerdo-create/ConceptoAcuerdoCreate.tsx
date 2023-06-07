import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import {  Modal, Row, Col } from '@app/components';

import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';
import { ConceptoAcuerdoCreateSchema } from '@domains/concepto-acuerdo/container/concepto-acuerdo-create/schemas';
import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import type { ConceptoAcuerdoCreateSchemaType } from '@domains/concepto-acuerdo/container/concepto-acuerdo-create/schemas';

import { TipoServicioDropdown } from '@domains/tipo-servicio/container/tipo-servicio-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { ProcedimientoPDropdown } from '@domains/procedimiento-p/container/procedimiento-p-dropdown';
import { ProcedimientoQDropdown } from '@domains/procedimiento-q/container/procedimiento-q-dropdown';
import { ProcedimientoPSDropdown } from '@domains/procedimiento-ps/container/procedimiento-ps-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ConceptoAcuerdoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ConceptoAcuerdoContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ConceptoAcuerdoCreateSchemaType>({
    defaultValues: {},
    resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ConceptoAcuerdoCreateSchemaType) => {
      await ConceptoAcuerdoRepository.createConceptoAcuerdo(data);

      mainDataGrid.reload();

      _navigate('/concepto-acuerdo');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/concepto-acuerdo');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Concepto Acuerdo'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Row>
          <Col md={12}>
            <ModeloAcuerdoDropdown
              id='modeloAcuerdo'
              label='Modelo Acuerdo'
              {...register('modeloAcuerdoId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.modeloAcuerdoId}
              helperText={formErrors?.modeloAcuerdoId?.message}
              disabled={isSubmitting}
              value={watch('modeloAcuerdoId')}
            />
          </Col>
        </Row>
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
              label='Procedimiento Producto Softland'
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
              label='Procedimiento Precio'
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
              label='Procedimiento Cantidad'
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

export default ConceptoAcuerdoCreate;
