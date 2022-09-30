import { useCallback, useContext } from 'react';

import { useForm } from 'react-hook-form';

import { useNavigate } from 'react-router-dom';

import { Portlet, Row, Col } from '@app/components';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoftlandCreateSchema } from '@domains/producto-softland/container/producto-softland-create/schemas';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';
import type { ProductoSoftlandCreateSchemaType } from '@domains/producto-softland/container/producto-softland-create/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { DateLib } from '@libs';

import { Button, Checkbox, Divider, FormControlLabel, FormGroup, TextField, Modal } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const ProductoSoftlandCreate = () => {
  const _navigate = useNavigate();

  const { tempRef } = useContext(ProductoSoftlandContext);

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    watch,
    setValue,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProductoSoftlandCreateSchemaType>({
    defaultValues: {
      activo: false,
      agrupacion: '',
      codigo: '',
      descripcion: '',
      fechaCambioEstado: null,
    },
    resolver: zodResolver(ProductoSoftlandCreateSchema),
  });

  const handleSubmit = useCallback(
    async (data: ProductoSoftlandCreateSchemaType) => {
      const submitData = {
        ...data,
        fechaCambioEstado: DateLib.parseToDBString(data.fechaCambioEstado),
      };

      await ProductoSoftlandRepository.createProductoSoftland(submitData);

      tempRef.current.reloadTable();
      _navigate('/producto-softland');
    },
    [_navigate],
  );

  const handleClose = useCallback(() => {
    _navigate('/producto-softland');
  }, [_navigate]);

  return (
    <Modal open onClose={handleClose}>
      <Portlet>
        <h1>Nuevo Producto Softland</h1>
        <Divider style={{ marginBottom: '1rem' }} />
        <form noValidate onSubmit={rhfHandleSubmit(handleSubmit)} autoComplete='off'>
          <Row>
            <Col md={6}>
              <TextField
                id='agrupacion'
                label='Agrupación'
                {...register('agrupacion')}
                error={!!formErrors.agrupacion}
                helperText={formErrors?.agrupacion?.message}
                disabled={isSubmitting}
              />
            </Col>
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
          </Row>
          <Row>
            <Col md={12}>
              <TextField
                id='descripcion'
                label='Descripción'
                {...register('descripcion')}
                error={!!formErrors.descripcion}
                helperText={formErrors?.descripcion?.message}
                disabled={isSubmitting}
              />
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <DesktopDatePicker
                label='Fecha Estado'
                inputFormat='dd-MM-yyyy'
                value={watch('fechaCambioEstado')}
                onChange={newValue => setValue('fechaCambioEstado', newValue)}
                renderInput={params => <TextField {...params} />}
                disabled={isSubmitting}
              />
            </Col>
            <Col md={6}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox checked={watch('activo')} onChange={() => setValue('activo', !watch('activo'))} />}
                  label='Activo'
                  disabled={isSubmitting}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12} textAlign='right'>
              <Button variant='contained' type='submit' disabled={isSubmitting}>
                Crear Producto
              </Button>
            </Col>
          </Row>
        </form>
      </Portlet>
    </Modal>
  );
};

export default ProductoSoftlandCreate;
