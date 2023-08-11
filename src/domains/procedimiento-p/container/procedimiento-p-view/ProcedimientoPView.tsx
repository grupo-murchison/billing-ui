import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';

import { ProcedimientoPIntervaloWithinProcedimientoPRoutes } from '@domains/procedimiento-p-intervalo/navigation';

import { Divider, TextField } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import Form from '@app/components/Form/Form';
import { ProcedimientoPEditSchema, ProcedimientoPEditSchemaType } from './schemas';

const ProcedimientoPView = () => {
  const { procedimientoPId } = useParams();
  const _navigate = useNavigate();

  const [procedimientoPData, setProcedimientoPData] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  //TODO esto se podria ir, dado que no se editaria en esta pantalla?
  const {
    formState: { errors: formErrors, isSubmitting },
    control,
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
      setProcedimientoPData(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPId]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Ver Procedimiento Precio'>
      <Form handleClose={handleClose} isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <TextField id='codigo' label='Código' defaultValue={procedimientoPData.codigo} disabled />
          </Col>
          <Col md={6}>
            <TextField id='denominacion' label='Denominación' defaultValue={procedimientoPData.denominacion} disabled />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <MonedaDropdown
              control={control}
              name='monedaId'
              error={!!formErrors.monedaId}
              disabled
              label='Moneda'
              helperText={formErrors?.monedaId?.message}
            />
          </Col>
        </Row>
      </Form>
      <Divider style={{ marginBottom: '1rem' }} />
      <ProcedimientoPIntervaloWithinProcedimientoPRoutes codigo={procedimientoPData.codigo} />
    </Modal>
  );
};

export default ProcedimientoPView;
