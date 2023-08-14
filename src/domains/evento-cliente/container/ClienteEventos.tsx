// import { useCallback, useContext, useEffect } from 'react';

import { Col, Row } from "@app/components";
import Form from "@app/components/Form/Form";
import FormDesktopDatePicker from "@app/components/Form/FormInputs/FormDatePicker";
import FormTextField from "@app/components/Form/FormInputs/FormTextField";
import { ClienteDropdownAutoComplete } from "@domains/cliente/container/cliente-dropdown";
import { DateLib } from "@libs";
import { Paper } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

import { SubmitHandler, useForm } from 'react-hook-form';
import { ClienteEventosContext, FacturacionReporteContext } from "../../facturacion/contexts";

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
import { EventoClienteRepository } from "../repository";

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

  const [rows, setRows] = useState<any>();

  const { mainDataGrid } = useContext(ClienteEventosContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

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
      console.log("🚀 ~ file: ClienteEventos.tsx:69 ~ EventoClientes ~ data:", data)
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        cantidad: data.nroContrato ? data.nroContrato : undefined,
        eventos: data.numeroSecuenciaFacturacion ? data.numeroSecuenciaFacturacion : undefined,
      };


      console.log(filters);
      mainDataGrid.load({ fixedFilters: { ...filters } });
      setRows(mainDataGrid.getRows());
    },
    [mainDataGrid],
    
  );

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)}  label='search' isSubmitting={isSubmitting}>
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
            <FormTextField
              control={control}
              label='Cantidad'
              name='cantidad'
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
            { field: 'id', headerName: 'id' },
            { field: 'clienteId', headerName: 'clienteId' },
            { field: 'eventoId', headerName: 'eventoId' },
            { field: 'eventoCodigo', headerName: 'eventoCodigo' },
            { field: 'eventoDenominacion', headerName: 'eventoDenominacion' },
            { field: 'eventoDescripcion', headerName: 'eventoDescripcion' },
            { field: 'clienteCodigo', headerName: 'clienteCodigo' },
            { field: 'clienteDescripcion', headerName: 'clienteDescripcion' },
            { field: 'genEventoOrigenId', headerName: 'genEventoOrigenId' },
            { field: 'genEventoTipoId', headerName: 'genEventoTipoId' },
            { field: 'genEventoFechaCreacion', headerName: 'genEventoFechaCreacion' },
            { field: 'genEventoFechaModificacion', headerName: 'genEventoFechaModificacion' },
            { field: 'genEventoFechaEnvio', headerName: 'genEventoFechaEnvio' },
            { field: 'genCompania', headerName: 'genCompania' },
            { field: 'genSistema', headerName: 'genSistema' },
            { field: 'genClienteId', headerName: 'genClienteId' },
            { field: 'genDestinoTipo', headerName: 'genDestinoTipo' },
            { field: 'genDestinoId', headerName: 'genDestinoId' },
            { field: 'genTerminalId', headerName: 'genTerminalId' },
            { field: 'genPatio', headerName: 'genPatio' },
            { field: 'genZona', headerName: 'genZona' },
            { field: 'genTarea', headerName: 'genTarea' },
            { field: 'genOrdenCompra', headerName: 'genOrdenCompra' },
            { field: 'evCantidadLitros', headerName: 'evCantidadLitros' },
            { field: 'evTipoCombustible', headerName: 'evTipoCombustible' },
            { field: 'evConcesionario', headerName: 'evConcesionario' },
            { field: 'evModelo', headerName: 'evModelo' },
            { field: 'evColor', headerName: 'evColor' },
            { field: 'evDaño', headerName: 'evDaño' },
            { field: 'evTipoDaño', headerName: 'evTipoDaño' },
            { field: 'evCategorizacion', headerName: 'evCategorizacion' },
            { field: 'evPieza', headerName: 'evPieza' },
            { field: 'evEstado', headerName: 'evEstado' },
            { field: 'evDUA', headerName: 'evDUA' },
            { field: 'evTipoEmbarque', headerName: 'evTipoEmbarque' },
            { field: 'evDimension', headerName: 'evDimension' },
            { field: 'evDestino', headerName: 'evDestino' },
            { field: 'evCiudadDestino', headerName: 'evCiudadDestino' },
            { field: 'evTipoServicio', headerName: 'evTipoServicio' },
            { field: 'evDocumentoSalida', headerName: 'evDocumentoSalida' },
            { field: 'evDiaHabil', headerName: 'evDiaHabil' },
            { field: 'evAlmacen', headerName: 'evAlmacen' },
            { field: 'evHallazgos', headerName: 'evHallazgos' },
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
          repositoryFunc={EventoClienteRepository.getAllEventDetails}
          toolbar={toolbarMUI}
          // getRows={rows => console.log('rows', rows) }
        />
      </Paper>
    </>
    )
};


// export default withBreadcrumb(FacturacionReporte, FacturacionReporteBreadcrumb);
export default withBreadcrumb(EventoClientes, ClienteEventosBreadcrumb);