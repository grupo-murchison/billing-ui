import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ConceptoAcuerdoRepository } from '@domains/concepto-acuerdo/repository';
import { ConceptoAcuerdoEditSchema } from '@domains/concepto-acuerdo/container/concepto-acuerdo-edit/schemas';
import { ConceptoAcuerdoContext } from '@domains/concepto-acuerdo/contexts';
import type { ConceptoAcuerdoEditSchemaType } from '@domains/concepto-acuerdo/container/concepto-acuerdo-edit/schemas';

import { TipoServicioDropdown } from '@domains/tipo-servicio/container/tipo-servicio-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { ProcedimientoPDropdown } from '@domains/procedimiento-p/container/procedimiento-p-dropdown';
import { ProcedimientoQDropdown } from '@domains/procedimiento-q/container/procedimiento-q-dropdown';
import { ProcedimientoPSDropdown } from '@domains/procedimiento-ps/container/procedimiento-ps-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ConceptoAcuerdoEdit = () => {
  const _navigate = useNavigate();
  const { conceptoAcuerdoId } = useParams();

  const { mainDataGrid } = useContext(ConceptoAcuerdoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ConceptoAcuerdoEditSchemaType>({
    resolver: zodResolver(ConceptoAcuerdoEditSchema),
  });

  useEffect(() => {
    ConceptoAcuerdoRepository.getConceptoAcuerdoById(conceptoAcuerdoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [conceptoAcuerdoId, reset]);

  const onSubmit: SubmitHandler<ConceptoAcuerdoEditSchemaType> = useCallback(
    async data => {
      await ConceptoAcuerdoRepository.updateConceptoAcuerdo({ ...data, id: Number(conceptoAcuerdoId) });
      mainDataGrid.reload();
      _navigate('/concepto-acuerdo');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/concepto-acuerdo');
  }, [_navigate]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Concepto Acuerdo'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={12}>
            <ModeloAcuerdoDropdown
              control={control}
              name='modeloAcuerdoId'
              label='Modelo Acuerdo'
              error={!!formErrors.modeloAcuerdoId}
              disabled
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
            />
          </Col>
          <Col md={6}>
            <ProcedimientoPSDropdown
              control={control}
              name='procedimientoProductoSoftlandId'
              error={!!formErrors.procedimientoProductoSoftlandId}
              disabled={isSubmitting}
              label='Procedimiento Producto Softland'
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
            />
          </Col>
          <Col md={6}>
            <ProcedimientoQDropdown
              control={control}
              name='procedimientoQId'
              error={!!formErrors.procedimientoQId}
              disabled={isSubmitting}
              label='Procedimiento Cantidad'
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ConceptoAcuerdoEdit;
