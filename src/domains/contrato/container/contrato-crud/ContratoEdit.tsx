import { useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';

import { Card, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { Row, Col, Button } from '@app/components';
import { DivisorProvisorio } from '@app/components/Divider';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoEditSchema } from '@domains/contrato/container/contrato-crud/schemas';
import { ContratoContext } from '@domains/contrato/contexts';
import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';
import { ContratoEditBreadcrumb } from '@domains/contrato/constants';

import type { ContratoEditSchemaType } from '@domains/contrato/container/contrato-crud/schemas';

import { withBreadcrumb } from '@app/hocs';

import { DateLib } from '@libs';

const ContratoEdit = () => {
  const { contratoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

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
    ContratoRepository.getContratoById(contratoId || '').then(({ data }) => {
      reset({
        ...data,
        fechaInicioContrato: DateLib.parseFromDBString(
          DateLib.parseToDBString(new Date(data.fechaInicioContrato)) || '',
        ),
        fechaFinContrato: DateLib.parseFromDBString(DateLib.parseToDBString(new Date(data.fechaFinContrato)) || ''),
      });
      setIsDataFetched(true);
    });
  }, [contratoId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  const actions = (
    <CardContent>
      <Row>
        <Col md={12} className='d-flex jc-end'>
          <Button color='secondary' outlined disabled={isSubmitting} onClick={handleClose}>
            Cancelar
          </Button>

          <Button color='primary' type='submit' disabled={isSubmitting}>
            Guardar
          </Button>
        </Col>
      </Row>
    </CardContent>
  );

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
          <Row>
            <Col md={6}>
              <ModeloAcuerdoDropdown
                id='modeloAcuerdo'
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
          <Row>
            <Col md={12}>
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
          </Row>

          <DivisorProvisorio label='Datos Contractuales' />

          <Row>
            <Col md={12}>
              <TextField
                id='descripcion'
                label='Descripción'
                error={!!formErrors.descripcion}
                helperText={formErrors?.descripcion?.message}
                disabled={isSubmitting}
                {...register('descripcion')}
              />
            </Col>
          </Row>
          <Row>
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

          <DivisorProvisorio label='Plan Facturación' />

          {actions}
        </Card>
      </form>
    </>
  );
};

export default withBreadcrumb(ContratoEdit, ContratoEditBreadcrumb);
