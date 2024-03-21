import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoPSRepository } from '@domains/procedimiento-ps/repository';

import { TextField } from '@mui/material';
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

  return (
    <Modal isOpen onClose={handleClose} title='Ver Procedimiento Producto Softland'>
      <Form>
        <Row>
          <Col md={6}>
            <TextField id='codigo' label='Código' defaultValue={procedimientoPSData.codigo} fullWidth disabled />
          </Col>
          <Col md={6}>
            <TextField
              id='denominacion'
              label='Denominación'
              defaultValue={procedimientoPSData.denominacion}
              disabled
              fullWidth
            />
          </Col>
        </Row>
      </Form>

      <ProcedimientoPSIntervaloWithinProcedimientoPSRoutes codigo={procedimientoPSData.codigo} />
    </Modal>
  );
};

export default ProcedimientoPSView;
