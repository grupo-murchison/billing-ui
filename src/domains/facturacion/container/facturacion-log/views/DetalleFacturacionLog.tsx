import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import { TextField } from '@mui/material';
import DataGridBase from '@app/components/DataGrid/DataGridBase';

const DetalleFacturacionLog = ({ facturacionData }: { facturacionData: any }) => {
  return (
    <>
      <Form>
        <Row>
          <Col md={6}>
            <TextField
              id='contratoDescripcion'
              label='Descripción Contrato'
              defaultValue={facturacionData.facturacionCabecera.facturacionContratos[0].contratoClienteCodigo}
              disabled
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id='contratoClienteCodigo'
              label='Número de Cliente'
              defaultValue={facturacionData.facturacionCabecera.facturacionContratos[0].contratoClienteDescripcion}
              disabled
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='contratoNumero'
              label='Número Contrato'
              defaultValue={facturacionData.facturacionCabecera.facturacionContratos[0].contratoNumero}
              disabled
              fullWidth
            />
          </Col>
          <Col md={6}>
            <TextField
              id='contratoDescripcion'
              label='Descripción Contrato'
              defaultValue={facturacionData.facturacionCabecera.facturacionContratos[0].contratoDescripcion}
              disabled
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <TextField
              id='periodoNumero'
              label='Periodo'
              defaultValue={facturacionData.facturacionCabecera.facturacionContratos[0].periodoNumero}
              disabled
              fullWidth
            />
          </Col>
        </Row>
      </Form>
      <DataGridBase
        rows={facturacionData.detalles}
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