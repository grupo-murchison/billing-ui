import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Paper } from '@mui/material';

import { Col, Modal, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { CalculoFacturacionLogBreadcrumb } from '@domains/facturacion/constants';

import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
import { CalculoFacturacionLogSchema } from '@domains/facturacion/repository/facturacion.schemas';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DataGrid } from '@app/components/DataGrid';
import { FacturacionLogContext } from '@domains/facturacion/contexts/facturacion.log.context';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ViewIcon } from '@assets/icons';
import DetalleFacturacionLog from './views/DetalleFacturacionLog';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomChip from '@app/components/Chip/Chip';

const CalculoFacturacionLog = () => {
  const { mainDataGrid } = useContext(FacturacionLogContext);
  const [facturacionData, setFacturacionData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      numeroSecuenciaCalculo: '',
      nroContrato: '',
      clienteId: { value: '', code: '', label: '' },
      fechaDesde: null,
      fechaHasta: null,
    },
    resolver: zodResolver(CalculoFacturacionLogSchema),
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        numeroSecuenciaCalculo: data.numeroSecuenciaCalculo ? data.numeroSecuenciaCalculo : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
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
              label='Número Secuencia Cálculo'
              name='numeroSecuenciaCalculo'
              type='number'
            />
          </Col>
          <Col md={3}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
          </Col>
          <Col md={6}>
            <ClienteDropdownAutoComplete control={control} disabled={isSubmitting} label='Cliente' name='clienteId' />
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
            field: 'numeroSecuenciaCalculo',
            headerName: 'Número Secuencia Cálculo',
            valueGetter: ({ row }) => row?.facturacionCabecera?.numeroSecuenciaCalculo || '',
          },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Facturación',
            valueGetter: ({ row }) => DateLib.beautifyDBString(row?.facturacionCabecera?.fechaEjecucion) || '',
          },
          {
            field: 'estado',
            headerName: 'Estado Cabecera',
            valueGetter: ({ row }) => row?.facturacionCabecera?.estado,
            renderCell: params => {
              return <CustomChip estado={params.value} />;
            },
          },
          {
            field: 'contratoNumero',
            headerName: 'Número Contrato',
            valueGetter: ({ row }) => row?.facturacionCabecera?.facturacionContratos[0]?.contratoNumero,
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            valueGetter: ({ row }) => row?.facturacionCabecera?.facturacionContratos[0]?.contratoDescripcion,
          },
          {
            field: 'contratoClienteCodigo',
            headerName: 'Número de Cliente',
            valueGetter: ({ row }) => row?.facturacionCabecera?.facturacionContratos[0]?.contratoClienteCodigo,
          },
          {
            field: 'contratoClienteDescripcion',
            headerName: 'Denominación',
            valueGetter: ({ row }) => row?.facturacionCabecera?.facturacionContratos[0]?.contratoClienteDescripcion,
          },
          {
            field: 'periodoNumero',
            headerName: 'Periodo',
            valueGetter: ({ row }) => row?.facturacionCabecera?.facturacionContratos[0]?.periodoNumero,
          },
          {
            field: 'estadoContrato',
            headerName: 'Estado Contrato',
            valueGetter: ({ row }) => row?.facturacionCabecera?.facturacionContratos[0]?.estado,
            renderCell: params => {
              return <CustomChip estado={params.value} />;
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

export default withBreadcrumb(CalculoFacturacionLog, CalculoFacturacionLogBreadcrumb);
