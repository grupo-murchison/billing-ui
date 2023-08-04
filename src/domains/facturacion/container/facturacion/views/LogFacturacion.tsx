import { useEffect, useState } from 'react';

import {
  Alert,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider as DividerMUI,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { DateLib } from '@libs';
import { DivisorProvisorio } from '@app/components/Divider';

function LogFacturacion() {
  const [planFacturacion, setPlanFacturacion] = useState<any>();
  const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   if (contratoId) {
  //     setLoading(true);
  //     ContratoRepository.getPlanFacturacionPeriodos({ contratoId })
  //       .then(data => {
  //         // console.log('data', data.data.data[0]); // TODO por qué son dos datas anidados ?
  //         setPlanFacturacion(data.data.data[0]);
  //       })
  //       .catch()
  //       .finally(() => setLoading(false));
  //   }
  // }, [contratoId]);

  return (
    <>
      <DividerMUI sx={{ my: 4 }}>
        <Typography variant='h3'>Log Facturación</Typography>
      </DividerMUI>

      {/* <Card sx={{ p: 3 }}>
        <CardHeader
          title={
            <Typography variant='h3' component='h2'>
              Log Facturación
            </Typography>
          }
        />

        <CardContent> */}
          <Row>
            <Col sm={12} md={6}>
              <TextField
                label={'Nro Facturación'}
                name='nroFacturacion'
                value={12564}
                inputProps={{ readOnly: true }}
              />
            </Col>
            <Col sm={12} md={6}>
              <TextField
                label={'Fecha Facturación'}
                name='fechaFacturacion'
                value={DateLib.beautifyDBString(DateLib.parseToDBString(new Date()))}
                inputProps={{ readOnly: true }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <TextField
                label={'Sociedad'}
                name='sociedad'
                value={'Murchison Uruguay S.A'}
                inputProps={{ readOnly: true }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={4}>
              <TextField label={'Periodo'} name='periodo' value={5} inputProps={{ readOnly: true }} />
            </Col>
            <Col sm={2} />
            <Col sm={12} md={3}>
              <TextField
                label={'Desde'}
                name='fechaFacturacion'
                value={DateLib.beautifyDBString(DateLib.parseToDBString(new Date()))}
                inputProps={{ readOnly: true }}
              />
            </Col>
            <Col sm={12} md={3}>
              <TextField
                label={'Hasta'}
                name='sociedad'
                value={DateLib.beautifyDBString(DateLib.parseToDBString(new Date()))}
                inputProps={{ readOnly: true }}
              />
            </Col>
          </Row>
          <Box my={4}>
            {/* <DivisorProvisorio label='Proforma' chip />*/}
            <Typography variant='h6' component='div'>
              Proforma
            </Typography>
          </Box>
          <Row>
            <Col sm={12} md={6}>
              <TextField label={'Nro. Proforma'} name='nroProforma' value={3} inputProps={{ readOnly: true }} />
            </Col>

            <Col sm={12} md={6}>
              <TextField
                label={'Cliente'}
                name='cliente'
                value={'1000547 - KMUCORP S.A.'}
                inputProps={{ readOnly: true }}
              />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              <TextField label={'Nro. Contrato'} name='nroContrato' value={2} inputProps={{ readOnly: true }} />
            </Col>
            <Col sm={12} md={6}>
              <TextField
                label={'Descripción Contrato'}
                name='cliente'
                value={'Contrato KIA paraalmacenaje por bloques'}
                inputProps={{ readOnly: true }}
              />
            </Col>
          </Row>
          <Paper>
            <DataGridBase
              rows={[]}
              columns={[
                {
                  field: 'periodo',
                  headerName: 'ProductoSoftland',
                },
                {
                  field: 'liquidacionDesde',
                  headerName: 'Descripcion',
                  type: 'date',
                  valueGetter: params => DateLib.parseFromDBString(params.value),
                },
                {
                  field: 'liquidacionHasta',
                  headerName: 'CantidadTotal',
                  type: 'date',
                  valueGetter: params => DateLib.parseFromDBString(params.value),
                },
                {
                  field: 'fechaFacturacion',
                  headerName: 'Precio Unitario',
                  valueGetter: params => DateLib.parseFromDBString(params.value),
                  type: 'date',
                },
                {
                  field: 'estado',
                  headerName: 'Total',
                },
                {
                  field: 'estado',
                  headerName: 'Moneda',
                },
                {
                  field: 'estado',
                  headerName: 'Cantidad Item VIN',
                },
              ]}
            />
          </Paper>

          <Box mt={3} mb={1}>
            <Typography variant='h6' component='div'>
              Soporte
            </Typography>
          </Box>

          <Paper>
            <DataGridBase
              rows={[]}
              columns={[
                {
                  field: 'periodo',
                  headerName: 'VIN',
                },
                {
                  field: 'liquidacionDesde',
                  headerName: 'Tipo Evento',
                },
                {
                  field: 'liquidacionHasta',
                  headerName: 'Fecha',
                  type: 'date',
                  valueGetter: params => DateLib.parseFromDBString(params.value),
                },
                {
                  field: 'fechaFacturacion',
                  headerName: 'DUA',
                },
                {
                  field: 'modelo',
                  headerName: 'Modelo',
                },
                {
                  field: 'patio',
                  headerName: 'Patio',
                },
                {
                  field: 'tipoEmbarque',
                  headerName: 'Tipo Embarque',
                },
              ]}
            />
          </Paper>
        {/* </CardContent>
      </Card> */}
    </>
  );
}

export default LogFacturacion;
