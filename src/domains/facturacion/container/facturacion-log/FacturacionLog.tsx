import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert, Checkbox, FormControlLabel, FormGroup, Paper, Snackbar } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionLogBreadcrumb } from '@domains/facturacion/constants';

import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';
import {
  FacturacionMasivaLogSchema,
  FacturacionMasivaSchema,
} from '@domains/facturacion/repository/facturacion.schemas';
import { ClienteDropdownAutoComplete } from '@domains/cliente/container/cliente-dropdown';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const FacturacionLog = () => {
  const [openSackbar, setOpenSackbar] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('Datos enviados');

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    watch,
    setValue,
  } = useForm<FacturacionMasivaLogSchema>({
    defaultValues: {
      numeroSecuenciaFacturacion: undefined,
      nroContrato: undefined,
      clienteId: undefined,
      cantidad: undefined,
      fechaDesde: undefined,
      fechaHasta: undefined,
    },
  });

  const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSackbar(false);
  };

  const onSubmit: SubmitHandler<any> = useCallback(async data => {
    // const filters: FacturacionMasivaSchema = {
    //   sociedadId: data.sociedadId ? data.sociedadId : undefined,
    //   fechaHastaFacturacion: data.fechaHastaFacturacion && DateLib.parseToDBString(data.fechaHastaFacturacion),
    //   sinMensajesLogOk: data.sinMensajesLogOk,
    //   sinMensajesLogInfo: data.sinMensajesLogInfo,
    // };
    // console.log('filters', filters);
    // FacturacionRepository.facturacionMasiva(filters)
    //   .then(({ data }) => {
    //     setOpenSackbar(true);
    //     setSnackbarMessage(data);
    //   })
    //   .catch(error => {
    //     setErrorFromBackEnd(true);
    //     setSnackbarMessage('Ocurrió un error!');
    //   });
  }, []);

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='search' isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Número Cálculo de Facturación'
              name='numeroSecuenciaFacturacion'
              type='number'
              error={!!formErrors.numeroSecuenciaFacturacion}
            />
          </Col>
          <Col md={6}>
            <FormTextField control={control} label='Número de Contrato' name='nroContrato' type='number' />
          </Col>
        </Row>
        <Row>
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
          <Col md={6}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              label='Cantidad'
              name='cantidad'
              type='number'
              error={!!formErrors.cantidad}
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
              // error={!!formErrors.fechaDesde}
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
      <Snackbar
        open={openSackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          severity={errorFromBackEnd ? 'error' : 'success'}
          variant='filled'
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default withBreadcrumb(FacturacionLog, FacturacionLogBreadcrumb);
