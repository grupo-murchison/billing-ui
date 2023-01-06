import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';
import { ProcedimientoQVariableEditSchema } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-edit/schemas';
import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import type { ProcedimientoQVariableEditSchemaType } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-edit/schemas';

import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { DiccionarioDropdown } from '@domains/diccionario/container/diccionario-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoQVariableEdit = () => {
  const _navigate = useNavigate();
  const { procedimientoQId, procedimientoQVariableId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoQVariableEditSchemaType>({
    resolver: zodResolver(ProcedimientoQVariableEditSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoQVariableEditSchemaType) => {
      await ProcedimientoQVariableRepository.updateProcedimientoQVariable(data);

      mainDataGrid.reload();

      _navigate(`/procedimiento-q/${procedimientoQId}`);
    },
    [_navigate, mainDataGrid, procedimientoQId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}`);
  }, [_navigate, procedimientoQId]);

  useEffect(() => {
    ProcedimientoQVariableRepository.getProcedimientoQVariableById(procedimientoQVariableId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoQVariableId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Variable'>
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
              id='nombre'
              label='Nombre'
              {...register('nombre')}
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
              Actualizar Variable
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoQVariableEdit;
