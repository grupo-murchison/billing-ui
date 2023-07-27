import { useCallback, useContext, useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';
// import { useConfirmDialog } from '@app/hooks';

import DataGrid from '@app/components/DataGrid/DataGrid';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionReporteContext } from '@domains/facturacion/contexts';
import { FacturacionReporteBreadcrumb } from '@domains/facturacion/constants';

// import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';
import { Button, Paper } from '@mui/material';
import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
// import Form from '@app/components/Form/Form';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
// import IconMenu from '@app/components/DataGrid/components/MenuVertical';
import { ViewIcon } from '@assets/icons';

// import AsyncAutocomplete from '@app/components/Form/FormAutocomplete';

const FacturacionReporte = () => {
  // const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturacionReporteContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      clienteId: '', // TODO debe buscar por descripcion, esto debe migrar a un field Async Autocomplete
      fechaDesde: '',
      fechaHasta: '',
      nroContrato: '',
      numeroSecuenciaFacturacion: '',
    },
    // resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const onSubmit: SubmitHandler<any> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId ? data.clienteId : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        numeroSecuenciaFacturacion: data.numeroSecuenciaFacturacion ? data.numeroSecuenciaFacturacion : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const toolbar = (
    <Paper sx={{ px: 3, py: 4, my: 2 }}>
      <form noValidate onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
        <Row>
          <Col md={3}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Número Cálculo de Facturación'
              name='numeroSecuenciaFacturacion'
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
              emptyOption
              // helperText={formErrors?.clienteId?.message}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Cálculo Desde'
              name='fechaDesde'
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Cálculo Hasta'
              name='fechaHasta'
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
    </Paper>
  );

  // const CustomActions = () => {
  //   const theme = useTheme();

  //   const sxButton: SxProps = {
  //     'fontSize': '0.75rem',
  //     // mx: 1.5,
  //     ':hover': {
  //       backgroundColor: theme.palette.primary.light,
  //       color: theme.palette.common.white,
  //       transition: 'ease-out',
  //       transitionDuration: '0.3s',
  //       // transitionDuration: theme.transitions.duration.standard,
  //     },
  //   };

  //   return (
  //     <>
  //       <Stack direction='row' justifyContent='center'>
  //         <Button
  //           color='primary'
  //           variant='text'
  //           // onClick={handleClose}
  //           sx={{ ...sxButton }}
  //         >
  //           Ver Soporte
  //         </Button>
  //         <Button
  //           color='primary'
  //           variant='text'
  //           // onClick={handleClose}
  //           sx={{ ...sxButton }}
  //         >
  //           Ver Proforma
  //         </Button>
  //       </Stack>
  //     </>
  //   );
  // };

  return (
    <>
      {toolbar}
      <Row>
        <Col md={12}>
          <DataGrid
            hookRef={mainDataGrid.ref}
            columnHeads={[
              { field: 'numeroSecuenciaFacturacion', headerName: 'Nro. Facturación' },
              {
                field: 'fechaEjecucion',
                headerName: 'Fecha Facturación',
                valueGetter: params => DateLib.parseFromDBString(params.value),
                type: 'date',
              },
              {
                field: 'clienteId',
                headerName: 'Nro. Cliente',
                flex: 0.8,
                valueGetter: params => params.row.contratos[0]?.contratoClienteNumero || '',
              },
              {
                field: 'denominación',
                headerName: 'Denominación',
                valueGetter: params => params.row.contratos[0]?.sociedadDenominacion || '',
              },
              {
                field: 'numeroSecuenciaContrato',
                headerName: 'Nro. Contrato',
                flex: 0.9,
                valueGetter: params => params.row.contratos[0]?.numeroSecuenciaContrato || '',
              },
              {
                field: 'contratoDescripcion',
                headerName: 'Descripción Contrato',
                flex: 2,
                valueGetter: params => params.row.contratos[0]?.contratoClienteDescripcion || '',
              },
              {
                field: 'periodo',
                headerName: 'Período',
                valueGetter: params => params.row.contratos[0]?.periodoNumero || '',
                flex: 0.5,
              },
              {
                field: 'actions',
                type: 'actions',
                headerName: 'Acciones',
                headerAlign: 'center',
                align: 'center',
                flex: 0.5,
                getActions: params => [
                  <GridActionsCellItem
                    key={2}
                    icon={<ViewIcon />}
                    label='Ver Soporte'
                    // onClick={toggleAdmin(params.id)}
                    showInMenu
                  />,
                  <GridActionsCellItem
                    key={3}
                    icon={<ViewIcon />}
                    label='Ver Proforma'
                    // onClick={duplicateUser(params.id)}
                    showInMenu
                  />,
                  // <IconMenu
                  //   key={4}
                  //   options={[
                  //     { label: 'Ver Soporte', icon: '', caption: '' },
                  //     { label: 'Ver Proforma', icon: '', caption: '' },
                  //   ]}
                  // />,
                ],
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
