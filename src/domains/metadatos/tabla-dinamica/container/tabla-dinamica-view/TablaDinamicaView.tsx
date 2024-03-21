import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { Box, FormLabel, TextField, Typography } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import Form from '@app/components/Form/Form';
import { TablaDinamicaRepository } from '@domains/metadatos/tabla-dinamica/repository';
import { DatoDinamicoRoutes } from '@domains/metadatos/dato-dinamico/navigation';
import { TablaDinamicaViewSchema, TablaDinamicaViewSchemaType } from './schemas';

const TablaDinamicaView = () => {
  const { tablaDinamicaId } = useParams();
  const _navigate = useNavigate();

  const [tablaDinamicaData, setTablaDinamicaData] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    formState: { isSubmitting },
  } = useForm<TablaDinamicaViewSchemaType>({
    defaultValues: {
      nombre: '',
      descripcion: '',
      codigo: '',
    },
    resolver: zodResolver(TablaDinamicaViewSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/tabla-dinamica');
  }, [_navigate]);

  useEffect(() => {
    TablaDinamicaRepository.getTablaDinamicaById(tablaDinamicaId || '').then(({ data }) => {
      setTablaDinamicaData(data);
      setIsDataFetched(true);
    });
  }, [tablaDinamicaId]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Tabla Dinámica'>
      <Form isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              defaultValue={tablaDinamicaData.codigo}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='nombre'
              label='Nombre'
              defaultValue={tablaDinamicaData.nombre}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='descripcion'
              label='Descripción'
              defaultValue={tablaDinamicaData.descripcion}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Col>
        </Row>
      </Form>
      <Box my={2}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Datos dinámicos
          </Typography>
        </FormLabel>
      </Box>
      <DatoDinamicoRoutes />
    </Modal>
  );
};

export default TablaDinamicaView;
