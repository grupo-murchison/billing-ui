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

import Form from '@app/components/Form/Form';
import FormSelect from '@app/components/Form/FormInputs/FormSelect';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import {
  findEventoCampoByCode,
  findPropertyByCode,
  findPropertyById,
  findPropertyByLabel,
  mapearParametros,
} from '@app/utils/formHelpers.util';
import { useConfirmDialog } from '@app/hooks';

const ProcedimientoCustomEdit = () => {
  const { id } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid, state } = useContext(ProcedimientoCustomContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { isSubmitting },
    trigger,
    setValue,
    setError,
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
      const { funciones, eventos, eventosCampo, acciones, datoDinamico } = state;
      const eventoCampoCode = findPropertyById(eventosCampo, data.eventoCampoFiltroId)?.code;
      const isDatoDinamico = findEventoCampoByCode(eventosCampo, eventoCampoCode)?.tipoDato === 4 ? true : false;
      const accionCode = findPropertyById(acciones, data.accionId)?.code || '';

      const values = {
        ...data,
        funcionCode: findPropertyById(funciones, data.funcionId)?.code || '',
        eventoCode: findPropertyById(eventos, data.eventoId)?.code || '',
        eventoCampoCode: findPropertyById(eventosCampo, data.eventoCampoId)?.code || '',
        accionCode,
      };

      if (accionCode === 'FIL') {
        values.filtroValue = isDatoDinamico
          ? findPropertyByLabel(datoDinamico, data.expresionFiltro)?.code
          : data?.expresionFiltro;
        values.filtroCampoCode = findPropertyById(eventosCampo, data?.eventoCampoFiltroId)?.code || '';
      } else if (accionCode === 'AGR') {
        values.filtroCampoCode = findPropertyById(eventosCampo, data?.eventoCampoAgrupacionId)?.code || '';
      }

      reset(values);
      trigger(['funcionCode', 'eventoCode']);
      setIsDataFetched(true);
    });
  };

  const onSubmit = useCallback(
    async (data: ProcedimientoCustomEditSchemaType) => {
      const { funciones, eventos, eventosCampo, acciones, datoDinamico } = state;
      const isDatoDinamico =
        findEventoCampoByCode(eventosCampo, watch('filtroCampoCode'))?.tipoDato === 4 ? true : false;

      let datoDinamicoValue = '';
      if (isDatoDinamico) {
        const objeto = findPropertyByCode(datoDinamico, watch('filtroValue'));
        if (objeto) {
          const [, valor] = objeto.label.split(' - ');
          datoDinamicoValue = valor;
        }
      }

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
        funcionId: findPropertyByCode(funciones, funcionCode)?.value || null,
        eventoId: findPropertyByCode(eventos, eventoCode)?.value || null,
        eventoCampoId: findPropertyByCode(eventosCampo, eventoCampoCode)?.value || null,
        accionId: findPropertyByCode(acciones, accionCode)?.value || null,
        ...(accionCode === 'FIL'
          ? {
              eventoCampoAgrupacionId: null,
              eventoCampoFiltroId: findPropertyByCode(eventosCampo, filtroCampoCode)?.value || null,
              expresionFiltro: isDatoDinamico ? `${datoDinamicoValue}` : `${filtroValue}`,
            }
          : {
              eventoCampoAgrupacionId: findPropertyByCode(eventosCampo, filtroCampoCode)?.value || null,
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
        .catch(err => {
          const error = JSON.parse(err.message);
          if (error?.statusCode === 400) {
            setError('codigo', { type: 'custom', message: error.message });
            confirmDialog.open({
              type: 'reject',
              title: 'No es posible realizar esta acción',
              message: `${error.message}`,
              onClickYes() {
                confirmDialog.close();
              },
            });
          }
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
              disabled={isSubmitting}
              options={mapearParametros(state.funciones)}
            />
          </Col>
          <Col md={6}>
            <FormSelect
              label='Evento'
              name='eventoCode'
              control={control}
              disabled={isSubmitting}
              options={mapearParametros(state.eventos)}
              emptyOption
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormSelect
              label='Campo'
              name='eventoCampoCode'
              control={control}
              // disabled={isSubmitting || watch('funcionCode') === 'C'}
              disabled={isSubmitting}
              options={mapearParametros(
                state.eventosCampo.filter(({ parentCode }) => parentCode === watch('eventoCode')),
              )}
              emptyOption
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
                disabled={isSubmitting}
                options={mapearParametros(state.acciones)}
                emptyOption
              />
            </Col>
            <Col md={4}>
              <FormSelect
                label='Campo'
                name='filtroCampoCode'
                control={control}
                disabled={isSubmitting || !watch('accionCode')}
                options={mapearParametros(
                  state.eventosCampo.filter(({ parentCode }) => parentCode === watch('eventoCode')),
                )}
                emptyOption
              />
            </Col>
            <Col md={4}>
              {findEventoCampoByCode(state.eventosCampo, watch('filtroCampoCode'))?.tipoDato === 4 ? (
                <FormSelect
                  label='Valor'
                  name='filtroValue'
                  control={control}
                  disabled={isSubmitting || watch('accionCode') !== 'FIL'}
                  options={mapearParametros(
                    state.datoDinamico.filter(({ parentCode }) => parentCode === watch('filtroCampoCode')),
                  )}
                />
              ) : (
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
              )}
            </Col>
          </Row>
        </Box>
      </Form>

      {state.error && <Box>Error: {...state.error}</Box>}
    </Modal>
  );
};

export default ProcedimientoCustomEdit;
