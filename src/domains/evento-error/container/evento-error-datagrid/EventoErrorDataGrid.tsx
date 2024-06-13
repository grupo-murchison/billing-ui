import { Col, Row } from '@app/components';
import { Paper } from '@mui/material';
import Form from '@app/components/Form/Form';

import { useCallback, useContext, useEffect, useState } from 'react';

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
import { DateLib } from '@libs';
import { EventoErrorContext } from '@domains/evento-error/contexts';
import FormDateRangePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDateRangePicker';
import { ToastDeprecated as Toast } from '@app/components/Toast/Toast';

const EventoErrorDataGrid = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(EventoErrorContext);
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

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
      rangoFechas: [],
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
        fechaDesde: data?.rangoFechas?.[0] ? DateLib.parseToDBString(data.rangoFechas[0]) : undefined,
        fechaHasta: data?.rangoFechas?.[1] ? DateLib.parseToDBString(data.rangoFechas[1]) : undefined,
        eventosId: data.eventoId ? [...eventosIds] : undefined,
      };
      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const handleClickView = useCallback(
    (id: number) => {
      EventoErrorRepository.getEventoById(id + '')
        .then(() => {
          _navigate(`/evento-error/${id}`);
        })
        .catch(error => {
          setErrorFromBackEnd(true);
          setToastMessage(error?.error || 'Ocurrió un error!');
          setOpenToast(true);
        });
    },
    [_navigate],
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
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'evento_revision_cabecera_id', headerName: 'Id' },
          { field: 'eventGateId', headerName: 'Evento TOS Id' },
          { field: 'sourceEventId', headerName: 'Evento Origen' },
          { field: 'type', headerName: 'Tipo Evento' },
          { field: 'FechaHoraEvento', headerName: 'Fecha Creacion' },
          { field: 'createdUser', headerName: 'Usuario Creacion' },
          { field: 'clientId', headerName: 'Cliente ID' },
          { field: 'targetId', headerName: 'VIN' },
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
                onClick={() => handleClickView(params.row.evento_revision_cabecera_id)}
                showInMenu
              />,
            ],
          },
        ]}
        repositoryFunc={EventoErrorRepository.getAllEventoPaginated}
      />
      <Toast open={openToast} message={toastMessage} error={errorFromBackEnd} onClose={handleCloseToast} />
      <Outlet />
    </>
  );
};

export default withBreadcrumb(EventoErrorDataGrid, EventoErroresDataGridBreadcrumb);
