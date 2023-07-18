import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';

import { Divider, TextField } from '@mui/material';
import Form from '@app/components/Form/Form';
import { ProcedimientoPSIntervaloWithinProcedimientoPSRoutes } from '@domains/procedimiento-ps-intervalo/navigation';

const ProcedimientoPSView = () => {
  const { procedimientoPSId } = useParams();
  const _navigate = useNavigate();

  const [procedimientoPSData, setProcedimientoPSData] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-ps');
  }, [_navigate]);

  useEffect(() => {
    ProcedimientoPSRepository.getProcedimientoPSById(procedimientoPSId || '').then(({ data }) => {
      setProcedimientoPSData(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPSId]);

  if (!isDataFetched) {
    return <></>;
  }

  // //TODO creo esta constante para que no rompa.
  const isSubmitting = false;

  return (
    <Modal isOpen onClose={handleClose} title='Ver Procedimiento Producto Softland'>
      <Form handleClose={handleClose} isSubmitting={isSubmitting} isView>
        <Row>
          <Col md={6}>
            <TextField id='codigo' label='Código' defaultValue={procedimientoPSData.codigo} disabled />
          </Col>
          <Col md={6}>
            <TextField
              id='denominacion'
              label='Denominación'
              defaultValue={procedimientoPSData.denominacion}
              disabled
            />
          </Col>
        </Row>
      </Form>
      <Divider style={{ marginBottom: '1rem' }} />
      <ProcedimientoPSIntervaloWithinProcedimientoPSRoutes codigo={procedimientoPSData.codigo} />
    </Modal>
  );
};

export default ProcedimientoPSView;
