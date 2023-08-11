// import { useCallback, useContext, useEffect } from 'react';

import { Col, Row } from "@app/components";
import Form from "@app/components/Form/Form";
import FormDesktopDatePicker from "@app/components/Form/FormInputs/FormDatePicker";
import FormTextField from "@app/components/Form/FormInputs/FormTextField";
import { ClienteDropdownAutoComplete } from "@domains/cliente/container/cliente-dropdown";
import { DateLib } from "@libs";
import { Paper } from "@mui/material";
import { useCallback, useContext } from "react";

import { SubmitHandler, useForm } from 'react-hook-form';
import { FacturacionReporteContext } from "../../contexts";

// import { Paper } from '@mui/material';
// import { GridActionsCellItem } from '@mui/x-data-grid';

// import { Col, Row } from '@app/components';
import DataGrid from '@app/components/DataGrid/DataGrid';
import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';
import { GridActionsCellItem } from "@mui/x-data-grid";
import { ViewIcon } from "@assets/icons";

import { withBreadcrumb } from '@app/hocs';

// import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { FacturacionRepository } from '@domains/facturacion/repository';
import { ClienteEventosBreadcrumb } from "@domains/facturacion/constants";

// import { FacturacionReporteContext } from '@domains/facturacion/contexts';
// import { FacturacionReporteBreadcrumb } from '@domains/facturacion/constants';

// import Form from '@app/components/Form/Form';
// import FormTextField from '@app/components/Form/FormInputs/FormTextField';
// import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
// import { DateLib } from '@libs';
// // import IconMenu from '@app/components/DataGrid/components/MenuVertical';
// import { ViewIcon } from '@assets/icons';

const EventoClientes = () => {
//   // const _navigate = useNavigate();

  const { mainDataGrid } = useContext(FacturacionReporteContext);

  // useEffect(() => {
  //   mainDataGrid.load();
  // }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<any>({
    defaultValues: {
      clienteId: { value: '', code: '', label: '' },
      fechaDesde: null,
      fechaHasta: null,
      cantidad: '',
      eventos: '',
    },
    // resolver: zodResolver(ConceptoAcuerdoCreateSchema),
  });

  const onSubmit: SubmitHandler<any> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        cantidad: data.nroContrato ? data.nroContrato : undefined,
        eventos: data.numeroSecuenciaFacturacion ? data.numeroSecuenciaFacturacion : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} isSearch isSubmitting={isSubmitting}>
        <Row>
          <Col sm={12} md={6}>
            <ClienteDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Cliente'
              name='clienteId'
              error={!!formErrors.clienteId}
              // emptyOption
              // helperText={formErrors?.clienteId?.message}
            />
          </Col>
          {/* TODO: cambiar a EVENTOS y que sea un selector multiple */}
          <Col sm={12} md={6}>
            <ClienteDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Evento'
              name='clienteId'
              error={!!formErrors.clienteId}
              // emptyOption
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
              // error={!!formErrors.fechaDesde}
            />
          </Col>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Cálculo Hasta'
              name='fechaHasta'
              disabled={isSubmitting}
              error={!!formErrors.fechaHasta}
            />
          </Col>
        </Row>
        <Row>
          {/* TODO: cambiar a Cantidad. valor numerico minimo 1  */}
          <Col md={12}>
            <FormDesktopDatePicker
              control={control}
              label='Cantidad'
              name='fechaDesde'
              disabled={isSubmitting}
              // error={!!formErrors.fechaDesde}
            />
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  return (
    <>
    {toolbar}
    <Paper>
      {/* TODO: Adaptar a los campos segun el word */}
    <DataGrid
          hookRef={mainDataGrid.ref}
          columns={[
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
              valueGetter: params => params.row.contratos[0]?.contratoNro || '',
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
          toolbar={toolbarMUI}
        />
      </Paper>
    </>
    )
};


// export default withBreadcrumb(FacturacionReporte, FacturacionReporteBreadcrumb);
export default withBreadcrumb(EventoClientes, ClienteEventosBreadcrumb);