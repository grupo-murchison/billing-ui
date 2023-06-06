import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { ProcedimientoPIntervaloEditSchema } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit/schemas';
import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import type { ProcedimientoPIntervaloEditSchemaType } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPIntervaloEdit = () => {
  const _navigate = useNavigate();
  const { procedimientoPId, procedimientoPIntervaloId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPIntervaloEditSchemaType>({
    resolver: zodResolver(ProcedimientoPIntervaloEditSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoPIntervaloEditSchemaType) => {
      await ProcedimientoPIntervaloRepository.updateProcedimientoPIntervalo(data);

      mainDataGrid.reload();

      _navigate(`/procedimiento-p/${procedimientoPId}`);
    },
    [_navigate, mainDataGrid, procedimientoPId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}`);
  }, [_navigate, procedimientoPId]);

  useEffect(() => {
    ProcedimientoPIntervaloRepository.getProcedimientoPIntervaloById(procedimientoPIntervaloId || '').then(
      ({ data }) => {
        reset(data);
        setIsDataFetched(true);
      },
    );
  }, [procedimientoPIntervaloId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Producto Softland'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
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
          <Col md={6}>
            <TextField
              id='precio'
              label='Precio'
              type='number'
              {...register('precio', {
                valueAsNumber: true,
              })}
              error={!!formErrors.precio}
              helperText={formErrors?.precio?.message}
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

export default ProcedimientoPIntervaloEdit;
