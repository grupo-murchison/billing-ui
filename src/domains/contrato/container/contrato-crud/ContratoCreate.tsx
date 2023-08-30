import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { TextField, Typography, Card, CardContent, CardHeader } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { Row, Col } from '@app/components';
import { DivisorProvisorio } from '@app/components/Divider';
import { JSONObject, JsonViewerProvisorio } from '@app/components/JsonTree';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoContext } from '@domains/contrato/contexts';

import { ContratoCreateSchema } from '@domains/contrato/container/contrato-crud/schemas';
import type { ContratoCreateSchemaType } from '@domains/contrato/container/contrato-crud/schemas';

import { withBreadcrumb } from '@app/hocs';
import { DateLib } from '@libs';

import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';
import { TipoPlanFacturacionDropdown } from '@domains/tipo-plan-facturacion/container/tipo-plan-facturacion-dropdown';
import { ReglaFechaPeriodoDropdown } from '@domains/regla-fecha-periodo/container/regla-fecha-periodo-dropdown';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { TipoContratoRepository } from '@domains/tipo-contrato/repository';
import { ClienteRepository } from '@domains/cliente/repository';

import { ContratoCreateBreadcrumb } from '@domains/contrato/constants';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

const ContratoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const [modeloAcuerdo, setModeloAcuerdo] = useState<JSONObject>({}); // TODO tipar correctamente
  const [tipoContrato, setTipoContrato] = useState<JSONObject>({}); // TODO tipar correctamente
  const [cliente, setCliente] = useState<JSONObject>({}); // TODO tipar correctamente
  const [enableDiaPeriodo, setEnableDiaPeriodo] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    resetField,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ContratoCreateSchemaType>({
    defaultValues: {
      clienteId: '',
      descripcion: '',
      diaPeriodo: '',
      fechaInicioContrato: null,
      fechaFinContrato: null,
      modeloAcuerdoId: '',
      reglaFechaPeriodoId: '',
      sociedadId: '',
      tipoContratoId: '',
      tipoPlanFacturacionId: '',
    },
    resolver: zodResolver(ContratoCreateSchema),
    // resolver: (data, context, options) => ZodUtils.debugSchema(data, context, options, contratoCreateSchema), // * para debuggear el schema de validación
  });

  const onSubmit: SubmitHandler<ContratoCreateSchemaType> = useCallback(
    async data => {
      const submitData = {
        ...data,
        diaPeriodo: data.diaPeriodo ? data.diaPeriodo : undefined,
        fechaInicioContrato: DateLib.parseToDBString(data.fechaInicioContrato),
        fechaFinContrato: DateLib.parseToDBString(data.fechaFinContrato),
      };

      await ContratoRepository.createContrato(submitData);

      mainDataGrid.reload();
      _navigate('/contrato');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/contrato');
  }, [_navigate]);

  useEffect(() => {
    const modeloAcuerdoId = watch('modeloAcuerdoId');
    modeloAcuerdoId &&
      ModeloAcuerdoRepository.getModeloAcuerdoById(`${modeloAcuerdoId}`).then(response => {
        setModeloAcuerdo(response.data);
      });
  }, [watch('modeloAcuerdoId'), modeloAcuerdo.length]);

  useEffect(() => {
    const tipoContratoId = watch('tipoContratoId');
    tipoContratoId &&
      TipoContratoRepository.getTipoContratoById(`${tipoContratoId}`).then(response => {
        setTipoContrato(response.data);
      });
  }, [watch('tipoContratoId')]);

  useEffect(() => {
    const clienteId = watch('clienteId');
    clienteId &&
      ClienteRepository.getClienteById(`${clienteId}`).then(response => {
        setCliente(response.data);
      });
  }, [watch('clienteId')]);

  useEffect(() => {
    const diaFijoPosteriorAlperiodoId = 3; // FIXME id en la Tabla de base de datos, debemos cambiarlo para validar por el campo code (codigo)
    const reglaFechaPeriodoId = watch('reglaFechaPeriodoId');
    resetField('diaPeriodo');
    reglaFechaPeriodoId === diaFijoPosteriorAlperiodoId ? setEnableDiaPeriodo(true) : setEnableDiaPeriodo(false);
  }, [watch('reglaFechaPeriodoId')]);

  const formHeader = (
    <CardContent>
      <Row>
        <Col md={6}>
          <ClienteDropdown
            name='clienteId'
            label='Cliente'
            control={control}
            error={!!formErrors.clienteId}
            helperText={formErrors?.clienteId?.message}
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <SociedadDropdown
            control={control}
            name='sociedadId'
            label='Sociedad'
            error={!!formErrors.sociedadId}
            helperText={formErrors?.sociedadId?.message}
            disabled={isSubmitting}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>{cliente && <JsonViewerProvisorio object={cliente} label='Cliente' />}</Col>
      </Row>
      <Row>
        <Col md={6}>
          <ModeloAcuerdoDropdown
            control={control}
            name='modeloAcuerdoId'
            label='Modelo Acuerdo'
            error={!!formErrors.modeloAcuerdoId}
            helperText={formErrors?.modeloAcuerdoId?.message}
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <TipoContratoDropdown
            control={control}
            name='tipoContratoId'
            label='Tipo Contrato'
            error={!!formErrors.tipoContratoId}
            helperText={formErrors?.tipoContratoId?.message}
            disabled={isSubmitting}
          />
        </Col>
      </Row>
      <Row>
        <Col md={6}>{modeloAcuerdo && <JsonViewerProvisorio object={modeloAcuerdo} label='Modelo Acuerdo' />}</Col>
        <Col md={6}>{tipoContrato && <JsonViewerProvisorio object={tipoContrato} label='Tipo Contrato' />}</Col>
      </Row>
    </CardContent>
  );

  const datosContractuales = (
    <CardContent>
      <Row>
        <Col md={12}>
          <TextField
            id='descripcion'
            label='Descripción'
            error={!!formErrors.descripcion}
            helperText={formErrors?.descripcion?.message}
            disabled={isSubmitting}
            multiline
            fullWidth
            {...register('descripcion')}
          />
        </Col>
        <Col md={6}>
          <DesktopDatePicker
            label='Fecha Inicio Contrato'
            inputFormat='dd-MM-yyyy'
            value={watch('fechaInicioContrato')}
            onChange={newValue => setValue('fechaInicioContrato', newValue)}
            renderInput={params => <TextField {...params} fullWidth />}
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <DesktopDatePicker
            label='Fecha Fin Contrato'
            inputFormat='dd-MM-yyyy'
            value={watch('fechaFinContrato')}
            onChange={newValue => setValue('fechaFinContrato', newValue)}
            renderInput={params => <TextField {...params} fullWidth />}
            disabled={isSubmitting}
          />
        </Col>
      </Row>
    </CardContent>
  );

  const planFacturacion = (
    <CardContent>
      <Row>
        <Col md={4}>
          <TipoPlanFacturacionDropdown
            control={control}
            name='tipoPlanFacturacionId'
            label='Tipo Plan Facturación'
            error={!!formErrors.tipoPlanFacturacionId}
            helperText={formErrors?.tipoPlanFacturacionId?.message}
            disabled={isSubmitting}
          />
        </Col>
        <Col md={4}>
          <ReglaFechaPeriodoDropdown
            control={control}
            name='reglaFechaPeriodoId'
            label='Regla Fecha Periodo'
            error={!!formErrors.reglaFechaPeriodoId}
            helperText={formErrors?.reglaFechaPeriodoId?.message}
            disabled={isSubmitting}
          />
        </Col>

        <Col md={4}>
          <FormTextField
            name='diaPeriodo'
            control={control}
            label='Día Periodo'
            disabled={isSubmitting || !enableDiaPeriodo}
            type='number'
            inputProps={{ min: 1 }}
          />
        </Col>
      </Row>
    </CardContent>
  );

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
          <CardHeader
            title={
              <Typography variant='h2' component='h2'>
                Nuevo Contrato
              </Typography>
            }
          />

          <DivisorProvisorio label='Datos Generales' />

          {formHeader}

          <DivisorProvisorio label='Datos Contractuales' />

          {datosContractuales}

          <DivisorProvisorio label='Plan Facturación' />

          {planFacturacion}
        </Form>
      </Card>
    </>
  );
};

export default withBreadcrumb(ContratoCreate, ContratoCreateBreadcrumb);
