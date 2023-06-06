import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';

import { ProcedimientoPIntervaloWithinProcedimientoPRoutes } from '@domains/procedimiento-p-intervalo/navigation';

import { Divider, TextField } from '@mui/material';

const ProcedimientoPEdit = () => {
  const { procedimientoPId } = useParams();
  const _navigate = useNavigate();

  const [procedimientoPData, setProcedimientoPData] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

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
      <form noValidate autoComplete='off'>
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
            <MonedaDropdown id='monedaId' label='Moneda' defaultValue={procedimientoPData.monedaId} disabled />
          </Col>
        </Row>
      </form>
      <Divider style={{ marginBottom: '1rem' }} />
      <ProcedimientoPIntervaloWithinProcedimientoPRoutes codigo={procedimientoPData.codigo}/>
    </Modal>
  );
};

export default ProcedimientoPEdit;
