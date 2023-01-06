import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoQRepository } from '@domains/procedimiento-q/repository';
import { ProcedimientoQEditSchema } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';
import type { ProcedimientoQEditSchemaType } from '@domains/procedimiento-q/container/procedimiento-q-edit/schemas';

import { ProcedimientoQVariableWithinProcedimientoQRoutes } from '@domains/procedimiento-q-variable/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Divider, TextField } from '@mui/material';

const ProcedimientoQEdit = () => {
  const { procedimientoQId } = useParams();
  const _navigate = useNavigate();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors: formErrors },
  } = useForm<ProcedimientoQEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
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

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Q'>
      <form noValidate autoComplete='off'>
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
              disabled
            />
          </Col>
        </Row>
      </form>
      <Divider style={{ marginBottom: '1rem' }} />
      <ProcedimientoQVariableWithinProcedimientoQRoutes />
    </Modal>
  );
};

export default ProcedimientoQEdit;
