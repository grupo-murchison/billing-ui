import { useContext, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
// import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionReporteContext } from '@domains/facturacion/contexts';
import { FacturacionReporteBreadcrumb } from '@domains/facturacion/constants';

// import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';
import { FormControl, FormControlLabel, FormGroup, Stack, TextField } from '@mui/material';
import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
// import AsyncAutocomplete from '@app/components/Form/FormAutocomplete';

const FacturacionReporte = () => {
  // const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturacionReporteContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const toolbar = () => {
    return (
      <Stack>
        <Row>
          <Col md={6}>
            <FormControl component='fieldset'>
              <FormGroup aria-label='position' row>
                <FormControlLabel
                  label='Nro. Contrato'
                  labelPlacement='start'
                  control={
                    <TextField
                      id='nroContrato'
                      // label='Nro. Contrato'
                      InputProps={{ readOnly: true }}
                      type='number'
                      // {...register('nroContrato', {
                      //   //  valueAsNumber: true,
                      // })}
                    />
                  }
                />
              </FormGroup>
            </FormControl>
          </Col>
          <Col md={4}>
            <TextField
              id='nroCalculoFacturacion'
              label='Nro. Cálculo Facturación'
              InputProps={{ readOnly: true }}
              type='number'
              // {...register('nroContrato', {
              //   //  valueAsNumber: true,
              // })}
            />
          </Col>
          <Col md={6}>
            <ClienteDropdown
              id='clienteId'
              label='Cliente'
              // {...register('clienteId', {
              //   valueAsNumber: true,
              // })}
              // error={!!formErrors.clienteId}
              // helperText={formErrors?.clienteId?.message}
              // disabled={isSubmitting}
              // value={watch('clienteId')}
            />
          </Col>
          {/* <Col md={6}>
            <AsyncAutocomplete
              id='Autocomplete'
              label='Cliente'
              {...register('clienteId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.clienteId}
              helperText={formErrors?.clienteId?.message}
              disabled={isSubmitting}
              value={watch('clienteId')}
            />
          </Col> */}
        </Row>
      </Stack>
    );
  };

  return (
    <>
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { field: 'numeroSecuenciaContrato', headerName: 'Nº Secuencia Contrato', flex: 0.5 },
              { field: 'estado', headerName: 'Estado', flex: 0.5 },
              {
                field: 'contratoDescripcion',
                headerName: 'Contrato Descripcion',
                flex: 2,
                // renderCell: params => renderCellResolver('renderCellExpand', params),
              },
              { field: 'clienteDescripcion', headerName: 'Cliente Descripcion' },
              { field: 'facturacionCabeceraEstado', headerName: 'Facturacion Cabecera Estado' },
            ]}
            repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
            toolbar={toolbar}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(FacturacionReporte, FacturacionReporteBreadcrumb);
