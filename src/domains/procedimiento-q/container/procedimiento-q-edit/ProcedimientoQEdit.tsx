import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQEditSchema } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';
import type { ProcedimientoQEditSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';
import { label } from '@domains/procedimiento-q/constants';
import { TipoProcedimientoQDropdown } from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown';
import { ProcedimientoCustomDropdown } from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown';
import { ProcedimientoBuiltinDropdown } from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown';
import Form from '@app/components/Form/Form';
import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import TipoProcedimientoQDropdownController from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown/TipoProcedimientoQDropdownController';
import ProcedimientoBuiltinDropdownController from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown/ProcedimientoBuiltinDropdownController';
import ProcedimientoCustomDropdownController from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown/ProcedimientoCustomDropdownController';

const ProcedimientoQEdit = () => {
  const { procedimientoQId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [isLoading, setLoading] = useState(false);
  const [disablePBuiltin, setDisablePBuiltin] = useState(false);
  const [disablePCustom, setDisablePCustom] = useState(false);

  const {
    register,
    reset,
    formState: { errors: formErrors, isSubmitting },
    setValue,
    handleSubmit,
    control,
  } = useForm<ProcedimientoQEditSchemaType>({
    defaultValues: {
      codigo: '',
      descripcion: '',
      denominacion: '',
      tipoProcedimientoQId: '',
      procedimientoBuiltinId: '',
      procedimientoCustomId: '',
    },
    resolver: zodResolver(ProcedimientoQEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-q');
  }, [_navigate]);

  useEffect(() => {
    ProcedimientoQRepository.getProcedimientoQById(procedimientoQId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoQId, reset]);

  const onSubmit: SubmitHandler<ProcedimientoQEditSchemaType> = useCallback(
    async data => {
      setLoading(true);
      await ProcedimientoQRepository.updateProcedimientoQ(data)
        .then()
        .catch()
        .finally(() => {
          setLoading(false);
        });
      console.log('enviado');
      mainDataGrid.reload();
      _navigate('/procedimiento-q');
    },
    [_navigate, mainDataGrid],
  );

  // useEffect(()=> {
  //   const label =
  //   if (label.includes('BUILT')) {
  //     setValue('procedimientoCustomId', '');
  //     setDisablePBuiltin(false);
  //     setDisablePCustom(true);
  //   } else if (label.includes('CUST')) {
  //     setValue('procedimientoBuiltinId', '');
  //     setDisablePBuiltin(true);
  //     setDisablePCustom(false);
  //   } else if (label.includes('EXT')) {
  //     setValue('procedimientoBuiltinId', '');
  //     setValue('procedimientoCustomId', '');
  //     setDisablePBuiltin(true);
  //     setDisablePCustom(true);
  //   }
  // },[])

  const onChangeTipoProcedimientoCantidad = (data: any) => {
    //TODO habria que comparar con el "code" de las options que viene del back
    const label: string = data.props.children;
    setValue('tipoProcedimientoQId', data?.props?.value);
    if (label.includes('BUILT')) {
      setValue('procedimientoCustomId', '');
      setDisablePBuiltin(false);
      setDisablePCustom(true);
    } else if (label.includes('CUST')) {
      setValue('procedimientoBuiltinId', '');
      setDisablePBuiltin(true);
      setDisablePCustom(false);
    } else if (label.includes('EXT')) {
      setValue('procedimientoBuiltinId', '');
      setValue('procedimientoCustomId', '');
      setDisablePBuiltin(true);
      setDisablePCustom(true);
    }
  };

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title={`Editar ${label.procedimientoQ}`}>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} isUpdate>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
              disabled
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

export default ProcedimientoQEdit;
