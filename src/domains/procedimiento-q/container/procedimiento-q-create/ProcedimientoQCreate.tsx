import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

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
import Form from '@app/components/Form/Form';
import { ProcedimientoBuiltinDropdownController } from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown/ProcedimientoBuiltinDropdown';
import { ProcedimientoCustomDropdownController } from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown/ProcedimientoCustomDropdown';
import { TipoProcedimientoQDropdownController } from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown/TipoProcedimientoQDropdown';

const ProcedimientoQCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
    setValue,
    reset,
  } = useForm<ProcedimientoQCreateSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      denominacion: '',
      tipoProcedimientoQId: 0,
      procedimientoBuiltinId: 0,
      procedimientoCustomId: 0,
    },
    resolver: zodResolver(ProcedimientoQCreateSchema),
  });

  const onSubmit: SubmitHandler<ProcedimientoQCreateSchemaType> = useCallback(
    async data => {
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

  // useEffect(() => {
  //   if (watch('tipoProcedimientoQId') === 1) {
  //     setValue('procedimientoCustomId', 0);
  //     setDisablePBuiltin(false);
  //     setDisablePCustom(true);
  //   } else if (watch('tipoProcedimientoQId') === 2) {
  //     setDisablePBuiltin(true);
  //     setDisablePCustom(false);
  //   } else if (watch('tipoProcedimientoQId') === 3) {
  //     setDisablePBuiltin(true);
  //     setDisablePCustom(true);
  //   }
  // }, [watch('tipoProcedimientoQId')]);

  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === 'tipoProcedimientoQId' && value['tipoProcedimientoQId'] === 1) {
  //       resetField('procedimientoCustomId');
  //       setValue('procedimientoCustomId', 0);
  //       setDisablePBuiltin(false);
  //       setDisablePCustom(true);
  //     } else if (name === 'tipoProcedimientoQId' && value['tipoProcedimientoQId'] === 2) {
  //       setValue('procedimientoBuiltinId', 0);
  //       setDisablePBuiltin(true);
  //       setDisablePCustom(false);
  //     } else if (name === 'tipoProcedimientoQId' && value['tipoProcedimientoQId'] === 3) {
  //       setValue('procedimientoCustomId', 0);
  //       setValue('procedimientoBuiltinId', 0);
  //       setDisablePBuiltin(true);
  //       setDisablePCustom(true);
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [watch]);

  const onChangeTipoProcedimientoCantidad = (value: any, onChange: (...event: string[]) => void) => {
    // console.log('data', data);
    // const { value } = data;
    // if (value === 1) {
    //   reset({ procedimientoCustomId: 0 });
    // }

    onChange(value);
    if (value === 1) {
      reset({ procedimientoCustomId: 0 });
    }
    console.log('value', value);
  };

  const [disablePBuiltin, setDisablePBuiltin] = useState(false);
  const [disablePCustom, setDisablePCustom] = useState(false);

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
              emptyOption={{ value: 0, label: 'Ninguno', code: '', disabled: true }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoBuiltinDropdownController
              control={control}
              name='procedimientoBuiltinId'
              error={!!formErrors.procedimientoBuiltinId}
              // disabled={isSubmitting}
              disabled={isSubmitting || disablePBuiltin}
              label='Procedimiento Builtin'
              helperText={formErrors?.procedimientoBuiltinId?.message}
              emptyOption={{ value: 0, label: 'Ninguno', code: '', disabled: false }}
            />
          </Col>
          <Col md={6}>
            <ProcedimientoCustomDropdownController
              control={control}
              name='procedimientoCustomId'
              error={!!formErrors.procedimientoCustomId}
              disabled={isSubmitting || disablePCustom}
              // disabled={isSubmitting}
              label='Procedimiento Custom'
              helperText={formErrors?.procedimientoCustomId?.message}
              emptyOption={{ value: 0, label: 'Ninguno', code: '', disabled: false }}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoQCreate;
