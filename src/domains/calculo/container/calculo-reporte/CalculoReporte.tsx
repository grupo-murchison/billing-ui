import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Paper } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Modal, Row } from '@app/components';
import DataGrid from '@app/components/DataGrid/DataGrid';

import { withBreadcrumb } from '@app/hocs';

import { CalculoRepository } from '@domains/calculo/repository';
import { CalculoReporteContext } from '@domains/calculo/contexts';
import { CalculoFacturacionReporteBreadcrumb } from '@domains/calculo/constants';
import { DetalleCalculo } from '@domains/calculo/container/calculo';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DateLib } from '@libs';
// import IconMenu from '@app/components/DataGrid/components/MenuVertical';
import { FileDownloadOutlinedIcon, ViewIcon } from '@assets/icons';
import { ValidationSchemaCalculoReporteFilter } from '@domains/calculo/repository/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { downloadPdfAxios } from '@app/utils/axios.util';
import { ClientePopUp } from '@domains/cliente/container/cliente-dropdown/ClienteDropdown';
import Toast from '@app/components/Toast/Toast';
import FormDateRangePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDateRangePicker';

const CalculoReporte = () => {
  // const _navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [calculoContratoId, setCalculoContratoId] = useState<AnyValue>(null);
  const [periodo, setPeriodo] = useState<AnyValue>();
  const { mainDataGrid } = useContext(CalculoReporteContext);
  const [toastMessage, setToastMessage] = useState('Datos enviados');
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [openToast, setOpenToast] = useState(false);

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
    resetField,
  } = useForm<AnyValue>({
    defaultValues: {
      clienteId: { value: '', code: '', label: '' },
      rangoFechas: [],
      nroContrato: '',
      numeroSecuenciaCalculo: '',
    },
    resolver: zodResolver(ValidationSchemaCalculoReporteFilter),
  });

  const onSubmit: SubmitHandler<AnyValue> = useCallback(
    async data => {
      const filters = {
        clienteId: data.clienteId?.value ? data.clienteId.value : undefined,
        fechaDesde: data.rangoFechas && data.rangoFechas[0] ? DateLib.parseToDBString(data.rangoFechas[0]) : undefined,
        fechaHasta: data.rangoFechas && data.rangoFechas[1] ? DateLib.parseToDBString(data.rangoFechas[1]) : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        numeroSecuenciaCalculo: data.numeroSecuenciaCalculo ? data.numeroSecuenciaCalculo : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const handleVerSoporte = (row: AnyValue) => {
    setCalculoContratoId(row.contratos[0]?.id); //* id de la tabla calculo_contrato
    setPeriodo(row);
    setOpenModal(true);
  };

  const handleVerProforma = async (row: AnyValue) => {
    setCalculoContratoId(row.contratos[0]?.id); //* id de la tabla calculo_contrato

    CalculoRepository.downloadProforma(row.contratos[0]?.id, row.contratos[0]?.contratoId)
      .then(res => {
        // const fileName = getFileNameHeaders(res.headers);
        downloadPdfAxios(res.data, `Facturacion-Proforma-${row.numeroSecuenciaCalculo}.pdf`);
      })
      .catch(async error => {
        setErrorFromBackEnd(true);
        setToastMessage(error?.error || 'Ocurrió un error!');
      })
      .finally(() => {
        setOpenToast(true);
      });
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
          <Col sm={12} md={6}>
            <ClientePopUp
              control={control}
              disabled={isSubmitting}
              label='Cliente'
              name='clienteId'
              resetField={resetField}
            />
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

  // const CustomActions = () => {
  //   const theme = useTheme();

  //   const sxButton: SxProps = {
  //     'fontSize': '0.75rem',
  //     // mx: 1.5,
  //     ':hover': {
  //       backgroundColor: theme.palette.primary.light,
  //       color: theme.palette.common.white,
  //       transition: 'ease-out',
  //       transitionDuration: '0.3s',
  //     },
  //   };

  //   return (
  //     <>
  //       <Stack direction='row' justifyContent='center'>
  //         <Button
  //           color='primary'
  //           variant='text'
  //           // onClick={handleClose}
  //           sx={{ ...sxButton }}
  //         >
  //           Ver Soporte
  //         </Button>
  //         <Button
  //           color='primary'
  //           variant='text'
  //           // onClick={handleClose}
  //           sx={{ ...sxButton }}
  //         >
  //           Ver Proforma
  //         </Button>
  //       </Stack>
  //     </>
  //   );
  // };

  return (
    <>
      {toolbar}

      <DataGrid
        hookRef={mainDataGrid.ref}
        columns={[
          { field: 'numeroSecuenciaCalculo', headerName: 'Número Secuencia Cálculo' },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Cálculado',
            valueGetter: params => DateLib.beautifyDBString(params?.value),
          },
          {
            field: 'contratoClienteCodigo',
            headerName: 'Nro. Cliente',
            flex: 0.8,
            valueGetter: params => params.row?.contratos[0]?.contratoClienteCodigo || '',
          },
          {
            field: 'denominación',
            headerName: 'Denominación',
            valueGetter: params => params.row?.contratos[0]?.contratoClienteDescripcion || '',
          },
          {
            field: 'contratoNro',
            headerName: 'Nro. Contrato',
            flex: 0.9,
            valueGetter: params => params.row?.contratos[0]?.contratoNumero || '',
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            flex: 2,
            valueGetter: params => params.row?.contratos[0]?.contratoDescripcion || '',
          },
          {
            field: 'periodo',
            headerName: 'Período',
            valueGetter: params => params.row?.contratos[0]?.periodoNumero || '',
            flex: 0.5,
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
                label='Ver Soporte'
                onClick={() => handleVerSoporte(params.row)}
                showInMenu
              />,
              <GridActionsCellItem
                key={3}
                icon={<FileDownloadOutlinedIcon />}
                label='Descargar Proforma'
                onClick={() => handleVerProforma(params.row)}
                showInMenu
              />,
              // <IconMenu
              //   key={4}
              //   options={[
              //     { label: 'Ver Soporte', icon: '', caption: '' },
              //     { label: 'Ver Proforma', icon: '', caption: '' },
              //   ]}
              // />,
            ],
          },
        ]}
        repositoryFunc={CalculoRepository.getAllCalculosPaginated}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Detalle Cálculo'>
        <DetalleCalculo periodo={periodo} calculoContratoId={calculoContratoId} />
      </Modal>

      <Toast open={openToast} message={toastMessage} error={errorFromBackEnd} onClose={handleCloseToast} />
    </>
  );
};

export default withBreadcrumb(CalculoReporte, CalculoFacturacionReporteBreadcrumb);
