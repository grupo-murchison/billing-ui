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

const ContratoEdit = () => {
  const { contratoId } = useParams(); // TODO ver como tipar como number
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [isDiaFijoPosteriorAlPeriodo, setIsDiaFijoPosteriorAlPeriodo] = useState<boolean>(false);
  const [backUpModeloAcuerdo, setBackUpModeloAcuerdo] = useState<AnyValue>(null);

  const {
    reset,
    handleSubmit,
    watch,
    control,
    resetField,
    formState: { errors: formErrors, isSubmitting, dirtyFields },
  } = useForm<FormDataContratoEditType>({
    defaultValues: {
      clienteId: '',
      descripcion: '',
      diaPeriodo: '',
      fechaInicioContrato: null,
      fechaFinContrato: null,
      modeloAcuerdoId: '',
      reglaFechaPeriodoId: '',
      pausado: false,
      sociedadId: '',
      tipoContratoId: '',
      tipoPlanFacturacionId: '',
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
      reset({
        ...data,
        fechaInicioContrato: DateLib.parseFromDBString(
          DateLib.parseToDBString(new Date(data.fechaInicioContrato)) || '',
        ),
        fechaFinContrato: DateLib.parseFromDBString(DateLib.parseToDBString(new Date(data.fechaFinContrato)) || ''),
        tipoPlanFacturacionId: data?.planFacturacion?.tipoPlanFacturacionId,
        reglaFechaPeriodoId: data?.planFacturacion?.reglaFechaPeriodoId,
        diaPeriodo: data?.planFacturacion?.diaPeriodo || '',
        pausado: data?.planFacturacion?.pausado,
        periodos: data?.planFacturacion?.periodos,
        contratoVariables: data?.contratoVariables,
        conceptosAcuerdo: data?.modeloAcuerdo?.conceptosAcuerdo,
      });
      setBackUpModeloAcuerdo(data?.modeloAcuerdo);
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
        {/* <Col md={6}>{cliente && <JsonViewerProvisorio object={cliente} label='Cliente' />}</Col> */}
        {/* <Col md={6}>
          <ClienteDropdown
            control={control}
            id='destinatarioId'
            label='Destinatario'
            // error={!!formErrors.destinatarioId}
            // helperText={formErrors?.destinatarioId?.message}
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
          <FormCheckbox control={control} name='pausado' label='Pausado' />
        </Col>
      </Row>
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

  const interlocutores = <AlertInProgress message='Próximamente, aquí estará sección "Interlocutores".' />;

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

          <DivisorProvisorio label='Datos Generales' />

          <CardContent>
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
          </CardContent>

          {formHeader}

          <DivisorProvisorio label='Datos Contractuales' />

          {datosContractuales}

          <DivisorProvisorio label='Resumen Posiciones/Concepto Acuerdo' />

          <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
            <Box style={{ width: '100%' }}>
              <DataGridConceptoAcuerdo id='conceptosAcuerdo' rows={watch('conceptosAcuerdo')} />
            </Box>
          </Stack>

          <DivisorProvisorio label='Plan Facturación' />

          {planFacturacion}

          <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
            <Box style={{ width: '100%' }}>
              <DataGridPlanFacturacion id='periodos' rows={watch('periodos')} />
            </Box>
          </Stack>

          <DivisorProvisorio label='Variables Contrato' />

          <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
            <Box style={{ width: '100%' }}>
              <DataGridContratoVariables contratoId={contratoId} />
            </Box>
          </Stack>

          <DivisorProvisorio label='Interlocutores' />

          {interlocutores}
        </Form>
      </Card>
    </>
  );
};

export default withBreadcrumb(ContratoEdit, ContratoEditBreadcrumb);
