import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';
import { ProcedimientoQVariableCreateSchema } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-create/schemas';
import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import type { ProcedimientoQVariableCreateSchemaType } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-create/schemas';

import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { DiccionarioDropdown } from '@domains/diccionario/container/diccionario-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';
import Form from '@app/components/Form/Form';

const ProcedimientoQVariableCreate = () => {
  const _navigate = useNavigate();
  const { procedimientoQId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoQVariableCreateSchemaType>({
    defaultValues: {
      procedimientoQId: parseInt(procedimientoQId || '-1'),
    },
    resolver: zodResolver(ProcedimientoQVariableCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoQVariableCreateSchemaType> = useCallback(
    async data => {
      await ProcedimientoQVariableRepository.createProcedimientoQVariable(data);
      mainDataGrid.reload();
      _navigate(`/procedimiento-q/${procedimientoQId}`);
    },
    [_navigate, mainDataGrid, procedimientoQId],
  );

  const handleClose = useCallback(() => {
    _navigate(`/procedimiento-q/${procedimientoQId}`);
  }, [_navigate, procedimientoQId]);

  return (
    <Modal isOpen onClose={handleClose} title='Nueva Variable'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting}>
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
              id='nombre'
              label='Nombre'
              {...register('nombre')}
              error={!!formErrors.nombre}
              helperText={formErrors?.nombre?.message}
              disabled={isSubmitting}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TipoDatoDropdown
              control={control}
              name='tipoId'
              error={!!formErrors.tipoId}
              disabled={isSubmitting}
              label='Tipo'
              helperText={formErrors?.tipoId?.message}
              emptyOption={false}
            />
          </Col>
          <Col md={6}>
            <DiccionarioDropdown
              control={control}
              name='diccionarioId'
              error={!!formErrors.diccionarioId}
              disabled={isSubmitting}
              label='Diccionario'
              helperText={formErrors?.diccionarioId?.message}
              emptyOption={false}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoQVariableCreate;
