import { useCallback, useContext, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Box, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material';

import { Row, Col } from '@app/components';
import { AlertInProgress } from '@app/components/Alerts';
// import { JsonViewerProvisorio } from '@app/components/JsonTree';
import { DivisorProvisorio } from '@app/components/Divider';

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
import { DataGridContratoVariables } from '@domains/contrato-variables/DataGridContratoVariables';
import { SociedadDropdown } from '@domains/sociedad/container/sociedad-dropdown';

import { DataGridPlanFacturacion, DataGridConceptoAcuerdo } from './views';
import Form from '@app/components/Form/Form';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';

import { zodLocale } from '@app/utils/zod.util';
import { findPropertyById } from '@app/utils/formHelpers.util';
import { useConfirmDialog } from '@app/hooks';
import TabLayout from '@app/components/Tabs/TabLayout';

const ContratoEdit = () => {
  const { contratoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [isDiaFijoPosteriorAlPeriodo, setIsDiaFijoPosteriorAlPeriodo] = useState<boolean>(false);
  const [backUpModeloAcuerdo, setBackUpModeloAcuerdo] = useState<AnyValue>(null);
  const [periodos, setPeriodos] = useState<AnyValue>(null);

  const {
    reset,
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { isSubmitting, dirtyFields, errors: formErrors },
  } = useForm<FormDataContratoEditType>({
    defaultValues: {
      clienteId: '',
      descripcion: '',
      diaPeriodo: '',
      fechaInicioContrato: null,
      fechaFinContrato: null,
      modeloAcuerdoId: '',
      nroContrato: '',
      reglaFechaPeriodoId: '',
      pausado: false,
      sociedadId: '',
      tipoContratoId: '',
      tipoPlanFacturacionId: '',
      // contratoVariables: [],
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
      }),
    ),
  });


  const onSubmit: SubmitHandler<FormDataContratoEditType> = useCallback(
    async data => {
      const submitData = {
        ...data,
        diaPeriodo: data.diaPeriodo ? data.diaPeriodo : undefined,
        fechaInicioContrato: DateLib.parseToDBString(data.fechaInicioContrato),
        fechaFinContrato: DateLib.parseToDBString(data.fechaFinContrato),
        id: contratoId,
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
        fechaInicioContrato: DateLib.parseFromDBString(
          DateLib.parseToDBString(new Date(contrato.fechaInicioContrato)) || '',
        ),
        fechaFinContrato: DateLib.parseFromDBString(DateLib.parseToDBString(new Date(contrato.fechaFinContrato)) || ''),
        tipoPlanFacturacionId: planFacturacion?.tipoPlanFacturacionId,
        reglaFechaPeriodoId: planFacturacion?.reglaFechaPeriodoId,
        diaPeriodo: planFacturacion?.diaPeriodo || '',
        pausado: planFacturacion?.pausado,
        // contratoVariables: contrato.contratoVariables,
      });
      setPeriodos(planFacturacion?.periodos);
      setBackUpModeloAcuerdo(modeloAcuerdo);
      setIsDataFetched(true);
    });
  }, [contratoId, reset]);

  useEffect(() => {
    resetField('diaPeriodo');
  }, [watch('reglaFechaPeriodoId')]);

  useEffect(() => {
    if (dirtyFields.modeloAcuerdoId && watch('modeloAcuerdoId') !== backUpModeloAcuerdo?.id) {
      confirmDialog.open({
        type: 'warning',
        title: 'Advertencia',
        message: `Si cambia el modelo acuerdo "${backUpModeloAcuerdo.codigo} - ${backUpModeloAcuerdo.descripcion}" por uno distinto, al guardar los cambios se eliminarán las variables del contrato y deberá volver a cargarlas manualmente.`,
        onClickYes: () => {
          confirmDialog.close();
        },
        onClickNot() {
          resetField('modeloAcuerdoId', { defaultValue: backUpModeloAcuerdo?.id });
          confirmDialog.close();
        },
      });
    }
  }, [watch('modeloAcuerdoId')]);

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
      <Row>
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
      </Row>
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
          <FormDesktopDatePicker
            control={control}
            disabled={isSubmitting}
            label='Fecha Inicio Contrato'
            name='fechaInicioContrato'
            readOnly
          />
        </Col>
        <Col md={6}>
          <FormDesktopDatePicker
            control={control}
            disabled={isSubmitting}
            label='Fecha Fin Contrato'
            name='fechaFinContrato'
            readOnly
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
  )

  const varContr = (
    <>
      <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
          <Box style={{ width: '100%' }}>
            <DataGridContratoVariables contratoId={contratoId} />
        </Box>
      </Stack>
    </>
  )
  const resumenPosicion = (
    <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
    <Box style={{ width: '100%' }}>
      <DataGridConceptoAcuerdo rows={backUpModeloAcuerdo?.conceptosAcuerdo || []} />
    </Box></Stack>
  )

// funcion que devuelve boolean si contiene o no error
  const handleIsError = (
      formFields: AnyValue,
      formErrors: AnyValue
    ) => {
    const keysOfErrors = Object.keys(formErrors)
    const auxilarArray = []

    for (const fieldOfForm of formFields) {
      const hasError = keysOfErrors.includes(fieldOfForm)
      auxilarArray.push(hasError)
    }
    const result = auxilarArray.filter((el) => el == true)
    return result.length > 0 ? true : false
  }

  const datosGeneralesIsError = [ 'clienteId',  'sociedadId',  'modeloAcuerdoId', 'tipoContratoId']
  const datosContractualesFields = [ 'descripcion',  'fechaInicioContrato',  'fechaFinContrato']
  const planFacturacionFields = [ 'pausado' ]

  const tabLayoutOptions = [
    {label:'Datos Generales', renderelement: formHeader, isError:handleIsError(datosGeneralesIsError, formErrors) },
    {label:'Datos Contractuales', renderelement: datosContractuales, isError:handleIsError(datosContractualesFields, formErrors)},
    {label:'Resumen Posiciones/Concepto Acuerdo', renderelement: resumenPosicion},
    {label:'Plan Facturación', renderelement: planFac, isError:handleIsError(planFacturacionFields, formErrors)},
    {label:'Variables Contrato', renderelement: varContr},
    {label:'Interlocutores', renderelement: interlocutores, disabled:true},
  ]

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
    </>
  );
};

export default withBreadcrumb(ContratoEdit, ContratoEditBreadcrumb);
