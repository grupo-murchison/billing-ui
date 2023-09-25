import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { ProcedimientoPSIntervaloCreateSchema } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create/schemas';
import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import type { ProcedimientoPSIntervaloCreateSchemaType } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create/schemas';

import { ProductoSoftlandDropdown } from '@domains/producto-softland/container/producto-softland-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ProcedimientoPSIntervaloCreate = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPSIntervaloContext);

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = useForm<ProcedimientoPSIntervaloCreateSchemaType>({
    defaultValues: {
      procedimientoProductoSoftlandId: parseInt(procedimientoPSId || '-1'),
      valorInicial: 1,
      valorFinal: 9999999,
      productoSoftlandId: '',
      intervalo: '',
    },
    resolver: zodResolver(ProcedimientoPSIntervaloCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoPSIntervaloCreateSchemaType> = useCallback(
    async data => {
      await ProcedimientoPSIntervaloRepository.createProcedimientoPSIntervalo(data);
      mainDataGrid.reload();
      _navigate(`/procedimiento-ps/${procedimientoPSId}`);
    },
    [_navigate, mainDataGrid, procedimientoPSId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-ps/${procedimientoPSId}`);
  }, [_navigate, procedimientoPSId]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Intervalo Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Intervalo'
              name='intervalo'
              type='number'
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
              label='Valor Final'
              name='valorFinal'
              type='number'
              disabled={isSubmitting}
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

export default ProcedimientoPSIntervaloCreate;
