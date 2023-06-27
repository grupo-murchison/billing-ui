import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { MonedaDropdown } from '@domains/moneda/container/moneda-dropdown';

import { ProcedimientoPRepository } from '@domains/procedimiento-p/repository';
import { ProcedimientoPEditSchema } from '@domains/procedimiento-p/container/procedimiento-p-edit/schemas';
import type { ProcedimientoPEditSchemaType } from '@domains/procedimiento-p/container/procedimiento-p-edit/schemas';

import { ProcedimientoPContext } from '@domains/procedimiento-p/contexts';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button, TextField } from '@mui/material';

const ProcedimientoPEdit = () => {
  const { procedimientoPId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProcedimientoPContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    reset,
    watch,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProcedimientoPEditSchemaType>({
    defaultValues: {
      codigo: '',
      denominacion: '',
    },
    resolver: zodResolver(ProcedimientoPEditSchema),
  });

  const handleClose = useCallback(() => {
    _navigate('/procedimiento-p');
  }, [_navigate]);

  const handleSubmit = useCallback(
    async (data: ProcedimientoPEditSchemaType) => {
      await ProcedimientoPRepository.updateProcedimientoP(data);

      mainDataGrid.reload();

      _navigate('/procedimiento-p');
    },
    [_navigate, mainDataGrid],
  );

  useEffect(() => {
    ProcedimientoPRepository.getProcedimientoPById(procedimientoPId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [procedimientoPId, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Procedimiento Precio'>
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
            <MonedaDropdown
              id='monedaId'
              label='Moneda'
              {...register('monedaId', {
                valueAsNumber: true,
              })}
              value={watch('monedaId')}
              error={!!formErrors.monedaId}
              helperText={formErrors?.monedaId?.message}
              disabled={isSubmitting}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} textAlign='right'>
            <Button  color='secondary' variant='outlined' disabled={isSubmitting} onClick={handleClose}>
              Cancelar
            </Button>
            <Button variant='contained' type='submit' disabled={isSubmitting}>
              Actualizar
            </Button>
          </Col>
        </Row>
      </form>
    </Modal>
  );
};

export default ProcedimientoPEdit;
