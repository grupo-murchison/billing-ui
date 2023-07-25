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
import { Button, Stack, SxProps, useTheme } from '@mui/material';
import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
// import Form from '@app/components/Form/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
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
      clienteId: '', // TODO debe buscar por descripcion, esto debe migrar a un field Async Autocomplete
      facturacionCabeceraNumeroSecuenciaFacturacion: '',
      nroContrato: '',
      fechaCalculoDesde: '',
      fechaCalculoHasta: '',
    },
    // resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const onSubmit: SubmitHandler<any> = useCallback(
    async data => {
      console.log({
        ...data,
        fechaInicioContrato: DateLib.parseToDBString(data.fechaInicioContrato),
        facturacionCabeceraNumeroSecuenciaFacturacion: String(data.facturacionCabeceraNumeroSecuenciaFacturacion),
        nroContrato: String(data.nroContrato),
      }); //
      // mainDataGrid.reload();
    },
    [mainDataGrid],
  );

  const toolbar = (
    <Stack>
      <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Row>
          <Col md={3}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Número Cálculo de Facturación'
              name='facturacionCabeceraNumeroSecuenciaFacturacion'
              type='number'
            />
          </Col>
          <Col md={3}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
          </Col>
          <Col md={6}>
            <ClienteDropdown
              control={control}
              disabled={isSubmitting}
              label='Cliente'
              name='clienteId'
              error={!!formErrors.clienteId}
              // helperText={formErrors?.clienteId?.message}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Cálculo Desde'
              name='fechaCalculoDesde'
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Cálculo Hasta'
              name='fechaCalculoHasta'
              disabled={isSubmitting}
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

  const CustomActions = () => {
    const theme = useTheme();

    const sxButton: SxProps = {
      'fontSize': '0.75rem',
      // mx: 1.5,
      ':hover': {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.common.white,
        transition: 'ease-out',
        transitionDuration: '0.3s',
        // transitionDuration: theme.transitions.duration.standard,
      },
    };

    return (
      <>
        <Stack direction='row' justifyContent='center'>
          <Button
            color='primary'
            variant='text'
            // onClick={handleClose}
            sx={{ ...sxButton }}
          >
            Ver Soporte
          </Button>
          <Button
            color='primary'
            variant='text'
            // onClick={handleClose}
            sx={{ ...sxButton }}
          >
            Ver Proforma
          </Button>
        </Stack>
      </>
    );
  };

  return (
    <>
      {toolbar}
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { field: 'facturacionCabeceraNumeroSecuenciaFacturacion', headerName: 'Nro. Facturación' },
              { field: 'fechaCalculoDesde', headerName: 'Fecha Facturación' },
              { field: 'clienteId', headerName: 'Nro. Cliente', flex: 0.8 },
              { field: 'denominación', headerName: 'Denominación' },
              { field: 'numeroSecuenciaContrato', headerName: 'Nro. Contrato', flex: 0.9 },
              {
                field: 'contratoDescripcion',
                headerName: 'Descripción Contrato',
                flex: 2,
                // renderCell: params => renderCellResolver('renderCellExpand', params),
              },
              { field: 'periodo', headerName: 'Período' },
              {
                field: 'custom_actions_column',
                headerName: 'Acciones',
                headerAlign: 'center',
                align: 'center',
                renderCell: params => <CustomActions />,
                flex: 1.5,
              },
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
