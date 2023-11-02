import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQEditSchema } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';
import type { ProcedimientoQEditSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { label } from '@domains/procedimiento-q/constants';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import { ProcedimientoQContext } from '@domains/procedimiento-q/contexts';
import TipoProcedimientoQDropdownController from '@domains/tipo-procedimiento-q/container/tipo-procedimiento-q-dropdown/TipoProcedimientoQDropdownController';
import ProcedimientoBuiltinDropdownController from '@domains/procedimiento-builtin/container/procedimiento-builtin-dropdown/ProcedimientoBuiltinDropdownController';
import ProcedimientoCustomDropdownController from '@domains/procedimiento-custom/container/procedimiento-custom-dropdown/ProcedimientoCustomDropdownController';

const ProcedimientoQEdit = () => {
  const { procedimientoQId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoQContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [disablePBuiltin, setDisablePBuiltin] = useState(false);
  const [disablePCustom, setDisablePCustom] = useState(false);

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
    watch,
    resetField
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

  useEffect(() => {
    ProcedimientoQRepository.getProcedimientoQById(procedimientoQId || '').then(({ data }) => {
      for (const property in data) {
        if (data[property] === null) {
          delete data[property]
        }
      }
      reset({
        ...data,
      });
      setIsDataFetched(true);
    });
  }, [procedimientoQId]);

  const onSubmit: SubmitHandler<ProcedimientoQEditSchemaType> = useCallback(
    async data => {
      await ProcedimientoQRepository.updateProcedimientoQ({ ...data, id: Number(procedimientoQId) });
      mainDataGrid.reload();
      _navigate('/procedimiento-q');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-q');
  }, [_navigate]);

  useEffect(() => {
    const code = watch('tipoProcedimientoQId');
    if (code === 1) {
      resetField('procedimientoCustomId');
      setDisablePBuiltin(false);
      setDisablePCustom(true);
    } else if (code === 2) {
      resetField('procedimientoBuiltinId')
      setDisablePBuiltin(true);
      setDisablePCustom(false);
    } else if (code === 3) {
      resetField('procedimientoBuiltinId');
      resetField('procedimientoCustomId');
      setDisablePBuiltin(true);
      setDisablePCustom(true);
    }

  }, [watch('tipoProcedimientoQId')]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title={`Editar ${label.procedimientoQ}`}>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} label='Código' name='codigo' disabled fullWidth />
          </Col>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Denominación'
              name='denominacion'
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormTextField control={control} disabled={isSubmitting} label='Descripción' name='descripcion' fullWidth />
          </Col>
          <Col md={12}>
            <TipoProcedimientoQDropdownController
              control={control}
              name='tipoProcedimientoQId'
              disabled={isSubmitting}
              label={`Tipo ${label.procedimientoQ}`}
              emptyOption
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <ProcedimientoBuiltinDropdownController
              control={control}
              name='procedimientoBuiltinId'
              disabled={isSubmitting || disablePBuiltin}
              label='Procedimiento Builtin'
              emptyOption
            />
          </Col>
          <Col md={6}>
            <ProcedimientoCustomDropdownController
              control={control}
              name='procedimientoCustomId'
              disabled={isSubmitting || disablePCustom}
              label='Procedimiento Custom'
              emptyOption
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProcedimientoQEdit;
