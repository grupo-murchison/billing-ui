import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPEditSchema } from '@domains/procedimiento-p/container/procedimiento-p-edit/schemas';
import type { ProcedimientoPEditSchemaType } from '@domains/procedimiento-p/container/procedimiento-p-edit/schemas';

import { ProcedimientoPIntervaloWithinProcedimientoPRoutes } from '@domains/procedimiento-p-intervalo/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Divider, TextField } from '@mui/material';

const ProcedimientoPEdit = () => {
  const { procedimientoPId } = useParams();
  const _navigate = useNavigate();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    watch,
    formState: { errors: formErrors },
  } = useForm<ProcedimientoPEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-p');
  }, [_navigate]);

  useEffect(() => {
    ProcedimientoPRepository.getProcedimientoPById(procedimientoPId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento PS'>
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
        <Row>
          <Col md={6}>
            <MonedaDropdown
              id='monedaId'
              label='Moneda'
              {...register('monedaId', {
                valueAsNumber: true,
              })}
              value={watch('monedaId')}
              error={!!formErrors.monedaId}
              helperText={formErrors?.monedaId?.message}
              disabled
            />
          </Col>
        </Row>
      </form>
      <Divider style={{ marginBottom: '1rem' }} />
      <ProcedimientoPIntervaloWithinProcedimientoPRoutes />
    </Modal>
  );
};

export default ProcedimientoPEdit;
