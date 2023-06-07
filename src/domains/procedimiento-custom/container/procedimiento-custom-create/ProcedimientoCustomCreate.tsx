import { useEffect, useCallback, useContext, forwardRef } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomCreateSchema } from '@domains/procedimiento-custom/container/procedimiento-custom-create/schemas';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import type { ProcedimientoCustomCreateSchemaType } from '@domains/procedimiento-custom/container/procedimiento-custom-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Box, TextField } from '@mui/material';

import { label } from '@domains/procedimiento-custom/constants';
import { Dropdown } from '@app/components/FormInputs/Dropdown';

const ProcedimientoCustomCreate = forwardRef((_, ref) => {
  const _navigate = useNavigate();

  const { mainDataGrid, state } = useContext(ProcedimientoCustomContext);

  const {
    register,
    control,
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

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'funcionCode' && value['funcionCode'] === 'C') {
        // Funcion Change
        setValue('eventoCampoCode', '');
      } else if (name === 'accionCode') {
        // Accion Change
        if (value['accionCode'] === '') {
          setValue('filtroCampoCode', '');
          setValue('filtroValue', '');
        } else if (value['accionCode'] !== 'FIL') {
          setValue('filtroValue', '');
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

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
            <Dropdown
              labelDisplay='Función'
              name='funcionCode'
              control={control}
              error={!!formErrors.funcionCode}
              helperText={formErrors?.funcionCode?.message}
              disabled={isSubmitting}
              options={state.funciones}
            />
          </Col>
          <Col md={4}>
            <Dropdown
              labelDisplay='Evento'
              name='eventoCode'
              control={control}
              error={!!formErrors.eventoCode}
              helperText={formErrors?.eventoCode?.message}
              disabled={isSubmitting}
              options={state.eventos}
              emptyOption={{ value: '', label: 'Ninguno', code: '', disabled: true }}
            />
          </Col>
          <Col md={4}>
            <Dropdown
              labelDisplay='Campo'
              name='eventoCampoCode'
              control={control}
              error={!!formErrors.eventoCampoCode}
              helperText={formErrors?.eventoCampoCode?.message}
              disabled={isSubmitting || watch('funcionCode') === 'C'}
              options={state.eventosCampo.filter(({ parentCode }) => parentCode === watch('eventoCode'))}
              emptyOption={{ value: '', label: 'Ninguno', code: '', disabled: true }}
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
              <Dropdown
                labelDisplay='Acción'
                name='accionCode'
                control={control}
                error={!!formErrors.accionCode}
                helperText={formErrors?.accionCode?.message}
                disabled={isSubmitting}
                options={state.acciones}
                emptyOption={{ value: '', label: 'Ninguno', code: '' }}
              />
            </Col>
            <Col md={4}>
              <Dropdown
                labelDisplay='Campo'
                name='filtroCampoCode'
                control={control}
                error={!!formErrors.filtroCampoCode}
                helperText={formErrors?.filtroCampoCode?.message}
                disabled={isSubmitting || !watch('accionCode')}
                options={state.eventosCampo.filter(({ parentCode }) => parentCode === watch('eventoCode'))}
                emptyOption={{ value: '', label: 'Ninguno', code: '' }}
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
            <Button color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
              Cancelar
            </Button>
            <Button  color='primary' variant='contained'  type='submit' disabled={isSubmitting}>
              Crear
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
});

export default ProcedimientoCustomCreate;
