import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import { TextField } from '@mui/material';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import { DateLib } from '@libs';
import { AlertInProgress } from '@app/components/Alerts';

const CalculoReversionLog = ({ calculoFacturacionData }: { calculoFacturacionData: AnyValue }) => {
  return (
    <>
      <Form>
        <AlertInProgress message='Estos datos no corresponden a un Log De Reversión real, la funcionalidad estará disponible próximamente.' />
        <Row>
          <Col md={4}>
            <TextField
              id='estado'
              label='Estado'
              defaultValue={calculoFacturacionData.estado}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Col>
          <Col md={4}>
            <TextField
              id='numeroSecuenciaCalculo'
              label='Número Secuencia Cálculo'
              defaultValue={calculoFacturacionData.numeroSecuenciaCalculo}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
          <Col md={4}>
            <TextField
              id='fechaEjecucion'
              label='Fecha facturación'
              value={DateLib.beautifyDBString(calculoFacturacionData.fechaEjecucion)}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
      </Form>
      <DataGridBase
        rows={calculoFacturacionData.contratos}
        columns={[
          {
            field: 'contratoClienteCodigo',
            headerName: 'Cliente',
            valueGetter: ({ row }) => row?.contratoClienteCodigo,
            flex: 0.3,
          },
          {
            field: 'contratoClienteDescripcion',
            headerName: 'Denominación Cliente',
            valueGetter: ({ row }) => row?.contratoClienteDescripcion,
            flex: 0.3,
          },
          {
            field: 'contratoNumero',
            headerName: 'Número Contrato',
            valueGetter: ({ row }) => row?.contratoNumero,
            flex: 0.3,
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            valueGetter: ({ row }) => row?.contratoDescripcion,
          },
        ]}
      />
    </>
  );
};

export default CalculoReversionLog;
