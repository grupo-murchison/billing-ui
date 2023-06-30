import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { Row, Col } from '@app/components';
import { DivisorProvisorio } from '@app/components/Divider';
// import { JsonViewerProvisorio } from '@app/components/JsonTree';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoEditSchema } from '@domains/contrato/container/contrato-crud/schemas';
import { ContratoContext } from '@domains/contrato/contexts';
import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';
import { FacturacionEditBreadcrumb } from '@domains/facturacion/constants';
import { TipoPlanFacturacionDropdown } from '@domains/tipo-plan-facturacion/container/tipo-plan-facturacion-dropdown';
import { ReglaFechaPeriodoDropdown } from '@domains/regla-fecha-periodo/container/regla-fecha-periodo-dropdown';

import type { ContratoEditSchemaType } from '@domains/contrato/container/contrato-crud/schemas';

import { withBreadcrumb } from '@app/hocs';

import { DateLib } from '@libs';
// import { CardCrudActions, DataGridPlanFacturacion, DataGridConceptoAcuerdo } from './views';
import { AlertInProgress } from '@app/components/Alerts';
import { DataGridContratoVariables } from '@domains/contrato-variables/DataGridContratoVariables';
import { SociedadDropdown } from '@domains/sociedad/container/cliente-dropdown';

