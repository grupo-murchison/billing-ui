import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { ProcedimientoPSIntervaloEditValidationSchema } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit/schemas';
import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import type { ProcedimientoPSIntervaloEditFormDataType } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit/schemas';

import { ProductoSoftlandDropdown } from '@domains/producto-softland/container/producto-softland-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ProcedimientoPSIntervaloEdit = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId, procedimientoPSIntervaloId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPSIntervaloContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
  } = useForm<ProcedimientoPSIntervaloEditFormDataType>({
    defaultValues: {
      procedimientoProductoSoftlandId: parseInt(procedimientoPSId || '-1'),
      valorInicial: 1,
      valorFinal: 9999999,
      productoSoftlandId: undefined,
      intervalo: undefined,
    },
    resolver: zodResolver(ProcedimientoPSIntervaloEditValidationSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoPSIntervaloEditFormDataType> = useCallback(
    async data => {
      await ProcedimientoPSIntervaloRepository.updateProcedimientoPSIntervalo(data);
      mainDataGrid.reload();
      _navigate(`/procedimiento-ps/${procedimientoPSId}/edit`);
    },
    [_navigate, mainDataGrid, procedimientoPSId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-ps/${procedimientoPSId}/edit`);
  }, [_navigate, procedimientoPSId]);

  useEffect(() => {
    ProcedimientoPSIntervaloRepository.getProcedimientoPSIntervaloById(procedimientoPSIntervaloId || '').then(
      ({ data }) => {
        reset(data);
        setIsDataFetched(true);
      },
    );
  }, [procedimientoPSIntervaloId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Intervalo Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              label='Intervalo'
              name='intervalo'
              type='number'
              disabled={isSubmitting}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Valor Inicial'
              name='valorInicial'
              type='number'
              fullWidth
            />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              name='valorFinal'
              label='Valor Final'
              type='number'
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <ProductoSoftlandDropdown
              control={control}
              name='productoSoftlandId'
              disabled={isSubmitting}
              label='Producto Softland'
              emptyOption
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPSIntervaloEdit;
