import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSCreateSchema } from '@domains/procedimiento-ps/container/procedimiento-ps-create/schemas';
import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';
import type { ProcedimientoPSCreateSchemaType } from '@domains/procedimiento-ps/container/procedimiento-ps-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ProcedimientoPSCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPSContext);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ProcedimientoPSCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPSCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoPSCreateSchemaType> = useCallback(
    async data => {
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
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} name='codigo' label='Código' fullWidth />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Denominación'
              name='denominacion'
              fullWidth
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPSCreate;