const FacturacionEdit = () => {
  const { contratoId } = useParams(); // TODO ver como tipar como number
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const [enableDiaPeriodo, setEnableDiaPeriodo] = useState<boolean>(false);

  const {
    register,
    reset,
    handleSubmit: rhfHandleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ContratoEditSchemaType>({
    defaultValues: {
      descripcion: '',
      fechaInicioContrato: null,
      fechaFinContrato: null,
    },
    resolver: zodResolver(ContratoEditSchema),
  });

  const handleSubmit = useCallback(
    async (data: ContratoEditSchemaType) => {
      const submitData = {
        ...data,
        fechaInicioContrato: DateLib.parseToDBString(data.fechaInicioContrato),
        fechaFinContrato: DateLib.parseToDBString(data.fechaFinContrato),
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
        diaPeriodo: data?.planFacturacion?.diaPeriodo,
        pausado: data?.planFacturacion?.pausado,
        periodos: data?.planFacturacion?.periodos,
        contratoVariables: data?.contratoVariables,
        conceptosAcuerdo: data?.modeloAcuerdo?.conceptosAcuerdo,
      });
      setIsDataFetched(true);
    });
  }, [contratoId, reset]);

  useEffect(() => {
    if (watch('reglaFechaPeriodoId')) {
      const diaFijoPosteriorAlperiodoId = 3; // FIXME id en la Tabla de base de datos, cambiar por codigo
      const reglaFechaPeriodoId = watch('reglaFechaPeriodoId');
      reglaFechaPeriodoId === diaFijoPosteriorAlperiodoId ? setEnableDiaPeriodo(true) : setEnableDiaPeriodo(false);
    }
  }, [watch('reglaFechaPeriodoId')]);

  if (!isDataFetched) {
    return <></>;
  }

  const formHeader = (
    <CardContent>
      <Row>
        <Col md={6}>
          <ClienteDropdown
            id='clienteId'
            label='Cliente'
            {...register('clienteId', {
              valueAsNumber: true,
            })}
            error={!!formErrors.clienteId}
            helperText={formErrors?.clienteId?.message}
            disabled={isSubmitting}
            value={watch('clienteId')}
          />
        </Col>
        <Col md={6}>
          <SociedadDropdown
            id='sociedadId'
            label='Sociedad'
            {...register('sociedadId', {
              valueAsNumber: true,
            })}
            error={!!formErrors.sociedadId}
            helperText={formErrors?.sociedadId?.message}
            disabled={isSubmitting}
            value={watch('sociedadId')}
          />
        </Col>
      </Row>
      <Row>
        {/* <Col md={6}>{cliente && <JsonViewerProvisorio object={cliente} label='Cliente' />}</Col> */}
        {/* <Col md={6}>
          <ClienteDropdown
            id='destinatarioId'
            label='Destinatario'
            // {...register('destinatarioId', {
            //   valueAsNumber: true,
            // })}
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
          {/* // TODO agregar Notificación con mensaje de de Alerta: Si cambia el Modelo Acuerdo, se eliminarán las variables del contrato y deberá cargar las nuevas manualmente. */}
          <ModeloAcuerdoDropdown
            id='modeloAcuerdoId'
            label='Modelo Acuerdo'
            {...register('modeloAcuerdoId', {
              valueAsNumber: true,
            })}
            error={!!formErrors.modeloAcuerdoId}
            helperText={formErrors?.modeloAcuerdoId?.message}
            disabled={isSubmitting}
            value={watch('modeloAcuerdoId')}
          />
        </Col>
        <Col md={6}>
          <TipoContratoDropdown
            id='tipoContratoId'
            label='Tipo Contrato'
            {...register('tipoContratoId', {
              valueAsNumber: true,
            })}
            error={!!formErrors.tipoContratoId}
            helperText={formErrors?.tipoContratoId?.message}
            disabled={isSubmitting}
            value={watch('tipoContratoId')}
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
          <TextField
            id='descripcion'
            label='Descripción'
            error={!!formErrors.descripcion}
            helperText={formErrors?.descripcion?.message}
            disabled={isSubmitting}
            multiline
            // variant='standard'
            {...register('descripcion')}
          />
        </Col>
        <Col md={6}>
          <DesktopDatePicker
            label='Fecha Inicio Contrato'
            inputFormat='dd-MM-yyyy'
            value={watch('fechaInicioContrato')}
            onChange={newValue => setValue('fechaInicioContrato', newValue)}
            renderInput={params => <TextField {...params} />}
            disabled={isSubmitting}
          />
        </Col>
        <Col md={6}>
          <DesktopDatePicker
            label='Fecha Fin Contrato'
            inputFormat='dd-MM-yyyy'
            value={watch('fechaFinContrato')}
            onChange={newValue => setValue('fechaFinContrato', newValue)}
            renderInput={params => <TextField {...params} />}
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
          <FormGroup sx={{ display: 'flex', alignItems: 'flex-start' }}>
            <FormControlLabel
              id='pausado'
              labelPlacement='start'
              control={<Checkbox />}
              label='Pausado'
              checked={watch('pausado') || false}
              value={watch('pausado')}
            />
          </FormGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <TipoPlanFacturacionDropdown
            id='tipoPlanFacturacionId'
            label='Tipo Plan Facturación'
            {...register('tipoPlanFacturacionId', {
              valueAsNumber: true,
            })}
            error={!!formErrors.tipoPlanFacturacionId}
            helperText={formErrors?.tipoPlanFacturacionId?.message}
            disabled={isSubmitting}
            value={watch('tipoPlanFacturacionId')}
          />
        </Col>
        <Col md={4}>
          <ReglaFechaPeriodoDropdown
            id='reglaFechaPeriodoId'
            label='Regla Fecha Periodo'
            {...register('reglaFechaPeriodoId', {
              valueAsNumber: true,
            })}
            error={!!formErrors.reglaFechaPeriodoId}
            helperText={formErrors?.reglaFechaPeriodoId?.message}
            disabled={isSubmitting}
            value={watch('reglaFechaPeriodoId')}
          />
        </Col>

        <Col md={4}>
          {/* // BUG falta pulir, si elijo reglaFechaPeriodoId === 3 por error y luego elijo otro valor, diaPeriodo se deshabilita pero no se limpia el error el Select */}
          <TextField
            id='diaPeriodo'
            label='Día Periodo'
            error={!!formErrors.diaPeriodo}
            helperText={formErrors?.diaPeriodo?.message}
            disabled={isSubmitting || !enableDiaPeriodo}
            type='number'
            {...register('diaPeriodo', {
              valueAsNumber: true,
            })}
          />
        </Col>
      </Row>
    </CardContent>
  );

  const interlocutores = <AlertInProgress message='Próximamente, aquí estará sección "Interlocutores".' />;

  return (
    <>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Card sx={{ p: 3 }}>
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
                <TextField
                  id='nroContrato'
                  label='Nro. Contrato'
                  InputProps={{ readOnly: true }}
                  type='string'
                  {...register('nroContrato', {
                    //  valueAsNumber: true,
                  })}
                />
              </Col>
            </Row>
          </CardContent>

          {formHeader}

          <DivisorProvisorio label='Datos Contractuales' />

          {datosContractuales}

          <DivisorProvisorio label='Resumen Posiciones/Concepto Acuerdo' />

          <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
            {/* // TODO falta tipar en zod conceptosAcuerdo (schema) */}
            {/* <DataGridConceptoAcuerdo id='conceptosAcuerdo' rows={watch('conceptosAcuerdo')} /> */}
          </Stack>

          <DivisorProvisorio label='Plan Facturación' />

          {planFacturacion}
          <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
            {/* <DataGridPlanFacturacion id='periodos' rows={watch('periodos')} /> */}
          </Stack>

          <DivisorProvisorio label='Variables Contrato' />
          <Stack direction='row' justifyContent='center' alignItems='center' m={2}>
            <DataGridContratoVariables contratoId={contratoId} />
          </Stack>

          <DivisorProvisorio label='Interlocutores' />

          {interlocutores}

          {/* <CardCrudActions labelSubmitButton='Guardar' isSubmitting={isSubmitting} handleClose={handleClose} /> */}
        </Card>
      </form>
    </>
  );
};

export default withBreadcrumb(FacturacionEdit, FacturacionEditBreadcrumb);