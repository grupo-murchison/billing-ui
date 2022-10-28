import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPIntervaloRepository } from '@domains/procedimiento-p-intervalo/repository';
import { ProcedimientoPIntervaloCreateSchema } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-create/schemas';
import { ProcedimientoPIntervaloContext } from '@domains/procedimiento-p-intervalo/contexts';
import type { ProcedimientoPIntervaloCreateSchemaType } from '@domains/procedimiento-p-intervalo/container/procedimiento-p-intervalo-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPIntervaloCreate = () => {
  const _navigate = useNavigate();
  const { procedimientoPId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoPIntervaloContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPIntervaloCreateSchemaType>({
    defaultValues: {
      procedimientoPId: parseInt(procedimientoPId || '-1'),
    },
    resolver: zodResolver(ProcedimientoPIntervaloCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoPIntervaloCreateSchemaType) => {
      await ProcedimientoPIntervaloRepository.createProcedimientoPIntervalo(data);

      mainDataGrid.reload();

      _navigate(`/procedimiento-p/${procedimientoPId}/edit`);
    },
    [_navigate, mainDataGrid, procedimientoPId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-p/${procedimientoPId}/edit`);
  }, [_navigate, procedimientoPId]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Procedimiento PS'>
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
              Crear Intervalo
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPIntervaloCreate;