import { useCallback, useContext, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
// import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionReporteContext } from '@domains/facturacion/contexts';
import { FacturacionReporteBreadcrumb } from '@domains/facturacion/constants';

// import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';
import { Button, Stack } from '@mui/material';
import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
// import Form from '@app/components/Form/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormTextField from '@app/components/Form/FormTextField';
// import AsyncAutocomplete from '@app/components/Form/FormAutocomplete';

const FacturacionReporte = () => {
  // const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturacionReporteContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      clienteId: '',
      nroCalculoFacturacion: '',
      nroContrato: '',
    },
    // resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const onSubmit: SubmitHandler<any> = useCallback(
    async data => {
      console.log(data);
      // mainDataGrid.reload();
    },
    [mainDataGrid],
  );

  const toolbar = (
    <Stack>
      <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Row>
          <Col md={12}>
            <FormTextField name='nroContrato' control={control} label='Número de Contrato' />
          </Col>
          <Col md={12}>
            <FormTextField name='nroCalculoFacturacion' control={control} label='Número Cálculo de Facturación' />
          </Col>
          <Col md={12}>
            <ClienteDropdown
              control={control}
              label='Cliente'
              name='clienteId'
              disabled={isSubmitting}
              error={!!formErrors.clienteId}
              // helperText={formErrors?.clienteId?.message}
            />
          </Col>
        </Row>
        <Row>
          <Button color='primary' variant='contained' type='submit' disabled={isSubmitting}>
            Buscar
          </Button>
        </Row>
      </form>
    </Stack>
  );

  return (
    <>
      {toolbar}
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
            // toolbar={Toolbar}
          />
        </Col>
      </Row>
      <Outlet />
    </>
  );
};

export default withBreadcrumb(FacturacionReporte, FacturacionReporteBreadcrumb);
