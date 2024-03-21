import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Paper } from '@mui/material';

import { Col, Modal, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { CalculoRepository } from '@domains/calculo/repository';
import { CalculoLogBreadcrumb } from '@domains/calculo/constants';

import Form from '@app/components/Form/Form';
import { DateLib } from '@libs';
import { CalculoLogSchema } from '@domains/calculo/repository/calculo.schemas';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DataGrid } from '@app/components/DataGrid';
import { CalculoLogContext } from '@domains/calculo/contexts/calculo.log.context';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ViewIcon } from '@assets/icons';
import DetalleFacturacionLog from './views/DetalleCalculoLog';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomChip from '@app/components/Chip/Chip';
import FormDateRangePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDateRangePicker';

const CalculoLog = () => {
  const { mainDataGrid } = useContext(CalculoLogContext);
  const [calculoData, setCalculoData] = useState<AnyValue>({});
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
      rangoFechas: [],
    },
    resolver: zodResolver(CalculoLogSchema),
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        numeroSecuenciaCalculo: data.numeroSecuenciaCalculo ? data.numeroSecuenciaCalculo : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.rangoFechas && data.rangoFechas[0] ? DateLib.parseToDBString(data.rangoFechas[0]) : undefined,
        fechaHasta: data.rangoFechas && data.rangoFechas[1] ? DateLib.parseToDBString(data.rangoFechas[1]) : undefined,
      };
      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const onClickAbrirLogDetalle = (row: AnyValue) => {
    const datos = row;
    setCalculoData(datos);
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
            <FormDateRangePicker control={control} label='Cálculo Fecha' name='rangoFechas' disabled={isSubmitting} />
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
            valueGetter: ({ row }) => row?.calculoCabecera?.numeroSecuenciaCalculo || '',
          },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Cálculo',
            valueGetter: ({ row }) => DateLib.beautifyDBString(row?.calculoCabecera?.fechaEjecucion) || '',
          },
          {
            field: 'estado',
            headerName: 'Estado Cabecera',
            valueGetter: ({ row }) => row?.calculoCabecera?.estado,
            renderCell: params => {
              return <CustomChip estado={params.value} />;
            },
          },
          {
            field: 'contratoNumero',
            headerName: 'Número Contrato',
            valueGetter: ({ row }) => row?.calculoCabecera?.calculoContratos[0]?.contratoNumero,
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            valueGetter: ({ row }) => row?.calculoCabecera?.calculoContratos[0]?.contratoDescripcion,
          },
          {
            field: 'contratoClienteCodigo',
            headerName: 'Número de Cliente',
            valueGetter: ({ row }) => row?.calculoCabecera?.calculoContratos[0]?.contratoClienteCodigo,
          },
          {
            field: 'contratoClienteDescripcion',
            headerName: 'Denominación',
            valueGetter: ({ row }) => row?.calculoCabecera?.calculoContratos[0]?.contratoClienteDescripcion,
          },
          {
            field: 'periodoNumero',
            headerName: 'Periodo',
            valueGetter: ({ row }) => row?.calculoCabecera?.calculoContratos[0]?.periodoNumero,
          },
          {
            field: 'estadoContrato',
            headerName: 'Estado Contrato',
            valueGetter: ({ row }) => row?.calculoCabecera?.calculoContratos[0]?.estado,
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
        repositoryFunc={CalculoRepository.getCalculoLog}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Log Detalle'>
        <DetalleFacturacionLog
          calculoContrato={calculoData?.calculoCabecera?.calculoContratos[0]}
          detalles={calculoData?.detalles}
        />
      </Modal>
    </>
  );
};

export default withBreadcrumb(CalculoLog, CalculoLogBreadcrumb);
