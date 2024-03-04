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
import Toast from '@app/components/Toast/Toast';

import { withBreadcrumb } from '@app/hocs';

import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { CalculoRepository } from '@domains/calculo/repository';
import { CalculoReporteContext } from '@domains/calculo/contexts';
import { CalculoFacturacionReversionBreadcrumb } from '@domains/calculo/constants';

import { DateLib } from '@libs';

import { zodResolver } from '@hookform/resolvers/zod';
import { ValidationSchemaFacturacionReversion } from '@domains/calculo/repository/schemas';
import { CancelScheduleSendIcon, RestoreIcon, ViewIcon } from '@assets/icons';
import DataGridBase from '@app/components/DataGrid/DataGridBase';
import CalculoReversionLog from './views/CalculoReversionLog';
import { useConfirmDialog } from '@app/hooks';
import CustomChip from '@app/components/Chip/Chip';
import FormDateRangePicker from '@app/components/Form/FormInputs/FormDateRangePicker';

const CalculoReversion = () => {
  // const _navigate = useNavigate();

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Se inicia el procesamiento!');
  const [contratos, setContratos] = useState<AnyValue>([]);
  const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
  const [calculoFacturacionData, setCalculoFacturacionData] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { mainDataGrid } = useContext(CalculoReporteContext);
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
      rangoFechas: null,
      nroContrato: '',
      numeroSecuenciaCalculo: '',
    },
    resolver: zodResolver(ValidationSchemaFacturacionReversion),
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.rangoFechas[0] ? DateLib.parseToDBString(data.rangoFechas[0]) : undefined,
        fechaHasta: data.rangoFechas[1] ? DateLib.parseToDBString(data.rangoFechas[1]) : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        numeroSecuenciaCalculo: data.numeroSecuenciaCalculo ? data.numeroSecuenciaCalculo : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const handleRevertir = useCallback(
    (row: AnyValue) => {
      confirmDialog.open({
        type: 'danger',
        title: '¿Revertir Cálculo?',
        message: `Se procederá a realizar la reversión de ${row.contratos.length} contrato/s asociados al número de facturación ${row.numeroSecuenciaCalculo}`,
        async onClickYes() {
          await CalculoRepository.revertirFacturacion(row.id)
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
              setSnackbarMessage(`Ocurrió un error!${error}`);
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
        title: '¿Anular Cálculo?',
        message: `Se procederá a realizar la anulación de ${row.contratos.length} contrato/s asociados al número de facturación ${row.numeroSecuenciaCalculo}`,
        async onClickYes() {
          await CalculoRepository.anularFacturacion(row.id)
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
              setSnackbarMessage(`Ocurrió un error! ${error}`);
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
    setCalculoFacturacionData(datos);
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
            <FormTextField control={control} label='Contrato' name='nroContrato' type='number' />
          </Col>
          <Col sm={12} md={6}>
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
        apiRef={apiRef}
        columns={[
          { ...GRID_CHECKBOX_SELECTION_COL_DEF, renderHeader: () => '', maxWidth: 50 },
          { field: 'numeroSecuenciaCalculo', headerName: 'Número Secuencia Cálculo' },
          {
            field: 'cantidadContratos',
            headerName: 'Cantidad Contratos',
            valueGetter: ({ row }) => row?.contratos?.length || '',
          },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Cálculo',
            valueGetter: params => DateLib.beautifyDBString(params.value),
          },
          {
            field: 'tipoFacturacion',
            headerName: 'Tipo de Cálculo',
          },
          {
            field: 'estado',
            headerName: 'Estado',
            renderCell: params => {
              return <CustomChip estado={params.value} />;
            },
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
                disabled={params.row.estado === 'CALCULADO' ? false : true}
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
        repositoryFunc={CalculoRepository.getAllCalculosPaginated}
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
            renderCell: params => {
              return <CustomChip estado={params.value} />;
            },
          },
        ]}
      />
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Log proceso de reversión del Cálculo'>
        <CalculoReversionLog calculoFacturacionData={calculoFacturacionData} />
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

export default withBreadcrumb(CalculoReversion, CalculoFacturacionReversionBreadcrumb);
