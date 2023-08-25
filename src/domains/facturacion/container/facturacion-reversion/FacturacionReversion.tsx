import { useCallback, useContext, useEffect, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Backdrop, Paper } from '@mui/material';
import { GridActionsCellItem } from '@mui/x-data-grid';

import { Col, Row } from '@app/components';
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

import { CancelScheduleSendIcon, RestoreIcon } from '@assets/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { FacturacionReversionCreateSchema } from '@domains/facturacion/schemas';

const FacturacionReversion = () => {
  // const _navigate = useNavigate();

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Se inicia el procesamiento!');

  const { mainDataGrid } = useContext(FacturacionReporteContext);

  useEffect(() => {
    mainDataGrid.load();
  }, [mainDataGrid]);

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
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
        clienteId: data.clienteId ? data.clienteId.value : undefined,
        fechaDesde: data.fechaDesde ? DateLib.parseToDBString(data.fechaDesde) : undefined,
        fechaHasta: data.fechaHasta ? DateLib.parseToDBString(data.fechaHasta) : undefined,
        nroContrato: data.nroContrato ? data.nroContrato : undefined,
        numeroSecuenciaFacturacion: data.numeroSecuenciaFacturacion ? data.numeroSecuenciaFacturacion : undefined,
      };

      mainDataGrid.load({ fixedFilters: { ...filters } });
    },
    [mainDataGrid],
  );

  const handleRevertir = (row: AnyValue) => {
    const cantidadContratos = 10;
    const numeroFacturacion = 10;

    // TODO mostrar un diálogo de confirmacion con el siguiente mensaje
    console.log(
      `Se procederá a realizar la reversión de ${cantidadContratos} contrato/s asociados al número de facturación: ${numeroFacturacion}`,
    );

    setOpenBackdrop(true);

    FacturacionRepository.revertirFacturacion(row.contratos[0]?.id)
      .then(_response => {
        setOpenSackbar(true);
        setSnackbarMessage('La funcionalidad "Revertir" aún no está disponible.');
      })
      .catch(error => {
        console.log('Revertir Error', error);
        setErrorFromBackEnd(true);
        setSnackbarMessage('Ocurrió un error!');
      })
      .finally(() => setOpenBackdrop(false));
  };

  const handleAnular = (row: AnyValue) => {
    setOpenBackdrop(true);

    FacturacionRepository.anularFacturacion(row.contratos[0]?.id)
      .then(_response => {
        setOpenSackbar(true);
        setSnackbarMessage('La funcionalidad "Anular" aún no está disponible.');
      })
      .catch(error => {
        console.log('Anular Error', error);
        setErrorFromBackEnd(true);
        setSnackbarMessage('Ocurrió un error!');
      })
      .finally(() => setOpenBackdrop(false));
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
            <ClienteDropdownAutoComplete
              control={control}
              disabled={isSubmitting}
              label='Cliente'
              name='contrao'
              error={!!formErrors.clienteId}
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
          { field: 'numeroSecuenciaFacturacion', headerName: 'Nro. Facturación' },
          {
            field: 'fechaEjecucion',
            headerName: 'Fecha Facturación',
            valueGetter: params => DateLib.parseFromDBString(params.value),
            type: 'date',
          },
          {
            field: 'clienteId',
            headerName: 'Nro. Cliente',
            flex: 0.8,
            valueGetter: params => params.row.contratos[0]?.contratoClienteCodigo || '',
          },
          {
            field: 'denominación',
            headerName: 'Denominación',
            valueGetter: params => params.row.contratos[0]?.contratoClienteDescripcion || '',
          },
          {
            field: 'numeroSecuenciaContrato',
            headerName: 'Nro. Contrato',
            flex: 0.9,
            valueGetter: params => params.row.contratos[0]?.contratoNumero || '',
          },
          {
            field: 'contratoDescripcion',
            headerName: 'Descripción Contrato',
            flex: 2,
            valueGetter: params => params.row.contratos[0]?.contratoClienteDescripcion || '',
          },
          {
            field: 'periodo',
            headerName: 'Período',
            valueGetter: params => params.row.contratos[0]?.periodoNumero || '',
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
                key={1}
                icon={<RestoreIcon />}
                label='Revertir'
                onClick={() => handleRevertir(params.row)}
                showInMenu
              />,
              <GridActionsCellItem
                key={2}
                icon={<CancelScheduleSendIcon />}
                label='Anular'
                onClick={() => handleAnular(params.row)}
                showInMenu
              />,
            ],
          },
        ]}
        repositoryFunc={FacturacionRepository.getAllFacturasPaginated}
      />

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
