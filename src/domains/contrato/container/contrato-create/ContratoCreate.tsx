import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Button, Modal, Row, Col } from '@app/components';

import { ContratoRepository } from '@domains/contrato/repository';
import { ContratoCreateSchema } from '@domains/contrato/container/contrato-create/schemas';
import { ContratoContext } from '@domains/contrato/contexts';
import type { ContratoCreateSchemaType } from '@domains/contrato/container/contrato-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { DateLib } from '@libs';

import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

import { ClienteDropdown } from '@domains/cliente/container/cliente-dropdown';
import { ModeloAcuerdoDropdown } from '@domains/modelo-acuerdo/container/modelo-acuerdo-dropdown';
import { TipoContratoDropdown } from '@domains/tipo-contrato/container/tipo-contrato-dropdown';

const ContratoCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ContratoContext);

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

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Contrato'>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
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
      </form>
    </Modal>
  );
};

export default ContratoCreate;
