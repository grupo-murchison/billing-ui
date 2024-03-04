import { Col, Row } from '@app/components';
import { Paper } from '@mui/material';
import Form from '@app/components/Form/Form';

import { useCallback, useContext, useEffect } from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

import { withBreadcrumb } from '@app/hocs';

import DataGrid from '@app/components/DataGrid/DataGrid';

import { GridActionsCellItem } from '@mui/x-data-grid';
import { ViewIcon } from '@assets/icons';
import { EventoErrorRepository } from '@domains/evento-error/repository';
import { EventoErroresDataGridBreadcrumb } from '@domains/evento-error/constants';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { EventosDropdownAutoComplete } from '@domains/evento-cliente/container/cliente-dropdown';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
import { EventoErrorContext } from '@domains/evento-error/contexts';

const EventoErrorDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(EventoErrorContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);


  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      clienteId: null,
      fechaDesde: null,
      fechaHasta: null,
      eventoId: [],
    },
    // resolver: zodResolver(EventosClientesCreateSchema),
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const eventosIds = data.eventoId.map((evento: AnyValue) => {
        return evento.value;
      });
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        eventosId: data.eventoId ? [...eventosIds] : undefined,
      };
      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );


  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form
        onSubmit={handleSubmit(onSubmit)} label='search' isSubmitting={isSubmitting}
      >
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



  return (
    <>
      {toolbar}
      <DataGrid
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'source_system', headerName: 'Evento Origen' },
          { field: 'type', headerName: 'Tipo Evento' },
          { field: 'createdAt', headerName: 'Fecha Creacion', },
          { field: 'createdBy', headerName: 'Usuario Creacion' },
          { field: 'clientId', headerName: 'Cliente ID' },
          { field: 'status', headerName: 'Status' },
          {
            field: 'actions',
            type: 'actions',
            headerName: 'Acciones',
            headerAlign: 'center',
            align: 'center',
            flex: 0.5,
            getActions: params => [
              <GridActionsCellItem
                key={1}
                icon={<ViewIcon />}
                label='Vista'
                onClick={() => console.log(params.row.id)}
                showInMenu
              />,
            ],
          },
        ]}
        repositoryFunc={EventoErrorRepository.getAllEventoPaginated}
      />
      <Outlet />
    </>
  );
};

export default withBreadcrumb(EventoErrorDataGrid, EventoErroresDataGridBreadcrumb);
