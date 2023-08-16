import { useEffect, useState } from 'react';

import { Box, FormLabel, TextField, Typography } from '@mui/material';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { FacturacionRepository } from '@domains/facturacion/repository';

import { DateLib } from '@libs';

function DetalleFacturacion({ periodo, facturacionContratoId }: { facturacionContratoId?: string; periodo: any }) {
  const [eventos, setEventos] = useState<any>();
  const [detalle, setDetalle] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (facturacionContratoId) {
      setLoading(true);
      FacturacionRepository.getEventos(facturacionContratoId) // TODO es el mismo id que para los detalles o es otro dato ?
        .then(({ data }) => {
          setEventos(data[0]?.eventos);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [facturacionContratoId]);

  useEffect(() => {
    if (facturacionContratoId) {
      setLoading(true);
      FacturacionRepository.getDetallePeriodo(facturacionContratoId)
        .then(({ data }) => {
          setDetalle(data);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [facturacionContratoId]);

  return (
    <>
      <Row>
        <Col sm={12} md={6}>
          <TextField
            label={'Nro Facturación'}
            name='nroFacturacion'
            value={periodo?.numeroSecuenciaFacturacion}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
        <Col sm={12} md={6}>
          <TextField
            label={'Fecha Facturación'}
            name='fechaFacturacion'
            value={DateLib.beautifyDBString(periodo?.fechaEjecucion)}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={6}>
          <TextField
            label={'Sociedad'}
            name='sociedad'
            // value={periodo?.contratos[0]?.sociedadDenominacion}
            value={detalle ? `${detalle[0]?.sociedadCodigo} - ${detalle[0]?.sociedadDescripcion}` : ''}
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
            value={periodo?.contratos[0]?.periodoNumero}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
        <Col sm={2} />
        <Col sm={12} md={3}>
          <TextField
            label={'Desde'}
            name='fechaFacturacion'
            value={DateLib.beautifyDBString(periodo?.contratos[0]?.periodoLiquidacionDesde.slice(0, 8))}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
        <Col sm={12} md={3}>
          <TextField
            label={'Hasta'}
            name='sociedad'
            value={DateLib.beautifyDBString(periodo?.contratos[0]?.periodoLiquidacionHasta.slice(0, 8))}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>

      <Box mt={4} mb={3}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Proforma
          </Typography>
        </FormLabel>
      </Box>

      <Row>
        <Col sm={12} md={3}>
          <TextField label={'Nro. Proforma'} name='nroProforma' value={''} inputProps={{ readOnly: true }} fullWidth />
        </Col>

        <Col sm={12} md={3}>
          <TextField label={'Nro. Contrato'} name='nroContrato' value={2} inputProps={{ readOnly: true }} fullWidth />
        </Col>

        <Col sm={12} md={6}>
          <TextField
            label={'Cliente'}
            name='contratoClienteId'
            // value={periodo?.contratos[0]?.contratoClienteId}
            value={detalle ? `${detalle[0]?.clienteCodigo} - ${detalle[0]?.clienteDescripcion}` : ''}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <TextField
            label={'Descripción Contrato'}
            name='clienteContratoDescripcion'
            value={periodo?.contratos[0]?.contratoClienteDescripcion}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>

      <DataGridBase
        loading={loading}
        rows={detalle || []}
        columns={[
          {
            field: 'productoSoftlandCodigo',
            headerName: 'Producto Softland',
          },
          {
            field: 'productoSoftlandDescripcion',
            headerName: 'Descripcion',
          },
          {
            field: 'total',
            headerName: 'Cantidad Total',
          },
          {
            field: 'precioUnitario',
            headerName: 'Precio Unitario',
          },
          {
            field: 'importe',
            headerName: 'Total',
          },
          {
            field: 'monedaCodigo',
            headerName: 'Moneda',
          },
          {
            field: 'cantidad',
            headerName: 'Cantidad Item VIN',
          },
        ]}
      />

      <Box mt={4} mb={2}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Soporte
          </Typography>
        </FormLabel>
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
