import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import { TextField } from '@mui/material';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

const DetalleFacturacionLog = ({ calculoContrato, detalles }: { calculoContrato: AnyValue; detalles: AnyValue[] }) => {
  return (
    <>
      <Form>
        <Row>
          <Col md={6}>
            <TextField
              id='contratoDescripcion'
              label='Descripción Contrato'
              defaultValue={calculoContrato?.contratoClienteCodigo}
              fullWidth
              InputProps={{ readOnly: true }}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='contratoClienteCodigo'
              label='Número de Cliente'
              defaultValue={calculoContrato?.contratoClienteDescripcion}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='contratoNumero'
              label='Número Contrato'
              defaultValue={calculoContrato?.contratoNumero}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id='contratoDescripcion'
              label='Descripción Contrato'
              defaultValue={calculoContrato?.contratoDescripcion}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='periodoNumero'
              label='Periodo'
              defaultValue={calculoContrato?.periodoNumero}
              InputProps={{ readOnly: true }}
              fullWidth
            />
          </Col>
        </Row>
      </Form>
      <DataGridBase
        rows={detalles}
        columns={[
          {
            field: 'tipoMensajeLog',
            headerName: 'Tipo Mensaje',
            valueGetter: ({ row }) => row?.tipoMensajeLog,
            flex: 0.2,
          },
          {
            field: 'descripcionLog',
            headerName: 'Descripción',
            valueGetter: ({ row }) => row?.descripcion,
          },
        ]}
      />
    </>
  );
};

export default DetalleFacturacionLog;
