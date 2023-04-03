import { useCallback, useContext, forwardRef } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Button, Modal, Row, Col } from '@app/components';

import { FuncionDropdown } from '@domains/funcion/container/FuncionDropdown';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomCreateSchema } from '@domains/procedimiento-custom/container/procedimiento-custom-create/schemas';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import type { ProcedimientoCustomCreateSchemaType } from '@domains/procedimiento-custom/container/procedimiento-custom-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { TextField } from '@mui/material';

import { label } from '@domains/procedimiento-custom/constants';
import { AccionDropdown } from '@domains/accion/container/AccionDropdown';
import { EventoDropdown } from '@domains/evento/container/EventoDropdown';

const ProcedimientoCustomCreate = forwardRef((_, ref) => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoCustomContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoCustomCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoCustomCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProcedimientoCustomCreateSchemaType) => {
      await ProcedimientoCustomRepository.createProcedimientoCustom(data);

      mainDataGrid.reload();
      _navigate('/procedimiento-custom');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-custom');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title={`Nuevo ${label.procedimientoCustom}`}>
      <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
        <Row>
          <Col md={6}>
            <TextField
              id='codigo'
              label='Código'
              {...register('codigo')}
              error={!!formErrors.codigo}
              helperText={formErrors?.codigo?.message}
              disabled={isSubmitting}
              inputRef={ref}
            />
          </Col>
          <Col md={6}>
            <TextField
              id='denominacion'
              label='Denominación'
              {...register('denominacion')}
              error={!!formErrors.denominacion}
              helperText={formErrors?.denominacion?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FuncionDropdown
              id='funcion'
              label='Función'
              {...register('funcionId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.funcionId}
              helperText={formErrors?.funcionId?.message}
              disabled={isSubmitting}
              value={watch('funcionId')}
            />
          </Col>
          <Col md={6}>
            <EventoDropdown
              id='evento'
              label='Evento'
              {...register('eventoId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.eventoId}
              helperText={formErrors?.eventoId?.message}
              disabled={isSubmitting}
              value={watch('eventoId')}
            />
          </Col>
        </Row>
        <Row>
        <Col md={6}>
            <AccionDropdown
              id='accion'
              label='Acción'
              {...register('accionId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.accionId}
              helperText={formErrors?.accionId?.message}
              disabled={isSubmitting}
              value={watch('accionId')}
            />
          </Col>
          <Col md={6}>
            <EventoDropdown
              id='eventoCampo'
              label='Campo'
              {...register('eventoCampoId', {
                valueAsNumber: true,
              })}
              error={!!formErrors.eventoCampoId}
              helperText={formErrors?.eventoCampoId?.message}
              disabled={isSubmitting}
              value={watch('eventoCampoId')}
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
});

export default ProcedimientoCustomCreate;
