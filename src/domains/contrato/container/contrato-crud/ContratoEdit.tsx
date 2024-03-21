import { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

import { Row, Col } from '@app/components';
import { AlertInProgress } from '@app/components/Alerts';
// import { JsonViewerProvisorio } from '@app/components/JsonTree';

import { ContratoRepository } from '@domains/contrato/repository';

import { ContratoContext } from '@domains/contrato/contexts';

import { ValidationSchemaContratoEdit } from '@domains/contrato/container/contrato-crud/schemas';
import type { FormDataContratoEditType } from '@domains/contrato/container/contrato-crud/schemas';

import { withBreadcrumb } from '@app/hocs';
import { DateLib } from '@libs';

import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';
import { ContratoEditBreadcrumb } from '@domains/contrato/constants';
import { TipoPlanFacturacionDropdown } from '@domains/tipo-plan-facturacion/container/tipo-plan-facturacion-dropdown';
import { ReglaFechaPeriodoDropdown } from '@domains/regla-fecha-periodo/container/regla-fecha-periodo-dropdown';
import { ContratoVariablesDataGrid } from '@domains/contrato-variables/ContratoVariablesDataGrid';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';

import { DataGridPlanFacturacion, DataGridConceptoAcuerdo } from './views';
import Form from '@app/components/Form/Form';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDateRangePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDateRangePicker';
import TabLayout from '@app/components/Tabs/TabLayout';
import Toast from '@app/components/Toast/Toast';

import { zodLocale } from '@app/utils/zod.util';
import { findPropertyById } from '@app/utils/formHelpers.util';
import { useConfirmDialog } from '@app/hooks';

const ContratoEdit = () => {
  const { contratoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [isDiaFijoPosteriorAlPeriodo, setIsDiaFijoPosteriorAlPeriodo] = useState<boolean>(false);
  const [originalModeloAcuerdo, setOriginalModeloAcuerdo] = useState<AnyValue>(null);
  const [periodos, setPeriodos] = useState<AnyValue>(null);
  const [contratoVariables, setContratoVariables] = useState<AnyValue>([]);
  const [openToast, setOpenToast] = useState<boolean>(false);

  const {
    reset,
    handleSubmit,
    watch,
    control,
    resetField,
    setValue,
    formState: { isSubmitting, dirtyFields, errors: formErrors },
  } = useForm<FormDataContratoEditType>({
    defaultValues: {
      clienteId: '',
      descripcion: '',
      diaPeriodo: '',
      fechaInicioFinContrato: [],
      modeloAcuerdoId: '',
      nroContrato: '',
      reglaFechaPeriodoId: '',
      pausado: false,
      sociedadId: '',
      tipoContratoId: '',
      tipoPlanFacturacionId: '',
      contratoVariables: [{ id: 0, codigo: '', valor: '' }], // TODO Requeridas solo si tipoProcedimientoQ.codigo === BUILT_IN, esto se debe mirar desde modelo acuerdo. Si se cambia Modelo Acuerdo, se eliminarán las variables y si corresponde se generarán nuevas.
    },
    resolver: zodResolver(
      ValidationSchemaContratoEdit.superRefine((fields, ctx) => {
        if (isDiaFijoPosteriorAlPeriodo && fields.diaPeriodo === '') {
          ctx.addIssue({
            message: zodLocale.required_error,
            code: 'custom',
            path: ['diaPeriodo'],
          });
        }

        // if (tipoProcedimientoQ.codigo === BUILT_IN) {
        //   ctx.addIssue({
        //     message: zodLocale.required_error,
        //     code: 'custom',
        //     path: ['contratoVariables'],
        //   });
        // }
      }),
    ),
  });

  const onSubmit: SubmitHandler<FormDataContratoEditType> = useCallback(
    async data => {
      const submitData = {
        ...data,
        diaPeriodo: data.diaPeriodo ? data.diaPeriodo : undefined,
        fechaInicioContrato:
          data.fechaInicioFinContrato &&
          data.fechaInicioFinContrato[0] &&
          DateLib.parseToDBString(data.fechaInicioFinContrato[0]),
        fechaFinContrato:
          data.fechaInicioFinContrato &&
          data.fechaInicioFinContrato[1] &&
          DateLib.parseToDBString(data.fechaInicioFinContrato[1]),
        id: contratoId,
        listaVariables: data?.contratoVariables || undefined,
      };

      await ContratoRepository.updateContrato(submitData);

      mainDataGrid.reload();
      _navigate('/contrato');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/contrato');
  }, [_navigate]);

  useEffect(() => {
    ContratoRepository.getContratoByIdAndContratoVariables(contratoId || '').then(({ data }) => {
      const { planFacturacion, modeloAcuerdo, ...contrato } = data;
      reset({
        clienteId: contrato?.clienteId,
        descripcion: contrato?.descripcion,
        modeloAcuerdoId: contrato?.modeloAcuerdoId,
        nroContrato: contrato?.nroContrato,
        sociedadId: contrato?.sociedadId,
        tipoContratoId: contrato?.tipoContratoId,
        fechaInicioFinContrato: [
          DateLib.parseFromDBString(DateLib.parseToDBString(new Date(contrato.fechaInicioContrato)) || ''),
          DateLib.parseFromDBString(DateLib.parseToDBString(new Date(contrato.fechaFinContrato)) || ''),
        ],
        tipoPlanFacturacionId: planFacturacion?.tipoPlanFacturacionId,
        reglaFechaPeriodoId: planFacturacion?.reglaFechaPeriodoId,
        diaPeriodo: planFacturacion?.diaPeriodo || '',
        pausado: planFacturacion?.pausado,
        // contratoVariables: [],
      });

      ContratoRepository.variablesPorContratoProcedimientoQ({ contratoId: contratoId || '' }).then(({ data }) => {
        setValue('contratoVariables', data.data);
        setContratoVariables(data.data);
      });
      setPeriodos(planFacturacion?.periodos);
      setOriginalModeloAcuerdo(modeloAcuerdo);
      setIsDataFetched(true);
    });
  }, [contratoId, reset]);

  useEffect(() => {
    resetField('diaPeriodo');
  }, [watch('reglaFechaPeriodoId')]);

  useEffect(() => {
    if (dirtyFields.modeloAcuerdoId && watch('modeloAcuerdoId') !== originalModeloAcuerdo?.id) {
      confirmDialog.open({
        type: 'warning',
        title: 'Advertencia',
        message: `Si cambia el Modelo Acuerdo "${originalModeloAcuerdo.codigo} - ${originalModeloAcuerdo.descripcion}" por uno distinto, al guardar los cambios se eliminarán las variables del contrato y deberá volver a cargarlas manualmente.`,
        onClickYes: () => {
          confirmDialog.close();
        },
        onClickNot() {
          resetField('modeloAcuerdoId', { defaultValue: originalModeloAcuerdo?.id });
          confirmDialog.close();
        },
      });
    }
  }, [watch('modeloAcuerdoId')]);

  useEffect(() => {
    if (formErrors?.contratoVariables) setOpenToast(true);
  }, [formErrors?.contratoVariables]);

  if (!isDataFetched) {
    return <></>;
  }

  const formHeader = (
    <CardContent>
      {/* <CardContent> */}
      <Row>
        <Col md={4}>
          <FormTextField
            control={control}
            name='nroContrato'
            label='Nro. Contrato'
            InputProps={{ readOnly: true }}
            type='string'
          />
        </Col>
      </Row>
      {/* </CardContent> */}

      <Row>
        <Col md={6}>
          <ClienteDropdown name='clienteId' label='Cliente' control={control} disabled={isSubmitting} />
        </Col>
        <Col md={6}>
          <SociedadDropdown control={control} name='sociedadId' label='Sociedad' disabled={isSubmitting} />
        </Col>
      </Row>
      {/* <Row> */}
      {/* <Col md={6}>{cliente && <JsonViewerProvisorio object={cliente} label='Cliente' />}</Col> */}
      {/* <Col md={6}>
          <ClienteDropdown
            control={control}
            id='destinatarioId'
            label='Destinatario'
            // disabled={isSubmitting}
            // value={watch('destinatarioId')}
          />
        </Col> */}
      {/* <Col md={6}>{cliente && <JsonViewerProvisorio object={cliente} label='Cliente' />}</Col> */}
      {/* </Row> */}
      <Row>
        <Col md={6}>
          <ModeloAcuerdoDropdown
            control={control}
            name='modeloAcuerdoId'
            label='Modelo Acuerdo'
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <TipoContratoDropdown control={control} name='tipoContratoId' label='Tipo Contrato' disabled={isSubmitting} />
        </Col>
      </Row>
      {/* <Row>
        <Col md={6}>{modeloAcuerdo && <JsonViewerProvisorio object={modeloAcuerdo} label='Modelo Acuerdo' />}</Col>
        <Col md={6}>{tipoContrato && <JsonViewerProvisorio object={tipoContrato} label='Tipo Contrato' />}</Col>
      </Row> */}
    </CardContent>
  );

  const datosContractuales = (
    <CardContent>
      <Row>
        <Col md={12}>
          <FormTextField control={control} disabled={isSubmitting} name='descripcion' label='Descripción' multiline />
        </Col>
        <Col md={6}>
          <FormDateRangePicker
            control={control}
            label='Fecha Inicio-Fin Contrato'
            name='fechaInicioFinContrato'
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
          {/* TODO reemplzar por el select de estados la pantalla Facturacion, sin emptyOptions */}
          <FormCheckbox control={control} name='pausado' label='Pausado' />
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <TipoPlanFacturacionDropdown
            control={control}
            name='tipoPlanFacturacionId'
            label='Tipo Plan Facturación'
            disabled={isSubmitting}
            readOnly
          />
        </Col>
        <Col md={4}>
          <ReglaFechaPeriodoDropdown
            control={control}
            name='reglaFechaPeriodoId'
            label='Regla Fecha Periodo'
            disabled={isSubmitting}
            getOptions={options => {
              const reglaFechaPeriodoId = watch('reglaFechaPeriodoId');
              if (reglaFechaPeriodoId) {
                const code = findPropertyById(options, reglaFechaPeriodoId)?.code || null;
                code && code === 'FFDFP' ? setIsDiaFijoPosteriorAlPeriodo(true) : setIsDiaFijoPosteriorAlPeriodo(false);
              }
            }}
            readOnly
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
            InputProps={{
              readOnly: true,
            }}
          />
        </Col>
      </Row>
    </CardContent>
  );

  const interlocutores = <AlertInProgress message='Próximamente, aquí estará sección "Interlocutores".' />;

  const planFac = (
    <>
      {planFacturacion}

      <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
        <Box style={{ width: '100%' }}>
          <DataGridPlanFacturacion rows={periodos || []} />
        </Box>
      </Stack>
    </>
  );

  const varContr = (
    <>
      <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
        <Box style={{ width: '100%' }}>
          {/* <DataGridContratoVariables contratoId={contratoId} /> */}
          <ContratoVariablesDataGrid
            name='contratoVariables'
            contratoId={contratoId}
            errors={formErrors}
            rows={contratoVariables}
            setValue={setValue}
          />
        </Box>
      </Stack>
    </>
  );

  const resumenPosicion = (
    <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
      <Box style={{ width: '100%' }}>
        <DataGridConceptoAcuerdo rows={originalModeloAcuerdo?.conceptosAcuerdo || []} />
      </Box>
    </Stack>
  );

  const datosGeneralesIsError = ['clienteId', 'sociedadId', 'modeloAcuerdoId', 'tipoContratoId'];
  const datosContractualesFields = ['descripcion', 'fechaInicioContrato', 'fechaFinContrato'];
  const planFacturacionFields = ['pausado'];

  const tabLayoutOptions = [
    { label: 'Datos Generales', renderelement: formHeader, formFields: datosGeneralesIsError, formErrors: formErrors },
    {
      label: 'Datos Contractuales',
      renderelement: datosContractuales,
      formFields: datosContractualesFields,
      formErrors: formErrors,
    },
    { label: 'Resumen Posiciones/Concepto Acuerdo', renderelement: resumenPosicion },
    { label: 'Plan Facturación', renderelement: planFac, formFields: planFacturacionFields, formErrors: formErrors },
    { label: 'Variables Contrato', renderelement: varContr, formFields: ['contratoVariables'], formErrors: formErrors },
    { label: 'Interlocutores', renderelement: interlocutores, disabled: true },
  ];

  return (
    <>
      <Card sx={{ p: 3 }}>
        <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
          <CardHeader
            title={
              <Typography variant='h2' component='h2'>
                Editar Contrato
              </Typography>
            }
          />
          <TabLayout options={tabLayoutOptions} />
        </Form>
      </Card>

      <Toast
        open={openToast}
        onClose={() => setOpenToast(false)}
        error
        message='Debe cargar todos los valores de las Variables del Contrato'
      />
    </>
  );
};

export default withBreadcrumb(ContratoEdit, ContratoEditBreadcrumb);
