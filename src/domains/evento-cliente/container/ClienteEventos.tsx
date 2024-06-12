import { Col, Row } from '@app/components';
import Form from '@app/components/Form/Form';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { DateLib } from '@libs';
import { Paper } from '@mui/material';
import { useCallback, useContext, useEffect } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ClienteEventosContext } from '../../calculo/contexts';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { withBreadcrumb } from '@app/hocs';
import { ClienteEventosBreadcrumb } from '@domains/calculo/constants';
import { EventoClienteRepository } from '../repository';
import { EventosDropdownAutoComplete } from './cliente-dropdown/EventosDropdown';
import { EventClientSearchFiltersValidationSchema, EventClientSearchFiltersFormDataType } from '../schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import FormDateRangePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDateRangePicker';

const EventoClientes = () => {
  const { mainDataGrid } = useContext(ClienteEventosContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid.load]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EventClientSearchFiltersFormDataType>({
    defaultValues: {
      clienteId: null,
      rangoFechas: [],
      eventoId: [],
    },
    resolver: zodResolver(EventClientSearchFiltersValidationSchema),
  });

  const onSubmit: SubmitHandler<EventClientSearchFiltersFormDataType> = useCallback(
    async data => {
      const eventosIds = data.eventoId.map(evento => {
        return evento.value;
      });

      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.rangoFechas[0] ? DateLib.parseToDBString(data.rangoFechas[0]) : undefined,
        fechaHasta: data.rangoFechas[1] ? DateLib.parseToDBString(data.rangoFechas[1]) : undefined,
        eventoId: data.eventoId.length > 0 ? [...eventosIds] : undefined,
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
            <ClienteDropdownAutoComplete control={control} disabled={isSubmitting} label='Cliente' name='clienteId' />
          </Col>
          <Col sm={12} md={6}>
            <EventosDropdownAutoComplete control={control} disabled={isSubmitting} label='Evento' name='eventoId' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormDateRangePicker control={control} label='Evento Fecha' name='rangoFechas' disabled={isSubmitting} />
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  return (
    <>
      {toolbar}
      <DataGrid
        name='Eventos Del Cliente'
        hookRef={mainDataGrid.ref}
        onClickNew={() => console.log('Click New')}
        columns={[
          { field: 'genEventoOrigenId', headerName: 'Evento Origen', minWidth: 115 },
          { field: 'eventGateId', headerName: 'Evento TOS Id', minWidth: 115 },
          { field: 'genEventoTipoId', headerName: 'Tipo Evento', minWidth: 115 },
          {
            field: 'genEventoFechaCreacion',
            headerName: 'Fecha Creacion Evento',
            minWidth: 125,
            valueGetter: params => (params?.value ? DateLib.beautifyDBString(params?.value.slice(0, 8)) : ''),
          },
          { field: 'genCompania', headerName: 'Compania', minWidth: 100 },
          { field: 'genSistema', headerName: 'Sistema', minWidth: 80 },
          {
            field: 'clienteDescripcion',
            headerName: 'Cliente',
            minWidth: 180,
            valueGetter: params => {
              const { clienteCodigo, clienteDescripcion } = params.row;
              return `${clienteCodigo} - ${clienteDescripcion}`;
            },
          },
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
          { field: 'evPieza', headerName: 'Pieza', minWidth: 100 },
          { field: 'evEstado', headerName: 'Estado', minWidth: 115 },
          { field: 'evDUA', headerName: 'DUA', minWidth: 115 },
          { field: 'evTipoEmbarque', headerName: 'Tipo Embarque', minWidth: 130 },
          { field: 'evColor', headerName: 'Color', minWidth: 130 },
          {
            field: 'genEventoFechaEnvio',
            headerName: 'Fecha Envio Evento',
            minWidth: 160,
            valueGetter: params =>
              params?.value ? DateLib.fromFormatToFormat(params?.value, 'yyyyMMddHHmmss', 'yyyy-MM-dd HH:mm:ss') : '',
          },
        ]}
        repositoryFunc={EventoClienteRepository.getAllEventDetails}
      />
    </>
  );
};

export default withBreadcrumb(EventoClientes, ClienteEventosBreadcrumb);
