import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Chip, Paper } from '@mui/material';

import { Col, Modal, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionLogBreadcrumb } from '@domains/facturacion/constants';

import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
import { FacturacionLogSchema } from '@domains/facturacion/repository/facturacion.schemas';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DataGrid } from '@app/components/DataGrid';
import { FacturacionLogContext } from '@domains/facturacion/contexts/facturacion.log.context';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ViewIcon } from '@assets/icons';
import DetalleFacturacionLog from './views/DetalleFacturacionLog';

const FacturacionLog = () => {
  const { mainDataGrid } = useContext(FacturacionLogContext);
  const [facturacionData, setFacturacionData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    mainDataGrid.load({ fixedFilters: { clienteId: 1 } });
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      numeroSecuenciaFacturacion: '',
      nroContrato: '',
      // clienteId: { value: 1, code: '', label: '1' },
      clienteId: '',
      fechaDesde: null,
      fechaHasta: null,
    },
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters: FacturacionLogSchema = {
        numeroSecuenciaFacturacion: data.numeroSecuenciaFacturacion ? data.numeroSecuenciaFacturacion : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        clienteId: data.clienteId.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde && DateLib.parseToDBString(data.fechaDesde),
        fechaHasta: data.fechaHasta && DateLib.parseToDBString(data.fechaHasta),
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const onClickAbrirLogDetalle = (row: AnyValue) => {
    const datos = row;
    setFacturacionData(datos);
    setOpenModal(true);
  };

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='search' isSubmitting={isSubmitting}>
        <Row>
          <Col md={3}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Número Cálculo de Facturación'
              name='numeroSecuenciaFacturacion'
              type='number'
              error={!!formErrors.numeroSecuenciaFacturacion}
            />
          </Col>
          <Col md={3}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
          </Col>
          <Col md={6}>
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
        </Row>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha Cálculo Desde'
              name='fechaDesde'
              disabled={isSubmitting}
              error={!!formErrors.fechaDesde}
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
      </Form>
    </Paper>
  );

  return (
    <>
      {toolbar}
      <DataGrid
        hookRef={mainDataGrid.ref}
        columns={[
          {
            field: 'numeroSecuenciaFacturacion',
            headerName: 'Nro. Cálculo Facturación',
            valueGetter: params => params.row.facturacionCabecera.numeroSecuenciaFacturacion,
          },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Facturación',
            valueGetter: params => DateLib.parseFromDBString(params.row.facturacionCabecera.fechaEjecucion),
            type: 'date',
          },
          {
            field: 'estado',
            headerName: 'Estado Cabecera',
            valueGetter: params => params.row.facturacionCabecera.estado,
          },
          {
            field: 'contratoNumero',
            headerName: 'Número Contrato',
            valueGetter: params => params.row.facturacionCabecera.facturacionContratos[0].contratoNumero,
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            valueGetter: params => params.row.facturacionCabecera.facturacionContratos[0].contratoDescripcion,
          },
          {
            field: 'contratoClienteCodigo',
            headerName: 'Número de Cliente',
            valueGetter: params => params.row.facturacionCabecera.facturacionContratos[0].contratoClienteCodigo,
          },
          {
            field: 'contratoClienteDescripcion',
            headerName: 'Denominación',
            valueGetter: params => params.row.facturacionCabecera.facturacionContratos[0].contratoClienteDescripcion,
          },
          {
            field: 'periodoNumero',
            headerName: 'Periodo',
            valueGetter: params => params.row.facturacionCabecera.facturacionContratos[0].periodoNumero,
          },
          {
            field: 'estadoContrato',
            headerName: 'Estado Contrato',
            valueGetter: params => params.row.facturacionCabecera.facturacionContratos[0].estado,
            renderCell: params => {
              const isRejected = params.value === 'ANULADO';
              return (
                <Chip
                  // icon={isRejected ? <ViewIcon /> : <ViewIcon />}
                  label={params.value}
                  variant='outlined'
                  color={isRejected ? 'error' : 'primary'}
                />
              );
            },
          },
          {
            field: 'avisos',
            headerName: 'Errores/Advertencias',
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
                label='Log Detalle'
                onClick={() => onClickAbrirLogDetalle(params.row)}
                showInMenu
                // disabled={!isContratoActivo(params?.row?.estado)}
              />,
            ],
          },
        ]}
        repositoryFunc={FacturacionRepository.getFacturacionLog}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Log Detalle'>
        <DetalleFacturacionLog facturacionData={facturacionData} />
      </Modal>
    </>
  );
};

export default withBreadcrumb(FacturacionLog, FacturacionLogBreadcrumb);
