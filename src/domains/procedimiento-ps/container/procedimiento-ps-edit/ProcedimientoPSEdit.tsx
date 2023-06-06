import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSEditSchema } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';
import type { ProcedimientoPSEditSchemaType } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';

import { ProcedimientoPSContext } from '@domains/procedimiento-ps/contexts';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPSEdit = () => {
  const { procedimientoPSId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPSContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit: rhfHandleSubmit,
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

  const handleSubmit = useCallback(
    async (data: ProcedimientoPSEditSchemaType) => {
      await ProcedimientoPSRepository.updateProcedimientoPS(data);

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
          <Col md={12} textAlign='right'>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Actualizar 
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPSEdit;
