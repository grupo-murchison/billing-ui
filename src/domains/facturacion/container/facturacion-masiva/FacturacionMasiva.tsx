import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Alert, Checkbox, FormControlLabel, FormGroup, Paper, Snackbar, Typography, Box } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { FacturacionRepository } from '@domains/facturacion/repository';
import { FacturacionMasivaBreadcrumb } from '@domains/facturacion/constants';

import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { DateLib } from '@libs';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';
import { FacturacionMasivaSchema } from '@domains/facturacion/repository/facturacion.schemas';
import Toast from '@app/components/Toast/Toast';

const FacturacionMasiva = () => {
  const [openToast, setOpenToast] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [toastMessage, setToastMessage] = useState('Datos enviados');

  const {
    control,
    handleSubmit,
    formState: { errors: formErrors, isSubmitting },
    watch,
    setValue,
  } = useForm<FacturacionMasivaSchema>({
    defaultValues: {
      fechaHastaFacturacion: new Date(),
      sociedadId: 0,
      sinMensajesLogOk: false,
      sinMensajesLogInfo: false,
    },
  });

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const onSubmit: SubmitHandler<any> = useCallback(async data => {
    const filters: FacturacionMasivaSchema = {
      sociedadId: data.sociedadId ? data.sociedadId : undefined,
      fechaHastaFacturacion: data.fechaHastaFacturacion && DateLib.parseToDBString(data.fechaHastaFacturacion),
      sinMensajesLogOk: data.sinMensajesLogOk,
      sinMensajesLogInfo: data.sinMensajesLogInfo,
    };

    FacturacionRepository.facturacionMasiva(filters)
      .then(({ data }) => {
        setOpenToast(true);
        setToastMessage(data);
      })
      .catch(error => {
        setErrorFromBackEnd(true);
        setToastMessage('Ocurrió un error!');
      });
  }, []);

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='Ejecutar' isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Fecha de Facturación - calcular hasta'
              name='fechaHastaFacturacion'
              disabled={isSubmitting}
              error={!!formErrors.fechaHastaFacturacion}
            />
          </Col>
        </Row>
        <Box my={3}>
          <Typography variant='h6' component='div'>
            Parámetros de selección
          </Typography>
        </Box>

        <Row>
          <Col md={6}>
            <SociedadDropdown
              control={control}
              name='sociedadId'
              label='Sociedad'
              error={!!formErrors.sociedadId}
              disabled={isSubmitting}
              emptyOption
            />
          </Col>
        </Row>

        <Box my={3}>
          <Typography variant='h6' component='div'>
            Log
          </Typography>
        </Box>
        <Row>
          <Col md={12}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch('sinMensajesLogOk')}
                    onChange={() => setValue('sinMensajesLogOk', !watch('sinMensajesLogOk'))}
                  />
                }
                label='Log sin mensaje de conclusión exitosa'
                disabled={isSubmitting}
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={watch('sinMensajesLogInfo')}
                    onChange={() => setValue('sinMensajesLogInfo', !watch('sinMensajesLogInfo'))}
                  />
                }
                label='Log sin mensaje de información'
                disabled={isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Paper>
  );

  return (
    <>
      {toolbar}
      <Toast open={openToast} message={toastMessage} error={errorFromBackEnd} onClose={handleCloseToast} />
    </>
  );
};

export default withBreadcrumb(FacturacionMasiva, FacturacionMasivaBreadcrumb);
