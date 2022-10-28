import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';
import { ProcedimientoQVariableCreateSchema } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-create/schemas';
import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import type { ProcedimientoQVariableCreateSchemaType } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-create/schemas';

import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { DiccionarioDropdown } from '@domains/diccionario/container/diccionario-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoQVariableCreate = () => {
  const _navigate = useNavigate();
  const { procedimientoQId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoQVariableCreateSchemaType>({
    defaultValues: {
      procedimientoQId: parseInt(procedimientoQId || '-1'),
    },
    resolver: zodResolver(ProcedimientoQVariableCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoQVariableCreateSchemaType) => {
      await ProcedimientoQVariableRepository.createProcedimientoQVariable(data);

      mainDataGrid.reload();

      _navigate(`/procedimiento-q/${procedimientoQId}/edit`);
    },
    [_navigate, mainDataGrid, procedimientoQId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}/edit`);
  }, [_navigate, procedimientoQId]);

  return (
    <Modal isOpen onClose={handleClose} title='Nueva Variable'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='nombre'
              label='Nombre'
              error={!!formErrors.nombre}
              helperText={formErrors?.nombre?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TipoDatoDropdown
              id='tipo'
              label='Tipo'
              {...register('tipoId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.tipoId}
              helperText={formErrors?.tipoId?.message}
              disabled={isSubmitting}
              value={watch('tipoId')}
            />
          </Col>
          <Col md={6}>
            <DiccionarioDropdown
              id='diccionario'
              label='Diccionario'
              {...register('diccionarioId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.diccionarioId}
              helperText={formErrors?.diccionarioId?.message}
              disabled={isSubmitting}
              value={watch('diccionarioId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Crear Variable
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoQVariableCreate;