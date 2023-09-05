import { useCallback, useContext, useState, useEffect } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProcedimientoCustomRepository } from '@domains/procedimiento-custom/repository';
import { ProcedimientoCustomEditSchema } from '@domains/procedimiento-custom/container/procedimiento-custom-edit/schemas';
import { ProcedimientoCustomContext } from '@domains/procedimiento-custom/contexts';
import type { ProcedimientoCustomEditSchemaType } from '@domains/procedimiento-custom/container/procedimiento-custom-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { Box, InputAdornment } from '@mui/material';

import { label } from '@domains/procedimiento-custom/constants';

import { ACTION_TYPES } from '@domains/procedimiento-custom/contexts/procedimiento-custom.state';
import Form from '@app/components/Form/Form';
import FormSelect from '@app/components/Form/FormInputs/FormSelect';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import { DropdownSchemaType } from '@app/utils/zod.util';

const ProcedimientoCustomEdit = () => {
  const { id } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid, state, dispatch } = useContext(ProcedimientoCustomContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors: formErrors, isSubmitting },
    trigger,
    setValue,
  } = useForm<ProcedimientoCustomEditSchemaType>({
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
    resolver: zodResolver(ProcedimientoCustomEditSchema),
  });

  useEffect(() => {
    if (state.funciones.length > 0) {
      fetchProcedimientoCustom();
    }
  }, [id, reset, state]);

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

  const fetchProcedimientoCustom = () => {
    ProcedimientoCustomRepository.getProcedimientoCustomById(id || '').then(({ data }) => {
      const { funciones, eventos, eventosCampo, acciones } = state;

      const accionCode = acciones.find(({ value }) => value === data.accionId)?.code || '';
      const values = {
        ...data,
        funcionCode: funciones.find(({ value }) => value === data.funcionId)?.code || '',
        eventoCode: eventos.find(({ value }) => value === data.eventoId)?.code || '',
        eventoCampoCode: eventosCampo.find(({ value }) => value === data.eventoCampoId)?.code || '',
        accionCode,
      };

      if (accionCode === 'FIL') {
        values.filtroValue = data.expresionFiltro;
        values.filtroCampoCode = eventosCampo.find(({ value }) => value === data?.eventoCampoFiltroId)?.code || '';
      } else if (accionCode === 'AGR') {
        values.filtroCampoCode = eventosCampo.find(({ value }) => value === data?.eventoCampoAgrupacionId)?.code || '';
      }

      reset(values);
      trigger(['funcionCode', 'eventoCode']);
      setIsDataFetched(true);
    });
  };

  const onSubmit = useCallback(
    async (data: ProcedimientoCustomEditSchemaType) => {
      const { funciones, eventos, eventosCampo, acciones } = state;
      const parseToNull = ({
        funcionCode,
        accionCode,
        eventoCode,
        eventoCampoCode,
        filtroCampoCode,
        filtroValue,
        ...restProps
      }: ProcedimientoCustomEditSchemaType) => ({
        ...restProps,
        funcionId: funciones.find(({ code }) => code === funcionCode)?.value || null,
        eventoId: eventos.find(({ code }) => code === eventoCode)?.value || null,
        eventoCampoId: eventosCampo.find(({ code }) => code === eventoCampoCode)?.value || null,
        accionId: acciones.find(({ code }) => code === accionCode)?.value || null,
        ...(accionCode === 'FIL'
          ? {
              eventoCampoAgrupacionId: null,
              eventoCampoFiltroId: eventosCampo.find(({ code }) => code === filtroCampoCode)?.value,
              expresionFiltro: `${filtroValue}`,
            }
          : {
              eventoCampoAgrupacionId: eventosCampo.find(({ code }) => code === filtroCampoCode)?.value || null,
              eventoCampoFiltroId: null,
              expresionFiltro: null,
            }),
      });

      const apiPayload = parseToNull(data);

      ProcedimientoCustomRepository.updateProcedimientoCustom(apiPayload)
        .then(() => {
          mainDataGrid.reload();
          _navigate('/procedimiento-custom');
        })
        .catch(error => {
          dispatch({ type: ACTION_TYPES.SET_ERROR, payload: { error: error } });
        });
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-custom');
  }, [_navigate]);

  if (!isDataFetched) {
    return null;
  }

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
    <Modal isOpen onClose={handleClose} title={`Editar ${label.procedimientoCustom}`}>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={4}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='codigo' fullWidth />
          </Col>
          <Col md={8}>
            <FormTextField
              control={control}
              disabled={isSubmitting}
              name='denominacion'
              label='Denominación'
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
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
          <Col md={6}>
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
        </Row>
        <Row>
          <Col md={6}>
            <FormSelect
              label='Campo'
              name='eventoCampoCode'
              control={control}
              error={!!formErrors.eventoCampoCode}
              helperText={formErrors?.eventoCampoCode?.message}
              // disabled={isSubmitting || watch('funcionCode') === 'C'}
              disabled={isSubmitting}
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
            padding: '2rem 1rem 0rem',
            marginBottom: '2rem',
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
              marginLeft: '-0.2rem',
              color: 'gray',
              fontSize: '0.85rem',
              lineHeight: '1rem',
              textTransform: 'capitalize',
              my: 2,
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
            <Col md={4}>
              <FormTextField
                control={control}
                disabled={isSubmitting || watch('accionCode') !== 'FIL'}
                label='Valor'
                name='filtroValue'
                InputProps={{
                  startAdornment: <InputAdornment position='start'>=</InputAdornment>,
                }}
                fullWidth
              />
            </Col>
          </Row>
        </Box>
      </Form>

      {state.error && <Box>Error: {...state.error}</Box>}
    </Modal>
  );
};

export default ProcedimientoCustomEdit;
