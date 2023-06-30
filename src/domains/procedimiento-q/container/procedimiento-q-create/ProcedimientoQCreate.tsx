import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { TipoProcedimientoQDropdown } from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown';
import { ProcedimientoCustomDropdown } from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown';
import { ProcedimientoBuiltinDropdown } from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQCreateSchema } from '@domains/procedimiento-q/container/procedimiento-q-create/schemas';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import type { ProcedimientoQCreateSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

import { label } from '@domains/procedimiento-q/constants';

const ProcedimientoQCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
    setValue,
  } = useForm<ProcedimientoQCreateSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoQCreateSchema),
  });

  const onSubmit = useCallback(
    async (data: ProcedimientoQCreateSchemaType) => {
      // await ProcedimientoQRepository.createProcedimientoQ(data);
      console.log(data);
      mainDataGrid.reload();
      _navigate('/procedimiento-q');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-q');
  }, [_navigate]);

  useEffect(() => {
    if (watch('tipoProcedimientoQId') === 1) {
      setValue('procedimientoCustomId', 0);
      setDisablePBuiltin(false);
      setDisablePCustom(true);
    } else if (watch('tipoProcedimientoQId') === 2) {
      setDisablePBuiltin(true);
      setDisablePCustom(false);
    } else {
      setDisablePBuiltin(true);
      setDisablePCustom(true);
    }
  }, [watch('tipoProcedimientoQId')]);

  const [disablePBuiltin, setDisablePBuiltin] = useState(false);
  const [disablePCustom, setDisablePCustom] = useState(false);

  return (
    <Modal isOpen onClose={handleClose} title={`Nuevo ${label.procedimientoQ}`}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
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
            <TipoProcedimientoQDropdown
              id='tipoProcedimientoQId'
              label={`Tipo ${label.procedimientoQ}`}
              {...register('tipoProcedimientoQId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.tipoProcedimientoQId}
              helperText={formErrors?.tipoProcedimientoQId?.message}
              disabled={isSubmitting}
              value={watch('tipoProcedimientoQId')}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoBuiltinDropdown
              id='procedimientoBuiltinId'
              label='Procedimiento Builtin'
              {...register('procedimientoBuiltinId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.procedimientoBuiltinId}
              helperText={formErrors?.procedimientoBuiltinId?.message}
              disabled={isSubmitting || disablePBuiltin}
              value={watch('procedimientoBuiltinId')}
              emptyOption={{ value: 0, label: 'Ninguno', code: '', disabled: false }}

              // disabled={isSubmitting || watch('accionCode') !== 'FIL'}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoCustomDropdown
              id='procedimientoCustomId'
              label='Procedimiento Custom'
              {...register('procedimientoCustomId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.procedimientoCustomId}
              helperText={formErrors?.procedimientoCustomId?.message}
              disabled={isSubmitting || disablePCustom}
              value={watch('procedimientoCustomId')}
              emptyOption={{ value: 0, label: 'Ninguno', code: '', disabled: false }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} className='d-flex jc-end'>
            <Button color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
              Cancelar
            </Button>
            <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>
              Crear
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoQCreate;
