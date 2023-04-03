import { useCallback, useContext, useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { FuncionDropdown } from '@domains/funcion/container/FuncionDropdown';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomEditSchema } from '@domains/procedimiento-custom/container/procedimiento-custom-edit/schemas';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import type { ProcedimientoCustomEditSchemaType } from '@domains/procedimiento-custom/container/procedimiento-custom-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button as MuiButton, TextField } from '@mui/material';

import { label } from '@domains/procedimiento-custom/constants';
import { AccionDropdown } from '@domains/accion/container/AccionDropdown';
import { EventoDropdown } from '@domains/evento/container/EventoDropdown';

const ProcedimientoCustomEdit = () => {
  const { id } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoCustomContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoCustomEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoCustomEditSchema),
  });

  useEffect(() => {
    ProcedimientoCustomRepository.getProcedimientoCustomById(id || '').then(({ data }) => {
      reset({
        ...data,
      });
      setIsDataFetched(true);
    });
  }, [id, reset]);

  const handleSubmit = useCallback(
    async (data: ProcedimientoCustomEditSchemaType) => {
      await ProcedimientoCustomRepository.updateProcedimientoCustom(data);

      mainDataGrid.reload();
      _navigate('/procedimiento-custom');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-custom');
  }, [_navigate]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title={`Editar ${label.procedimientoCustom}`}>
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
              value={watch('accionId') || undefined}
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
              value={watch('eventoCampoId') || undefined}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <MuiButton variant='contained' type='submit' disabled={isSubmitting}>
              Actualizar Producto
            </MuiButton>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoCustomEdit;
