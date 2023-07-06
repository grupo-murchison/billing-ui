import { useCallback, useContext, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQCreateSchema } from '@domains/procedimiento-q/container/procedimiento-q-create/schemas';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import type { ProcedimientoQCreateSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';

import { label } from '@domains/procedimiento-q/constants';
import Form from '@app/components/Form/Form';
import ProcedimientoBuiltinDropdownController from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown/ProcedimientoBuiltinDropdownController';
import ProcedimientoCustomDropdownController from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown/ProcedimientoCustomDropdownController';
import TipoProcedimientoQDropdownController from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown/TipoProcedimientoQDropdownController';

const ProcedimientoQCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    setValue,
  } = useForm<ProcedimientoQCreateSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      denominacion: '',
      tipoProcedimientoQId: null,
      procedimientoBuiltinId: null,
      procedimientoCustomId: null,
    },
    resolver: zodResolver(ProcedimientoQCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoQCreateSchemaType> = useCallback(
    async data => {
      await ProcedimientoQRepository.createProcedimientoQ(data);
      mainDataGrid.reload();
      _navigate('/procedimiento-q');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-q');
  }, [_navigate]);

  const [disablePBuiltin, setDisablePBuiltin] = useState(false);
  const [disablePCustom, setDisablePCustom] = useState(false);

  const onChangeTipoProcedimientoCantidad = (data: any) => {
    //TODO habria que comparar con el "code" de las options que viene del back
    const label: string = data.props.children;
    if (label.includes('BUILT')) {
      setValue('procedimientoCustomId', null);
      setDisablePBuiltin(false);
      setDisablePCustom(true);
    } else if (label.includes('CUST')) {
      setValue('procedimientoBuiltinId', null);
      setDisablePBuiltin(true);
      setDisablePCustom(false);
    } else if (label.includes('EXT')) {
      setValue('procedimientoBuiltinId', null);
      setValue('procedimientoCustomId', null);
      setDisablePBuiltin(true);
      setDisablePCustom(true);
    }
  };

  return (
    <Modal isOpen onClose={handleClose} title={`Nuevo ${label.procedimientoQ}`}>
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
          <Col md={12}>
            <TextField
              id='descripcion'
              label='Descripción'
              {...register('descripcion')}
              error={!!formErrors.descripcion}
              helperText={formErrors?.descripcion?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <TipoProcedimientoQDropdownController
              onChange={onChangeTipoProcedimientoCantidad}
              control={control}
              name='tipoProcedimientoQId'
              error={!!formErrors.tipoProcedimientoQId}
              disabled={isSubmitting}
              label={`Tipo ${label.procedimientoQ}`}
              helperText={formErrors?.tipoProcedimientoQId?.message}
              emptyOption={false}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoBuiltinDropdownController
              control={control}
              name='procedimientoBuiltinId'
              error={!!formErrors.procedimientoBuiltinId}
              disabled={isSubmitting || disablePBuiltin}
              label='Procedimiento Builtin'
              helperText={formErrors?.procedimientoBuiltinId?.message}
              emptyOption
            />
          </Col>
          <Col md={6}>
            <ProcedimientoCustomDropdownController
              control={control}
              name='procedimientoCustomId'
              error={!!formErrors.procedimientoCustomId}
              disabled={isSubmitting || disablePCustom}
              label='Procedimiento Custom'
              helperText={formErrors?.procedimientoCustomId?.message}
              emptyOption
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoQCreate;
