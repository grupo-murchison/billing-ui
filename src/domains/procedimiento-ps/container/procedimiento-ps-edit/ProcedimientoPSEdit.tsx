import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSEditSchema } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';
import type { ProcedimientoPSEditSchemaType } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';

import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';
import Form from '@app/components/Form/Form';

const ProcedimientoPSEdit = () => {
  const { procedimientoPSId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPSContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPSEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPSEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-ps');
  }, [_navigate]);

  const onSubmit: SubmitHandler<ProcedimientoPSEditSchemaType> = useCallback(
    async data => {
      await ProcedimientoPSRepository.updateProcedimientoPS({ ...data, id: Number(procedimientoPSId) });
      mainDataGrid.reload();
      _navigate('/procedimiento-ps');
    },
    [_navigate, mainDataGrid],
  );

  useEffect(() => {
    ProcedimientoPSRepository.getProcedimientoPSById(procedimientoPSId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPSId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} isUpdate>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
              disabled={isSubmitting}
              fullWidth
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
              fullWidth
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoPSEdit;
