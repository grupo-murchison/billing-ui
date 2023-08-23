
import { Col, Row } from "@app/components";
import Form from "@app/components/Form/Form";
import FormDesktopDatePicker from "@app/components/Form/FormInputs/FormDatePicker";
import { ClienteDropdownAutoComplete } from "@domains/cliente/container/cliente-dropdown";
import { DateLib } from "@libs";
import { Paper } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";

import { SubmitHandler, useForm } from 'react-hook-form';
import { ClienteEventosContext, FacturacionReporteContext } from "../../facturacion/contexts";


import DataGrid from '@app/components/DataGrid/DataGrid';
import { toolbarMUI } from '@app/components/DataGrid/components/ToolbarMUI';

import { withBreadcrumb } from '@app/hocs';
import { ClienteEventosBreadcrumb } from "@domains/facturacion/constants";
import { EventoClienteRepository } from "../repository";
import { EventosDropdownAutoComplete } from "./cliente-dropdown/EventosDropdown";
import { EventosClientesCreateSchema } from "../schemas";
import { debugSchema } from "@app/utils/zod.util";
import { zodResolver } from "@hookform/resolvers/zod";



const EventoClientes = () => {


  const [rows, setRows] = useState<any>();

  const { mainDataGrid } = useContext(ClienteEventosContext);

  useEffect(() => {
    mainDataGrid.load();
    setRows(mainDataGrid.getRows());
  }, [mainDataGrid.load]);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<any>({ 
    defaultValues: {
      clienteId: null,
      fechaDesde: null,
      fechaHasta: null,
      eventoId: null,                                                                                          
    },
    // resolver: (data, context, options) => { return debugSchema(data, context, options,EventosClientesCreateSchema)},
    resolver: zodResolver(EventosClientesCreateSchema), 
  });

  const onSubmit: SubmitHandler<any> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        eventoId: data.eventoId ? [data.eventoId.value] : undefined,
      };
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
            />
          </Col>
          <Col sm={12} md={6}>
            <EventosDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Evento'
              name='eventoId'
              error={!!formErrors.eventos}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Evento Desde'
              name='fechaDesde'
              disabled={isSubmitting}
              error={!!formErrors.fechaDesde}
            />
          </Col>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Evento Hasta'
              name='fechaHasta'
              disabled={isSubmitting}
              error={!!formErrors.fechaHasta}
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
    <DataGrid
          hookRef={mainDataGrid.ref}
          columns={[
            { field: 'genEventoOrigenId', headerName: 'Evento Origen', minWidth: 115},
            { field: 'genEventoTipoId', headerName: 'Tipo Evento', minWidth: 115 },
            { field: 'genEventoFechaCreacion', headerName: 'Fecha Creacion Evento', minWidth: 125,
              valueGetter: params => DateLib.parseFromDBString(params?.value.slice(0,8)),
              type: 'date',
            },
            { field: 'genCompania', headerName: 'Compania', minWidth: 100  },
            { field: 'genSistema', headerName: 'Sistema', minWidth: 80  },
            { field: 'genClienteId', headerName: 'Cliente', minWidth: 80  },
            { field: 'genDestinoTipo', headerName: 'Tipo Destino', minWidth: 110  },
            { field: 'genDestinoId', headerName: 'Identificador Destino', minWidth: 160  },
            { field: 'genTerminalId', headerName: 'Terminal', minWidth: 100  },
            { field: 'genPatio', headerName: 'Patio', minWidth: 70  },
            { field: 'genTarea', headerName: 'Tarea', minWidth: 150 },
            { field: 'genOrdenCompra', headerName: 'Orden Compra', minWidth: 125  },
            { field: 'evCantidadLitros', headerName: 'Cantidad Litros', minWidth: 125  },
            { field: 'evTipoCombustible', headerName: 'Tipo Combustible', minWidth: 135  },
            { field: 'evConcesionario', headerName: 'Concesionario', minWidth: 125  },
            { field: 'evModelo', headerName: 'Modelo', minWidth: 180  },
            { field: 'evDaño', headerName: 'Daño', minWidth: 115  },
            { field: 'evTipoDaño', headerName: 'Tipo Daño', minWidth: 115  },
            { field: 'evCategorizacion', headerName: 'Categorizacion', minWidth: 130  },
            { field: 'evPieza', headerName: 'Pieza', minWidth: 100 },
            { field: 'evEstado', headerName: 'Estado', minWidth: 115  },
            { field: 'evDUA', headerName: 'DUA', minWidth: 115  },
            { field: 'evTipoEmbarque', headerName: 'Tipo Embarque', minWidth: 130  },
            { field: 'evColor', headerName: 'Color', minWidth: 130  },
            { field: 'eventoId', headerName: 'Identificador Evento', minWidth: 135  },
            { field: 'genEventoFechaEnvio', headerName: 'Fecha Envio Evento', minWidth: 135,
              valueGetter: params => DateLib.parseFromDBString(params?.value.slice(0,8)),
              type: 'date',
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