import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Typography, Card, CardContent, CardHeader } from '@mui/material';

import { Row, Col } from '@app/components';
import { DivisorProvisorio } from '@app/components/Divider';
import { JSONObject, JsonViewerProvisorio } from '@app/components/JsonTree';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoContext } from '@domains/contrato/contexts';

import { ValidationSchemaContratoCreate } from '@domains/contrato/container/contrato-crud/schemas';
import type { FormDataTypeContratoCreate } from '@domains/contrato/container/contrato-crud/schemas';

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
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import { zodLocale } from '@app/utils/zod.util';
import { findPropertyById } from '@app/utils/formHelpers.util';

const ContratoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const [modeloAcuerdo, setModeloAcuerdo] = useState<JSONObject>({}); // TODO tipar correctamente
  const [tipoContrato, setTipoContrato] = useState<JSONObject>({}); // TODO tipar correctamente
  const [cliente, setCliente] = useState<JSONObject>({}); // TODO tipar correctamente
  const [isDiaFijoPosteriorAlPeriodo, setIsDiaFijoPosteriorAlPeriodo] = useState<boolean>(false);

  const {
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<FormDataTypeContratoCreate>({
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
    resolver: zodResolver(
      ValidationSchemaContratoCreate.superRefine((fields, ctx) => {
        if (isDiaFijoPosteriorAlPeriodo && fields.diaPeriodo === '') {
          ctx.addIssue({
            message: zodLocale.required_error,
            code: 'custom',
            path: ['diaPeriodo'],
          });
        }
      }),
    ),
    // resolver: (data, context, options) => ZodUtils.debugSchema(data, context, options, contratoCreateSchema), // * para debuggear el schema de validación
  });

  const onSubmit: SubmitHandler<FormDataTypeContratoCreate> = useCallback(
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
    resetField('diaPeriodo');
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
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <SociedadDropdown
            control={control}
            name='sociedadId'
            label='Sociedad'
            error={!!formErrors.sociedadId}
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
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <TipoContratoDropdown
            control={control}
            name='tipoContratoId'
            label='Tipo Contrato'
            error={!!formErrors.tipoContratoId}
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
          <FormTextField control={control} disabled={isSubmitting} name='descripcion' label='Descripción' multiline />
        </Col>
        <Col md={6}>
          <FormDesktopDatePicker
            control={control}
            disabled={isSubmitting}
            label='Fecha Inicio Contrato'
            name='fechaInicioContrato'
          />
        </Col>
        <Col md={6}>
          <FormDesktopDatePicker
            control={control}
            disabled={isSubmitting}
            label='Fecha Fin Contrato'
            name='fechaFinContrato'
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
            disabled={isSubmitting}
          />
        </Col>
        <Col md={4}>
          <ReglaFechaPeriodoDropdown
            control={control}
            name='reglaFechaPeriodoId'
            label='Regla Fecha Periodo'
            error={!!formErrors.reglaFechaPeriodoId}
            disabled={isSubmitting}
            getOptions={options => {
              const reglaFechaPeriodoId = watch('reglaFechaPeriodoId');
              if (reglaFechaPeriodoId) {
                const code = findPropertyById(options, reglaFechaPeriodoId)?.code || null;
                code && code === 'FFDFP' ? setIsDiaFijoPosteriorAlPeriodo(true) : setIsDiaFijoPosteriorAlPeriodo(false);
              }
            }}
          />
        </Col>

        <Col md={4}>
          <FormTextField
            name='diaPeriodo'
            control={control}
            label='Día Periodo'
            disabled={isSubmitting || !isDiaFijoPosteriorAlPeriodo}
            type='number'
            inputProps={{ min: 2 }}
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
