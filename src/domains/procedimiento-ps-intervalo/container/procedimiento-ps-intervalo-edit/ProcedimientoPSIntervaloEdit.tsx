import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSIntervaloRepository } from '@domains/procedimiento-ps-intervalo/repository';
import { ProcedimientoPSIntervaloEditSchema } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit/schemas';
import { ProcedimientoPSIntervaloContext } from '@domains/procedimiento-ps-intervalo/contexts';
import type { ProcedimientoPSIntervaloEditSchemaType } from '@domains/procedimiento-ps-intervalo/container/procedimiento-ps-intervalo-edit/schemas';

import { ProductoSoftlandDropdown } from '@domains/producto-softland/container/producto-softland-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPSIntervaloEdit = () => {
  const _navigate = useNavigate();
  const { procedimientoPSId, procedimientoPSIntervaloId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPSIntervaloContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPSIntervaloEditSchemaType>({
    resolver: zodResolver(ProcedimientoPSIntervaloEditSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoPSIntervaloEditSchemaType) => {
      await ProcedimientoPSIntervaloRepository.updateProcedimientoPSIntervalo(data);

      mainDataGrid.reload();

      _navigate(`/procedimiento-ps/${procedimientoPSId}`);
    },
    [_navigate, mainDataGrid, procedimientoPSId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-ps/${procedimientoPSId}`);
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
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Producto Softland'>
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
              Actualizar Intervalo
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPSIntervaloEdit;
