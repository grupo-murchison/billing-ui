import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Paper } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Modal, Row } from '@app/components';
import DataGrid from '@app/components/DataGrid/DataGrid';

import { withBreadcrumb } from '@app/hocs';

import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionReporteContext } from '@domains/facturacion/contexts';
import { FacturacionReporteBreadcrumb } from '@domains/facturacion/constants';
import { DetalleFacturacion } from '@domains/facturacion/container/facturacion';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
// import IconMenu from '@app/components/DataGrid/components/MenuVertical';
import { FileDownloadOutlinedIcon, ViewIcon } from '@assets/icons';
import { FacturacionReporteCreateSchema } from '@domains/facturacion/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { blobToJSON, downloadPdfAxios } from '@app/utils/axios.util';

const FacturacionReporte = () => {
  // const _navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [facturacionContratoId, setFacturacionContratoId] = useState<AnyValue>(null);
  const [periodo, setPeriodo] = useState<AnyValue>();
  const { mainDataGrid } = useContext(FacturacionReporteContext);

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
    resolver: zodResolver(FacturacionReporteCreateSchema),
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

  const handleVerSoporte = (row: AnyValue) => {
    setFacturacionContratoId(row.contratos[0]?.id); //* id de la tabla facturacion_contrato
    setPeriodo(row);
    setOpenModal(true);
  };

  const handleVerProforma = async (row: AnyValue) => {
    setFacturacionContratoId(row.contratos[0]?.id); //* id de la tabla facturacion_contrato

    FacturacionRepository.downloadProforma(row.contratos[0]?.id)
      .then(res => {
        // const fileName = getFileNameHeaders(res.headers);
        downloadPdfAxios(res.data, `Facturacion-Proforma-${row.numeroSecuenciaFacturacion}.pdf`);
      })
      .catch(async error => {
        if (!error.response) {
          console.log('Error desconocido:');
          console.log(error);
        } else {
          const response = await blobToJSON(error.response.data);
          console.log('Error blob:');
          console.log(response);
        }
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
              label='Número Cálculo de Facturación'
              name='numeroSecuenciaFacturacion'
              type='number'
            />
          </Col>
          <Col md={3}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
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
  //       // transitionDuration: theme.transitions.duration.standard,
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
          { field: 'numeroSecuenciaFacturacion', headerName: 'Nro. Facturación' },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Facturación',
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
        repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
      />

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)} title='Detalle Facturación'>
        <DetalleFacturacion periodo={periodo} facturacionContratoId={facturacionContratoId} />
      </Modal>
    </>
  );
};

export default withBreadcrumb(FacturacionReporte, FacturacionReporteBreadcrumb);
