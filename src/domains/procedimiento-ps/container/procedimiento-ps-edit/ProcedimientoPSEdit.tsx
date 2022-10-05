import { useCallback, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Portlet, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';
import { ProcedimientoPSEditSchema } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';
import type { ProcedimientoPSEditSchemaType } from '@domains/procedimiento-ps/container/procedimiento-ps-edit/schemas';

import { ProcedimientoPSIntervaloWithinProcedimientoPSRoutes } from '@domains/procedimiento-ps-intervalo/navigation';

import { zodResolver } from '@hookform/resolvers/zod';

import { Divider, Modal, TextField } from '@mui/material';

const ProcedimientoPSEdit = () => {
  const { procedimientoPSId } = useParams();
  const _navigate = useNavigate();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    reset,
    formState: { errors: formErrors },
  } = useForm<ProcedimientoPSEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPSEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-ps');
  }, [_navigate]);

  useEffect(() => {
    ProcedimientoPSRepository.getProcedimientoPSById(procedimientoPSId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPSId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal open onClose={handleClose}>
      <Portlet>
        <h1>Editar Procedimiento PS</h1>
        <Divider style={{ marginBottom: '1rem' }} />
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
        <ProcedimientoPSIntervaloWithinProcedimientoPSRoutes />
      </Portlet>
    </Modal>
  );
};

export default ProcedimientoPSEdit;
