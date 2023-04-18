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

import { Box, TextField } from '@mui/material';

import { label } from '@domains/procedimiento-custom/constants';
import { AccionDropdown } from '@domains/accion/container/AccionDropdown';
import { EventoDropdown } from '@domains/evento/container/EventoDropdown';
import { EventoCampoDropdown } from '@domains/evento-campo/container/EventoCampoDropdown';

const ProcedimientoCustomCreate = forwardRef((_, ref) => {
  const _navigate = useNavigate();

  const { mainDataGrid, state } = useContext(ProcedimientoCustomContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    formState: { errors: formErrors, isSubmitting },
    setValue,
  } = useForm<ProcedimientoCustomCreateSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
      funcionCode: '',
      eventoCode: '',
      eventoCampoCode: '',
      accionCode: '',
      filtroCampoCode: '',
      filtroValue: '',
    },
    resolver: zodResolver(ProcedimientoCustomCreateSchema),
  });

  // const handleSubmit = useCallback(
  //   async (data: ProcedimientoCustomCreateSchemaType) => {
  //     await ProcedimientoCustomRepository.createProcedimientoCustom(data);

  //     mainDataGrid.reload();
  //     _navigate('/procedimiento-custom');
  //   },
  //   [_navigate, mainDataGrid],
  // );

  const handleSubmit = useCallback(
    async (data: ProcedimientoCustomCreateSchemaType) => {
      const { funciones, eventos, eventosCampo, acciones } = state;
      const parseToNull = ({
        funcionCode,
        accionCode,
        eventoCode,
        eventoCampoCode,
        filtroCampoCode,
        filtroValue,
        ...restProps
      }: ProcedimientoCustomCreateSchemaType) => ({
        ...restProps,
        funcionId: funciones.find(({ code }) => code === funcionCode)?.value || null,
        eventoId: eventos.find(({ code }) => code === eventoCode)?.value || null,
        eventoCampoId: eventosCampo.find(({ code }) => code === eventoCampoCode)?.value || null,
        accionId: acciones.find(({ code }) => code === accionCode)?.value || null,
        ...(accionCode === 'FIL'
          ? {
              expresionFiltro: `${filtroCampoCode} = ${filtroValue}`,
              eventoCampoAgrupacionId: null,
            }
          : {
              expresionFiltro: '',
              eventoCampoAgrupacionId: eventosCampo.find(({ code }) => code === filtroCampoCode)?.value || null,
            }),
      });
      const apiPayload = parseToNull(data);
      await ProcedimientoCustomRepository.createProcedimientoCustom(apiPayload);

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
          <Col md={4}>
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
          <Col md={8}>
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
          <Col md={4}>
            <FuncionDropdown
              id='funcionCode'
              label='Función'
              {...register('funcionCode')}
              error={!!formErrors.funcionCode}
              helperText={formErrors?.funcionCode?.message}
              disabled={isSubmitting}
              value={watch('funcionCode')}
              onChange={event => {
                event.preventDefault();

                setValue('funcionCode', event.target.value);
                if (event.target.value === 'C') {
                  setValue('eventoCode', '');
                  setValue('eventoCampoCode', '');
                }
              }}
            />
          </Col>
          <Col md={4}>
            <EventoDropdown
              id='evento'
              label='Evento'
              {...register('eventoCode')}
              error={!!formErrors.eventoCode}
              helperText={formErrors?.eventoCode?.message}
              disabled={isSubmitting || watch('funcionCode') === 'C'}
              value={watch('eventoCode')}
            />
          </Col>
          <Col md={4}>
            <EventoCampoDropdown
              id='eventoCampo'
              label='Campo'
              {...register('eventoCampoCode')}
              error={!!formErrors.eventoCampoCode}
              helperText={formErrors?.eventoCampoCode?.message}
              disabled={isSubmitting || watch('funcionCode') === 'C'}
              value={watch('eventoCampoCode') || ''}
            />
          </Col>
        </Row>
        <Box
          sx={{
            border: '1px solid lightgray',
            borderRadius: '0.25rem',
            padding: '1.5rem 1rem 0rem',
            marginBottom: '1rem',
            position: 'relative',
          }}
        >
          <Box
            component='p'
            sx={{
              position: 'absolute',
              top: '-0.5rem',
              backgroundColor: 'white',
              padding: '0 0.25rem',
              marginLeft: '-0.5rem',
              color: 'gray',
              fontSize: '0.85rem',
              lineHeight: '1rem',
              textTransform: 'capitalize',
            }}
          >
            {watch('accionCode')
              ? `${state.acciones.find(({ code }) => watch('accionCode') === code)?.label.toLowerCase()}:`
              : 'Filtro vacio'}
          </Box>
          <Row>
            <Col md={4}>
              <AccionDropdown
                id='accion'
                label='Acción'
                {...register('accionCode')}
                error={!!formErrors.accionCode}
                helperText={formErrors?.accionCode?.message}
                disabled={isSubmitting}
                value={watch('accionCode') || ''}
                onChange={event => {
                  event.preventDefault();

                  setValue('accionCode', event.target.value);
                  setValue('filtroValue', '');
                  if (event.target.value === '') {
                    setValue('filtroCampoCode', '');
                  }
                }}
              />
            </Col>
            <Col md={4}>
              <EventoCampoDropdown
                id='filtroCampo'
                label='Campo'
                {...register('filtroCampoCode')}
                error={!!formErrors.filtroCampoCode}
                helperText={formErrors?.filtroCampoCode?.message}
                disabled={isSubmitting || !watch('accionCode')}
                value={watch('filtroCampoCode') || ''}
              />
            </Col>
            <Col md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box sx={{ paddingTop: 'calc(1rem - 0.2rem)', fontSize: '1.2rem', marginRight: '0.5rem' }}>=</Box>
              <TextField
                id='filtroValue'
                label='Valor'
                {...register('filtroValue')}
                error={!!formErrors.filtroValue}
                helperText={formErrors?.filtroValue?.message}
                disabled={isSubmitting || watch('accionCode') !== 'FIL'}
              />
            </Col>
          </Row>
        </Box>
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
