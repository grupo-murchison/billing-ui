import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Button, Row, Col } from '@app/components';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoCreateSchema } from '@domains/contrato/container/contrato-create/schemas';
import { ContratoContext } from '@domains/contrato/contexts';
import type { ContratoCreateSchemaType } from '@domains/contrato/container/contrato-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { DateLib } from '@libs';

import {
  Divider,
  TextField,
  Chip,
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';
import { TipoPlanFacturacionDropdown } from '@domains/tipo-plan-facturacion/container/tipo-plan-facturacion-dropdown';
import { ReglaFechaPeriodoDropdown } from '@domains/regla-fecha-periodo/container/regla-fecha-periodo-dropdown';

import { ModeloAcuerdoRepository } from '@domains/modelo-acuerdo/repository';
import { TipoContratoRepository } from '@domains/tipo-contrato/repository';
import { ExpandMoreIcon } from '@assets/icons';
import { ClienteRepository } from '@domains/cliente/repository';

const ContratoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const [modeloAcuerdo, setModeloAcuerdo] = useState<JSONObject>({}); // TODO tipar correctamente
  const [tipoContrato, setTipoContrato] = useState<JSONObject>({}); // TODO tipar correctamente
  const [cliente, setCliente] = useState<JSONObject>({}); // TODO tipar correctamente
  const [enableDiaPeriodo, setEnableDiaPeriodo] = useState<boolean>(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ContratoCreateSchemaType>({
    defaultValues: {
      descripcion: '',
      fechaInicioContrato: null,
      fechaFinContrato: null,
    },
    resolver: zodResolver(ContratoCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ContratoCreateSchemaType) => {
      const submitData = {
        ...data,
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
    const diaFijoPosteriorAlperiodoId = 3; // id en la Tabla de base de datos
    const reglaFechaPeriodoId = watch('reglaFechaPeriodoId');
    reglaFechaPeriodoId === diaFijoPosteriorAlperiodoId ? setEnableDiaPeriodo(true) : setEnableDiaPeriodo(false);
  }, [watch('reglaFechaPeriodoId')]);

  return (
    <>
      <Box sx={{ my: '2.5rem' }} />
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Card>
          <CardHeader
            title={
              <Typography variant='h2' component='h2'>
                Nuevo Contrato
              </Typography>
            }
          />

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
              <Col md={6}>{cliente && <JsonViewerProvisorio object={cliente} label='Cliente' />}</Col>
            </Row>
            <Row>
              <Col md={6}>
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
                {modeloAcuerdo && <JsonViewerProvisorio object={modeloAcuerdo} label='Modelo Acuerdo' />}
              </Col>
            </Row>
            <Row>
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
              <Col md={6}>{tipoContrato && <JsonViewerProvisorio object={tipoContrato} label='Tipo Contrato' />}</Col>
            </Row>
          </CardContent>
        </Card>

        <DivisorProvisorio label='Datos Contractuales' />

        <Card>
          <CardContent>
            <Row>
              <Col md={3}>
                <DesktopDatePicker
                  label='Fecha Inicio Contrato'
                  inputFormat='dd-MM-yyyy'
                  value={watch('fechaInicioContrato')}
                  onChange={newValue => setValue('fechaInicioContrato', newValue)}
                  renderInput={params => <TextField {...params} />}
                  disabled={isSubmitting}
                />
              </Col>
              <Col md={3}>
                <DesktopDatePicker
                  label='Fecha Fin Contrato'
                  inputFormat='dd-MM-yyyy'
                  value={watch('fechaFinContrato')}
                  onChange={newValue => setValue('fechaFinContrato', newValue)}
                  renderInput={params => <TextField {...params} />}
                  disabled={isSubmitting}
                />
              </Col>
              <Col md={6}>
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
            </Row>
          </CardContent>
        </Card>

        <DivisorProvisorio label='Plan Facturación' />

        <Card>
          <CardContent>
            <Row>
              <Col md={6}>
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
              <Col md={6}>
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
            </Row>
            <Row>
              {/* // BUG falta pulir, si elijo reglaFechaPeriodoId === 3 por error y luego elijo otro valor, diaPeriodo se deshabilita pero no se limpia el error el Select */}
              <Col md={6}>
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
            <Row>
              <Col md={12} className='d-flex jc-end'>
                <Button color='secondary' outlined disabled={isSubmitting} onClick={handleClose}>
                  Cancelar
                </Button>
                <Button color='primary' type='submit' disabled={isSubmitting}>
                  Crear
                </Button>
              </Col>
            </Row>
          </CardContent>
        </Card>
      </form>
      {/* </Paper> */}
    </>
  );
};

export default ContratoCreate;

const DivisorProvisorio = ({ label, chip }: { label: string; chip?: boolean }) => (
  <Divider sx={{ my: '2rem' }} textAlign='left'>
    {chip ? <Chip label={label} /> : <>{label}</>}
  </Divider>
);

const JsonViewerProvisorio = ({ object, label }: { object: JSONObject; label?: string }) => {
  const keys = Object.keys(object);
  return (
    <>
      {keys.length > 0 && (
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls='panel1a-content' id='panel1a-header'>
            <Typography>{'Datos Crudos' + `${label ? ' - ' + label : ''}`}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ mx: '2.5rem' }}>
              <ul>
                {keys.map((key: string) => (
                  <li key={key}>{`${key}: ${object[key]}`}</li>
                ))}
              </ul>
            </Box>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

type JSONValue = string | number | boolean | JSONObject;

interface JSONObject {
  [key: string]: JSONValue;
}
