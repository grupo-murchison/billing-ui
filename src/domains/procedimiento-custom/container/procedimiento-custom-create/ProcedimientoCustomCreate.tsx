import { useEffect, useCallback, useContext, forwardRef } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomCreateSchema } from '@domains/procedimiento-custom/container/procedimiento-custom-create/schemas';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import type { ProcedimientoCustomCreateSchemaType } from '@domains/procedimiento-custom/container/procedimiento-custom-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Box, TextField } from '@mui/material';

import { label } from '@domains/procedimiento-custom/constants';
import Form from '@app/components/Form/Form';
import FormSelect from '@app/components/Form/FormInputs/FormSelect';
import { DropdownSchemaType } from '@app/utils/zod.util';

const ProcedimientoCustomCreate = forwardRef((_, ref) => {
  const _navigate = useNavigate();

  const { mainDataGrid, state } = useContext(ProcedimientoCustomContext);

  const {
    register,
    control,
    handleSubmit,
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

  const onSubmit = useCallback(
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
              expresionFiltro: `${filtroValue}`,
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

  const mapearParametros = (estados: DropdownSchemaType) => {
    return estados.map(data => {
      return {
        code: data.value,
        label: data.label,
        value: data.code,
      };
    });
  };

  return (
    <Modal isOpen onClose={handleClose} title={`Nuevo ${label.procedimientoCustom}`}>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
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
              fullWidth
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
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <FormSelect
              label='Función'
              name='funcionCode'
              control={control}
              error={!!formErrors.funcionCode}
              helperText={formErrors?.funcionCode?.message}
              disabled={isSubmitting}
              options={mapearParametros(state.funciones)}
            />
          </Col>
          <Col md={4}>
            <FormSelect
              label='Evento'
              name='eventoCode'
              control={control}
              error={!!formErrors.eventoCode}
              helperText={formErrors?.eventoCode?.message}
              disabled={isSubmitting}
              options={mapearParametros(state.eventos)}
              emptyOption={true}
            />
          </Col>
          <Col md={4}>
            <FormSelect
              label='Campo'
              name='eventoCampoCode'
              control={control}
              error={!!formErrors.eventoCampoCode}
              helperText={formErrors?.eventoCampoCode?.message}
              disabled={isSubmitting || watch('funcionCode') === 'C'}
              options={mapearParametros(
                state.eventosCampo.filter(({ parentCode }) => parentCode === watch('eventoCode')),
              )}
              emptyOption={true}
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
              <FormSelect
                label='Acción'
                name='accionCode'
                control={control}
                error={!!formErrors.accionCode}
                helperText={formErrors?.accionCode?.message}
                disabled={isSubmitting}
                options={mapearParametros(state.acciones)}
                emptyOption={true}
              />
            </Col>
            <Col md={4}>
              <FormSelect
                label='Campo'
                name='filtroCampoCode'
                control={control}
                error={!!formErrors.filtroCampoCode}
                helperText={formErrors?.filtroCampoCode?.message}
                disabled={isSubmitting || !watch('accionCode')}
                options={mapearParametros(
                  state.eventosCampo.filter(({ parentCode }) => parentCode === watch('eventoCode')),
                )}
                emptyOption={true}
              />
            </Col>
            <Col md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box
                sx={{
                  paddingTop: 'calc(1rem - 0.2rem)',
                  fontSize: '1.2rem',
                  marginLeft: '-0.8rem',
                  marginRight: '0.75rem',
                }}
              >
                =
              </Box>
              <TextField
                id='filtroValue'
                label='Valor'
                {...register('filtroValue')}
                error={!!formErrors.filtroValue}
                helperText={formErrors?.filtroValue?.message}
                disabled={isSubmitting || watch('accionCode') !== 'FIL'}
                fullWidth
              />
            </Col>
          </Row>
        </Box>
      </Form>
    </Modal>
  );
});

export default ProcedimientoCustomCreate;
