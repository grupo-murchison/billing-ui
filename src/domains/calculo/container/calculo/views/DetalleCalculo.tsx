import { useEffect, useState } from 'react';

import { Box, FormLabel, InputAdornment, TextField, Typography } from '@mui/material';
import { GridRowSelectionModel, GRID_CHECKBOX_SELECTION_COL_DEF } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

import { CalculoRepository } from '@domains/calculo/repository';

import { DateLib } from '@libs';
import { currencyFormatter } from '@libs/number';

import DataGridSoporte from './DataGridSoporte';
import { AttachMoneyIcon } from '@assets/icons';

function DetalleFacturacion({ periodo, calculoContratoId }: { calculoContratoId?: string; periodo: AnyValue }) {
  const [detalle, setDetalle] = useState<AnyValue>();
  const [loading, setLoading] = useState(false);
  const [facturacionContratoConceptoId, setFacturacionContratoConceptoId] = useState<number | null>(null);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

  useEffect(() => {
    if (calculoContratoId) {
      setLoading(true);
      CalculoRepository.getDetallePeriodo(calculoContratoId)
        .then(({ data }) => {
          setDetalle(data);
        })
        .catch()
        .finally(() => setLoading(false));
    }
  }, [calculoContratoId]);

  return (
    <>
      <Row>
        <Col sm={12} md={4}>
          <TextField
            label={'Número Secuencia Calculo'}
            name='numeroSecuenciaCalculo'
            value={periodo?.numeroSecuenciaCalculo}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
        <Col sm={12} md={6}>
          <TextField
            label={'Fecha Cálculo'}
            name='fechaCalculo'
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
            value={detalle ? `${detalle[0]?.sociedadCodigo} - ${detalle[0]?.sociedadDescripcion}` : ''}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>
      <Row>
        <Col sm={12} md={2}>
          <TextField
            label={'Periodo'}
            id='periodo'
            value={periodo?.contratos[0]?.periodoNumero}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
        <Col sm={12} md={4}>
          <TextField
            label={'Total Calculado'}
            name='ccTotalCalculado'
            value={detalle ? detalle[0]?.ccTotalCalculado : ''}
            inputProps={{
              readOnly: true,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AttachMoneyIcon />
                </InputAdornment>
              ),
            }}
            type='number'
            fullWidth
          />
        </Col>
        <Col sm={12} md={3}>
          <TextField
            label={'Desde'}
            name='periodoLiquidacionDesde'
            value={DateLib.beautifyDBString(periodo?.contratos[0]?.periodoLiquidacionDesde.slice(0, 8))}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
        <Col sm={12} md={3}>
          <TextField
            label={'Hasta'}
            name='periodoLiquidacionHasta'
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
          <TextField
            label={'Número Proforma'}
            name='nroProforma'
            value={detalle ? detalle[0]?.ccaNumeroSecuenciaContrato : ''}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>

        <Col sm={12} md={3}>
          <TextField
            label={'Número Contrato'}
            name='nroContrato'
            value={periodo?.contratos[0]?.contratoNumero}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>

        <Col sm={12} md={6}>
          <TextField
            label={'Cliente'}
            name='contratoCliente'
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
            value={periodo?.contratos[0]?.contratoDescripcion}
            inputProps={{ readOnly: true }}
            fullWidth
          />
        </Col>
      </Row>

      <DataGridBase
        loading={loading}
        rows={detalle || []}
        columns={[
          { ...GRID_CHECKBOX_SELECTION_COL_DEF, renderHeader: () => '', maxWidth: 50 },
          {
            field: 'productoSoftlandCodigo',
            headerName: 'Producto Softland',
          },
          {
            field: 'productoSoftlandDescripcion',
            headerName: 'Descripción',
          },
          {
            field: 'cantidad',
            headerName: 'Cantidad Total',
            type: 'number',
          },
          {
            field: 'importe',
            headerName: 'Precio Unitario',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter().format(value),
          },
          {
            field: 'total',
            headerName: 'Total',
            type: 'number',
            valueFormatter: ({ value }) => currencyFormatter().format(value),
          },
          {
            field: 'monedaCodigo',
            headerName: 'Moneda',
          },
          {
            field: 'cantidadItemVIN',
            headerName: 'Cantidad Item VIN',
          },
        ]}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(selection: AnyValue) => {
          if (selection.length >= 1) {
            const selectionSet = new Set(rowSelectionModel);
            const result = selection.filter((s: AnyValue) => !selectionSet.has(s));

            setFacturacionContratoConceptoId(result[0]);
            setRowSelectionModel(result);
          } else {
            setRowSelectionModel(selection);
            setFacturacionContratoConceptoId(null);
          }
        }}
      />

      <Box mt={4} mb={2}>
        <FormLabel component='legend'>
          <Typography variant='h6' component='div'>
            Soporte
          </Typography>
        </FormLabel>
      </Box>

      <DataGridSoporte facturacionContratoConceptoId={facturacionContratoConceptoId} />
    </>
  );
}

export default DetalleFacturacion;
