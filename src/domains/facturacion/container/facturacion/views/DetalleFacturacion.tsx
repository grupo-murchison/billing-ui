import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Divider as DividerMUI, Paper, TextField, Typography } from '@mui/material';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { FacturacionRepository } from '@domains/facturacion/repository';

import { DateLib } from '@libs';

import Form from '@app/components/Form/Form';

function DetalleFacturacion({
  periodo,
  facturacionContratoConceptoId, // TODO este dato de donde sale ? en el flujo de pantallas deberia llegar con el Plan de Facturacion
}: {
  facturacionContratoConceptoId?: string;
  periodo: any;
}) {
  const [eventos, setEventos] = useState<any>();
  const [detalle, setDetalle] = useState<any>();
  const [loading, setLoading] = useState(false);

  const { register } = useForm({ defaultValues: { periodo: periodo?.periodo } });

  useEffect(() => {
    if (facturacionContratoConceptoId) {
      setLoading(true);
      FacturacionRepository.getEventos(facturacionContratoConceptoId)
        .then(({ data }) => {
          // setEventos(data[0]?.facturacionContratoConcepto);
          setEventos(data[0]?.eventos);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [facturacionContratoConceptoId]);

  useEffect(() => {
    if (facturacionContratoConceptoId) {
      setLoading(true);
      FacturacionRepository.getDetallePeriodo(facturacionContratoConceptoId)
        .then(({ data }) => {
          // setEventos(data[0]?.facturacionContratoConcepto);
          console.log('getDetallePeriodo', data);

          // setEventos(data[0]?.eventos);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [facturacionContratoConceptoId]);

  return (
    <>
      <DividerMUI sx={{ my: 4 }}>
        <Typography variant='h3'>Detalle Facturación</Typography>
      </DividerMUI>

      <Form isView>
        <Row>
          <Col sm={12} md={6}>
            <TextField
              label={'Nro Facturación'}
              name='nroFacturacion'
              value={' '}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
          <Col sm={12} md={6}>
            <TextField
              label={'Fecha Facturación'}
              name='fechaFacturacion'
              value={DateLib.beautifyDBString(periodo?.fechaFacturacion)}
              inputProps={{ readOnly: true, shrink: true }}
              fullWidth
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
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={4}>
            <TextField
              label={'Periodo'}
              id='periodo'
              // value={periodo?.periodo}
              inputProps={{ readOnly: true, shrink: true }}
              fullWidth
              {...register('periodo')}
            />
          </Col>
          <Col sm={2} />
          <Col sm={12} md={3}>
            <TextField
              label={'Desde'}
              name='fechaFacturacion'
              // value={DateLib.beautifyDBString(DateLib.parseFromDBString(periodo?.liquidacionDesde))}
              value={DateLib.beautifyDBString(periodo?.liquidacionDesde)}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
          <Col sm={12} md={3}>
            <TextField
              label={'Hasta'}
              name='sociedad'
              value={DateLib.beautifyDBString(periodo?.liquidacionHasta)}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
        <Box my={4}>
          <Typography variant='h6' component='div'>
            Proforma
          </Typography>
        </Box>
        <Row>
          <Col sm={12} md={6}>
            <TextField label={'Nro. Proforma'} name='nroProforma' value={3} inputProps={{ readOnly: true }} fullWidth />
          </Col>

          <Col sm={12} md={6}>
            <TextField
              label={'Cliente'}
              name='cliente'
              value={'1000547 - KMUCORP S.A.'}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <TextField label={'Nro. Contrato'} name='nroContrato' value={2} inputProps={{ readOnly: true }} fullWidth />
          </Col>
          <Col sm={12} md={6}>
            <TextField
              label={'Descripción Contrato'}
              name='cliente'
              value={'Contrato KIA paraalmacenaje por bloques'}
              inputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
      </Form>

      <DataGridBase
        loading={loading}
        rows={[]}
        columns={[
          {
            field: 'productoSoftland',
            headerName: 'ProductoSoftland',
          },
          {
            field: 'descripcion',
            headerName: 'Descripcion',
          },
          {
            field: 'cantidadTotal',
            headerName: 'Cantidad Total',
          },
          {
            field: 'precioUnitario',
            headerName: 'Precio Unitario',
          },
          {
            field: 'total',
            headerName: 'Total',
          },
          {
            field: 'moneda',
            headerName: 'Moneda',
          },
          {
            field: 'cantidadItemVIN',
            headerName: 'Cantidad Item VIN',
          },
        ]}
      />

      <Box mt={3} mb={1}>
        <Typography variant='h6' component='div'>
          Soporte
        </Typography>
      </Box>

      <DataGridBase
        loading={loading}
        rows={eventos || []}
        columns={[
          {
            field: 'genDestinoId',
            headerName: 'VIN',
          },
          {
            field: 'genEventoTipoId',
            headerName: 'Tipo Evento',
          },
          {
            field: 'genEventoFechaCreacion',
            headerName: 'Fecha',
            valueGetter: params => DateLib.beautifyISO(params?.value),
          },
          {
            field: 'evDUA',
            headerName: 'DUA',
          },
          {
            field: 'evModelo',
            headerName: 'Modelo',
          },
          {
            field: 'genPatio',
            headerName: 'Patio',
          },
          {
            field: 'evTipoEmbarque',
            headerName: 'Tipo Embarque',
          },
        ]}
      />
    </>
  );
}

export default DetalleFacturacion;
