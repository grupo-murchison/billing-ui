import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { DateLib } from '@libs';
import { Paper } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import DataGrid from '@app/components/DataGrid/DataGrid';
import ToolbarMUI from '@app/components/DataGrid/components/ToolbarMUI';

import { withBreadcrumb } from '@app/hocs';
import { EventosServiciosBreadcrumb } from '@domains/facturacion/constants';
import { EventoServicioRepository } from '../repository';
import { EventosServiciosContext } from '../contexts/eventos.servicios.context';
import { EventosServicioCreateSchema, EventosServicioFormSchemaType } from '../schemas';

import { zodResolver } from '@hookform/resolvers/zod';

const EventoServicio = () => {
  const { mainDataGrid } = useContext(EventosServiciosContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid.load]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      nroFacturacion: '',
      clienteId: { value: '', code: '', label: '' },
      contrato: '', // TODO deber sen un filtro más avanzado, ver documentación
      conceptoAcuerdo: '', // TODO deber sen un filtro más avanzado, ver documentación
      fechaDesde: null,
      fechaHasta: null,
    },
    resolver: zodResolver(EventosServicioCreateSchema),
  });

  const onSubmit: SubmitHandler<EventosServicioFormSchemaType> = useCallback(
    async data => {
      const filters = {
        numeroSecuenciaFacturacion: data.nroFacturacion ? data.nroFacturacion : undefined,
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        nroContato: data.contrato ? data.contrato : undefined,
        modeloAcuerdoId: data.conceptoAcuerdo ? data.conceptoAcuerdo : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='search' isSubmitting={isSubmitting}>
        <Row>
          <Col sm={12} md={6}>
            <FormTextField control={control} label='Nro. Facturación' name='nroFacturacion' disabled={isSubmitting} />
          </Col>
          <Col sm={12} md={6}>
            <ClienteDropdownAutoComplete control={control} disabled={isSubmitting} label='Cliente' name='clienteId' />
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Nro. Contrato' name='contrato' />
          </Col>
          <Col sm={12} md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Concepto Acuerdo' name='conceptoAcuerdo' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Evento Desde'
              name='fechaDesde'
              disabled={isSubmitting}
            />
          </Col>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Evento Hasta'
              name='fechaHasta'
              disabled={isSubmitting}
            />
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  const toolbarProp = () => <ToolbarMUI fileName={'Eventos Por Servicio'} />;

  return (
    <>
      {toolbar}

      <DataGrid
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'genEventoOrigenId', headerName: 'Evento Origen', minWidth: 115 },
          { field: 'genEventoTipoId', headerName: 'Tipo Evento', minWidth: 115 },
          {
            field: 'genEventoFechaCreacion',
            headerName: 'Fecha Creacion Evento',
            minWidth: 125,
            valueGetter: params =>
              params?.value ? DateLib.fromFormatToFormat(params?.value, 'yyyyMMddHHmmss', 'yyyy-MM-dd HH:mm:ss') : '',
          },
          { field: 'genCompania', headerName: 'Compania', minWidth: 100 },
          { field: 'genSistema', headerName: 'Sistema', minWidth: 80 },
          { field: 'genClienteId', headerName: 'Cliente', minWidth: 80 },
          { field: 'genDestinoTipo', headerName: 'Tipo Destino', minWidth: 110 },
          { field: 'genDestinoId', headerName: 'Identificador Destino', minWidth: 160 },
          { field: 'genTerminalId', headerName: 'Terminal', minWidth: 100 },
          { field: 'genPatio', headerName: 'Patio', minWidth: 70 },
          { field: 'genTarea', headerName: 'Tarea', minWidth: 150 },
          { field: 'genOrdenCompra', headerName: 'Orden Compra', minWidth: 125 },
          { field: 'evCantidadLitros', headerName: 'Cantidad Litros', minWidth: 125 },
          { field: 'evTipoCombustible', headerName: 'Tipo Combustible', minWidth: 135 },
          { field: 'evConcesionario', headerName: 'Concesionario', minWidth: 125 },
          { field: 'evModelo', headerName: 'Modelo', minWidth: 180 },
          { field: 'evDaño', headerName: 'Daño', minWidth: 115 },
          { field: 'evTipoDaño', headerName: 'Tipo Daño', minWidth: 115 },
          { field: 'evCategorizacion', headerName: 'Categorizacion', minWidth: 130 },
          { field: 'evModelo', headerName: 'Modelo', minWidth: 130 },
          { field: 'evPieza', headerName: 'Pieza', minWidth: 100 },
          { field: 'evEstado', headerName: 'Estado', minWidth: 115 },
          { field: 'evDUA', headerName: 'DUA', minWidth: 115 },
          { field: 'evTipoEmbarque', headerName: 'Tipo Embarque', minWidth: 130 },
          { field: 'evColor', headerName: 'Color', minWidth: 130 },
          { field: 'evDimension', headerName: 'Dimension', minWidth: 130 },
          { field: 'eventoId', headerName: 'Identificador Evento', minWidth: 135 },
          {
            field: 'genEventoFechaEnvio',
            headerName: 'Fecha Envio Evento',
            minWidth: 135,
            valueGetter: params =>
              params?.value ? DateLib.fromFormatToFormat(params?.value, 'yyyyMMddHHmmss', 'yyyy-MM-dd HH:mm:ss') : '',
          },
        ]}
        repositoryFunc={EventoServicioRepository.getAllEventDetails}
        toolbar={toolbarProp}
      />
    </>
  );
};

export default withBreadcrumb(EventoServicio, EventosServiciosBreadcrumb);
