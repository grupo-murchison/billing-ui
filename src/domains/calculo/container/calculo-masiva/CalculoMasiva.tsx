import { useCallback, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import { Paper, Typography, Box } from '@mui/material';

import { Col, Row } from '@app/components';

import { withBreadcrumb } from '@app/hocs';

import { CalculoRepository } from '@domains/calculo/repository';
import { CalculoFacturacionMasivaBreadcrumb } from '@domains/calculo/constants';

import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDatePicker';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import { ToastDeprecated as Toast } from '@app/components/Toast/Toast';

import { DateLib } from '@libs';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';
import {
  // ValidationSchemaCalculoFacturacionMasiva,
  FormDataTypeCalculoFacturacionMasiva,
} from '@domains/calculo/repository/calculo.schemas';
import HelperTooltip from '@app/components/Tooltips/HelperTooltip';
// import { zodResolver } from '@hookform/resolvers/zod';

const sinMensajesLogOkHelperText =
  'Si está activado, evita insertar datos o entradas innecesarias. No se registran en el Log los mensajes de finalización exitosa pero si los mensajes de error si esto sucediera.';
const sinMensajesLogInfoHelperText =
  'Si está activado, evita insertar datos o entradas innecesarias. No se registran en el Log los mensajes de información, por ejemplo la información sobre los distintos cálculos de servicios.';

const CalculoMasiva = () => {
  const [openToast, setOpenToast] = useState(false);
  const [errorFromBackEnd, setErrorFromBackEnd] = useState(false);
  const [toastMessage, setToastMessage] = useState('Datos enviados');

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormDataTypeCalculoFacturacionMasiva>({
    defaultValues: {
      fechaHastaCalculo: new Date(),
      sociedadId: '',
      sinMensajesLogOk: false,
      sinMensajesLogInfo: false,
    },
    // resolver: zodResolver(ValidationSchemaCalculoFacturacionMasiva),
  });

  const handleCloseToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenToast(false);
  };

  const onSubmit: SubmitHandler<FormDataTypeCalculoFacturacionMasiva> = useCallback(async data => {
    const filters = {
      sociedadId: data.sociedadId !== '' ? data.sociedadId : undefined,
      fechaHastaCalculo: data.fechaHastaCalculo && DateLib.parseToDBString(data.fechaHastaCalculo as Date),
      sinMensajesLogOk: data.sinMensajesLogOk,
      sinMensajesLogInfo: data.sinMensajesLogInfo,
    };

    CalculoRepository.calculoFacturacionMasiva(filters)
      .then(({ data }) => {
        setToastMessage(data);
      })
      .catch(error => {
        setErrorFromBackEnd(true);
        setToastMessage(error?.message || 'Ocurrió un error!');
      })
      .finally(() => {
        setOpenToast(true);
      });
  }, []);

  const toolbar = (
    <Paper sx={{ px: 3, pt: 4, pb: 2, my: 2 }}>
      <Form onSubmit={handleSubmit(onSubmit)} label='Ejecutar' isSubmitting={isSubmitting}>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              label='Calcular Hasta Fecha'
              name='fechaHastaCalculo'
              disabled={isSubmitting}
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
              disabled={isSubmitting}
              emptyOption
            />
          </Col>
        </Row>

        <Box my={3}>
          <Typography variant='h6' component='div'>
            Mensajes de Log
          </Typography>
        </Box>
        <Row>
          <Col md={12}>
            <Box>
              <FormCheckbox
                control={control}
                disabled={isSubmitting}
                label='Desactivar mensajes de conclusión exitosa'
                labelPlacement='end'
                name='sinMensajesLogOk'
              />
              <HelperTooltip title={sinMensajesLogOkHelperText} />
            </Box>
            <Box>
              <FormCheckbox
                control={control}
                disabled={isSubmitting}
                label='Desactivar mensajes de información'
                labelPlacement='end'
                name='sinMensajesLogInfo'
              />
              <HelperTooltip title={sinMensajesLogInfoHelperText} />
            </Box>
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

export default withBreadcrumb(CalculoMasiva, CalculoFacturacionMasivaBreadcrumb);
