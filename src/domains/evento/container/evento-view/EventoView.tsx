import { Row, Col, Modal } from '@app/components';
import { Box, FormLabel, TextField, Typography } from '@mui/material';

import Form from '@app/components/Form/Form';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { EventoRepository } from '@domains/evento/repository';
import { EventoCampoRoutes } from '@domains/evento-campo/navigation';

const EventoView = () => {

  const { eventoId } = useParams();
  const _navigate = useNavigate();

  const [eventoData, setEventoData] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);


  const handleClose = useCallback(() => {
    _navigate('/evento');
  }, [_navigate]);

  useEffect(() => {
    EventoRepository.getEventoById(eventoId || '').then(({ data }) => {
      setEventoData(data);
      setIsDataFetched(true);
    });
  }, [eventoId]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
      <Modal isOpen onClose={handleClose} title='Detalle Evento'>
      <Form>
        <Row>
        <Col md={6}>
            <TextField  label='Código' id='codigo' InputProps={{
                readOnly: true,
              }}
              fullWidth
              defaultValue={eventoData.codigo}
              />
              
          </Col>
          <Col md={6}>
            <TextField
              id='denominacion'
              label='Denominación'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={eventoData.denominacion}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
        <Col md={6}>
            <TextField
              id='descripcion'
              label='Descripción'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={eventoData.descripcion}
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id='tipoNegocioId'
              label='Tipo de negocio'
              InputProps={{
                readOnly: true,
              }}
              defaultValue={eventoData.tipoNegocioId}
              fullWidth
            />
          </Col>
        </Row>
      </Form>
      <Box my={2}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Campos del evento
          </Typography>
        </FormLabel>
      </Box>
      <EventoCampoRoutes eventoId={eventoData.id}/>
      </Modal>
  );
};

export default EventoView;
