import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQVariableRepository } from '@domains/procedimiento-q-variable/repository';
import { ProcedimientoQVariableEditSchema } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-edit/schemas';
import { ProcedimientoQVariableContext } from '@domains/procedimiento-q-variable/contexts';
import type { ProcedimientoQVariableEditSchemaType } from '@domains/procedimiento-q-variable/container/procedimiento-q-variable-edit/schemas';

import { TipoDatoDropdown } from '@domains/tipo-dato/container/tipo-dato-dropdown';
import { DiccionarioDropdown } from '@domains/diccionario/container/diccionario-dropdown';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ProcedimientoQVariableEdit = () => {
  const _navigate = useNavigate();
  const { procedimientoQId, procedimientoQVariableId } = useParams();

  const { mainDataGrid } = useContext(ProcedimientoQVariableContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoQVariableEditSchemaType>({
    resolver: zodResolver(ProcedimientoQVariableEditSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoQVariableEditSchemaType> = useCallback(
    async data => {
      await ProcedimientoQVariableRepository.updateProcedimientoQVariable({ ...data, id: Number(procedimientoQId) });
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
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' fullWidth />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Nombre' name='nombre' fullWidth />
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
              emptyOption={false}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoQVariableEdit;
