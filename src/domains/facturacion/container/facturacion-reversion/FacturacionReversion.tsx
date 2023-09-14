import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Backdrop, Box, Paper } from '@mui/material';
import {
  GRID_CHECKBOX_SELECTION_COL_DEF,
  GridActionsCellItem,
  GridRowSelectionModel,
  useGridApiRef,
} from '@mui/x-data-grid';

import { Col, Modal, Row } from '@app/components';
import DataGrid from '@app/components/DataGrid/DataGrid';
import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import Toast from '@app/components/Toast/Toast';

import { withBreadcrumb } from '@app/hocs';

import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionReporteContext } from '@domains/facturacion/contexts';
import { FacturacionReversionBreadcrumb } from '@domains/facturacion/constants';

import { DateLib } from '@libs';

import { zodResolver } from '@hookform/resolvers/zod';
import { FacturacionReversionCreateSchema } from '@domains/facturacion/schemas';
import { CancelScheduleSendIcon, RestoreIcon, ViewIcon } from '@assets/icons';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import FacturacionReversionLog from './views/FacturacionReversionLog';
import { useConfirmDialog } from '@app/hooks';

const FacturacionReversion = () => {
  // const _navigate = useNavigate();

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Se inicia el procesamiento!');
  const [contratos, setContratos] = useState<AnyValue>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [facturacionData, setFacturacionData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { mainDataGrid } = useContext(FacturacionReporteContext);
  const apiRef = useGridApiRef();

  const confirmDialog = useConfirmDialog();

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AnyValue>({
    defaultValues: {
      clienteId: { value: '', code: '', label: '' },
      fechaDesde: null,
      fechaHasta: null,
      nroContrato: '',
      numeroSecuenciaFacturacion: '',
    },
    resolver: zodResolver(FacturacionReversionCreateSchema),
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        numeroSecuenciaFacturacion: data.numeroSecuenciaFacturacion ? data.numeroSecuenciaFacturacion : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const handleRevertir = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        type: 'danger',
        title: '¿Revertir Facturación?',
        message: `Se procederá a realizar la reversión de ${row.contratos.length} contrato/s asociados al número de facturación ${row.numeroSecuenciaFacturacion}`,
        async onClickYes() {
          await FacturacionRepository.revertirFacturacion(row.id)
            .then(_response => {
              console.log(_response);
              if (_response.data) {
                setSnackbarMessage('La reversión se realizó con éxito');
              } else {
                setSnackbarMessage('La reversión no pudo realizarse');
              }
            })
            .catch(error => {
              setErrorFromBackEnd(true);
              setSnackbarMessage('Ocurrió un error!');
            })
            .finally(() => {
              setOpenBackdrop(false);
              setOpenSackbar(true);
            });
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
  );

  const handleAnular = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        type: 'warning',
        title: '¿Anular Facturación?',
        message: `Se procederá a realizar la anulación de ${row.contratos.length} contrato/s asociados al número de facturación ${row.numeroSecuenciaFacturacion}`,
        async onClickYes() {
          await FacturacionRepository.anularFacturacion(row.id)
            .then(_response => {
              console.log(_response);
              if (_response.data) {
                setSnackbarMessage('La anulación se realizó con éxito');
              } else {
                setSnackbarMessage('La anulación no pudo realizarse');
              }
            })
            .catch(error => {
              setErrorFromBackEnd(true);
              setSnackbarMessage('Ocurrió un error!');
            })
            .finally(() => {
              setOpenBackdrop(false);
              setOpenSackbar(true);
            });
          confirmDialog.close();
          mainDataGrid.reload();
        },
      });
    },
    [confirmDialog, mainDataGrid],
  );

  const handleVerLog = (row: AnyValue) => {
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
            />
          </Col>
          <Col md={3}>
            <FormTextField control={control} label='Contrato' name='nroContrato' type='number' />
          </Col>
          <Col sm={12} md={6}>
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
        apiRef={apiRef}
        columns={[
          { ...GRID_CHECKBOX_SELECTION_COL_DEF, renderHeader: () => '', maxWidth: 50 },
          { field: 'numeroSecuenciaFacturacion', headerName: 'Nro. Facturación' },
          {
            field: 'cantidadContratos',
            headerName: 'Cantidad Contratos',
            valueGetter: ({ row }) => row?.contratos?.length || '',
          },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Facturación',
            valueGetter: params => DateLib.parseFromDBString(params.value),
            type: 'date',
          },
          {
            field: 'tipoFacturacion',
            headerName: 'Tipo Facturación',
          },
          {
            field: 'estado',
            headerName: 'Estado',
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
                key={1}
                icon={<ViewIcon />}
                label='Ver Log'
                onClick={() => handleVerLog(params.row)}
                // disabled={params.row.estado === 'REVERSADO' ? false : true}
                showInMenu
              />,
              <GridActionsCellItem
                key={2}
                icon={<CancelScheduleSendIcon />}
                label='Anular'
                disabled={params.row.estado === 'FACTURADO' ? false : true}
                onClick={() => handleAnular(params.row)}
                showInMenu
              />,
              <GridActionsCellItem
                key={3}
                icon={<RestoreIcon />}
                label='Revertir'
                onClick={() => handleRevertir(params.row)}
                showInMenu
              />,
            ],
          },
        ]}
        repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
        checkboxSelection
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(selection: AnyValue) => {
          if (selection.length >= 1) {
            const selectionSet = new Set(rowSelectionModel);
            const result = selection.filter((s: AnyValue) => !selectionSet.has(s));
            setRowSelectionModel(result);

            const row = apiRef?.current.getRow(result[0]);

            setContratos(row?.contratos || []);
          } else {
            setRowSelectionModel(selection);
            setContratos([]);
          }
        }}
      />

      <Box mt={4} mb={3} />

      <DataGridBase
        rows={contratos || []}
        columns={[
          { field: 'numeroSecuenciaContrato', headerName: 'Nro. Cálculo' },
          {
            field: 'contratoNumero',
            headerName: 'Nro. Contrato',
            flex: 0.9,
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            flex: 2,
          },
          {
            field: 'contratoClienteDescripcion',
            headerName: 'Cliente',
          },
          {
            field: 'periodoNumero',
            headerName: 'Periodo',
            flex: 0.5,
          },
          {
            field: 'estado',
            headerName: 'Estado',
            flex: 0.5,
          },
        ]}
      />
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Log proceso de reversión de la facturación'>
        <FacturacionReversionLog facturacionData={facturacionData} />
      </Modal>
      <Backdrop open={openBackdrop} />

      <Toast
        open={openSackbar}
        error={errorFromBackEnd}
        onClose={() => setOpenSackbar(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default withBreadcrumb(FacturacionReversion, FacturacionReversionBreadcrumb);
