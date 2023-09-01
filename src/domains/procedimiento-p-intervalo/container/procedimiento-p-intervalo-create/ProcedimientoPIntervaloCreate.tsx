import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { ProcedimientoPIntervaloCreateSchema } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-create/schemas';
import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import type { ProcedimientoPIntervaloCreateSchemaType } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ProcedimientoPIntervaloCreate = () => {
  const _navigate = useNavigate();
  const { procedimientoPId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProcedimientoPIntervaloCreateSchemaType>({
    defaultValues: {
      procedimientoPId: parseInt(procedimientoPId || '-1'),
      valorInicial: 1,
      valorFinal: 9999999,
    },
    resolver: zodResolver(ProcedimientoPIntervaloCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoPIntervaloCreateSchemaType> = useCallback(
    async data => {
      await ProcedimientoPIntervaloRepository.createProcedimientoPIntervalo(data);
      mainDataGrid.reload();
      _navigate(`/procedimiento-p/${procedimientoPId}`);
    },
    [_navigate, mainDataGrid, procedimientoPId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}`);
  }, [_navigate, procedimientoPId]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Intervalo' name='intervalo' type='number' />
          </Col>
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
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Valor Final'
              name='valorFinal'
              type='number'
            />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Precio' name='precio' type='number' />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPIntervaloCreate;
