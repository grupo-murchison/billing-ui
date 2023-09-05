import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

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

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ConceptoAcuerdoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ConceptoAcuerdoContext);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ConceptoAcuerdoCreateSchemaType>({
    defaultValues: {},
    resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const onSubmit: SubmitHandler<ConceptoAcuerdoCreateSchemaType> = useCallback(
    async data => {
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
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={12}>
            <ModeloAcuerdoDropdown
              control={control}
              name='modeloAcuerdoId'
              error={!!formErrors.modeloAcuerdoId}
              disabled={isSubmitting}
              label='Modelo Acuerdo'
              helperText={formErrors?.modeloAcuerdoId?.message}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcion' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TipoServicioDropdown
              control={control}
              name='tipoServicioId'
              error={!!formErrors.tipoServicioId}
              disabled={isSubmitting}
              label='Tipo Servicio'
              helperText={formErrors?.tipoServicioId?.message}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoPSDropdown
              control={control}
              name='procedimientoProductoSoftlandId'
              error={!!formErrors.procedimientoProductoSoftlandId}
              disabled={isSubmitting}
              label='Procedimiento Producto Softland'
              helperText={formErrors?.procedimientoProductoSoftlandId?.message}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoPDropdown
              control={control}
              name='procedimientoPId'
              error={!!formErrors.procedimientoPId}
              disabled={isSubmitting}
              label='Procedimiento Precio'
              helperText={formErrors?.procedimientoPId?.message}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoQDropdown
              control={control}
              name='procedimientoQId'
              error={!!formErrors.procedimientoQId}
              disabled={isSubmitting}
              label='Procedimiento Cantidad'
              helperText={formErrors?.procedimientoQId?.message}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ConceptoAcuerdoCreate;
