import { useCallback, useEffect, useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { Box, FormLabel, TextField, Typography } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';
import Form from '@app/components/Form/Form';
import { TablasDinamicasEditSchema, TablasDinamicasEditSchemaType } from '../tablas-dinamicas-edit/schemas';
import { TablasDinamicasRepository } from '@domains/metadatos/tablas-dinamicas/repository';
import { DatosDinamicosRoutes } from '@domains/metadatos/datos-dinamicos/navigation';

const TablasDinamicasView = () => {
  const { tablaId } = useParams();
  const _navigate = useNavigate();

  const [tablaDinamicaData, setTablaDinamicaData] = useState<AnyValue>();
  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    formState: { isSubmitting },
  } = useForm<TablasDinamicasEditSchemaType>({
    defaultValues: {
      nombreTabla: '',
      descripcionTabla: '',
    },
    resolver: zodResolver(TablasDinamicasEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/tablas-dinamicas');
  }, [_navigate]);

  useEffect(() => {
    TablasDinamicasRepository.getTablasDinamicasById(tablaId || '').then(({ data }) => {
      setTablaDinamicaData(data);
      setIsDataFetched(true);
    });
  }, [tablaId]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Ver Tabla Dinámica'>
      <Form isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <TextField
              id='nombreTabla'
              label='Nombre'
              defaultValue={tablaDinamicaData.nombreTabla}
              fullWidth
              InputProps={{
                readOnly: true,
              }}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='descripcionTabla'
              label='Descripción'
              defaultValue={tablaDinamicaData.descripcionTabla}
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
      <DatosDinamicosRoutes />
    </Modal>
  );
};

export default TablasDinamicasView;
