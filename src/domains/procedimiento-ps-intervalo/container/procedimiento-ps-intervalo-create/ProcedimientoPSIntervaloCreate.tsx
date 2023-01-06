import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { ProcedimientoPSIntervaloCreateSchema } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create/schemas';
import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import type { ProcedimientoPSIntervaloCreateSchemaType } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-create/schemas';

import { ProductoSoftlandDropdown } from '@domains/producto-softland/container/producto-softland-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPSIntervaloCreate = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPSIntervaloContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPSIntervaloCreateSchemaType>({
    defaultValues: {
      procedimientoProductoSoftlandId: parseInt(procedimientoPSId || '-1'),
    },
    resolver: zodResolver(ProcedimientoPSIntervaloCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoPSIntervaloCreateSchemaType) => {
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
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento PS'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Row>
          <Col md={6}>
            <ProductoSoftlandDropdown
              id='productoSoftland'
              label='Producto Softland'
              {...register('productoSoftlandId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.productoSoftlandId}
              helperText={formErrors?.productoSoftlandId?.message}
              disabled={isSubmitting}
              value={watch('productoSoftlandId')}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='intervalo'
              label='Intervalo'
              type='number'
              {...register('intervalo', {
                valueAsNumber: true,
              })}
              error={!!formErrors.intervalo}
              helperText={formErrors?.intervalo?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='valorInicial'
              label='Valor Inicial'
              type='number'
              {...register('valorInicial', {
                valueAsNumber: true,
              })}
              error={!!formErrors.valorInicial}
              helperText={formErrors?.valorInicial?.message}
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='valorFinal'
              label='Valor Final'
              type='number'
              {...register('valorFinal', {
                valueAsNumber: true,
              })}
              error={!!formErrors.valorFinal}
              helperText={formErrors?.valorFinal?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Crear Intervalo
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPSIntervaloCreate;
