import { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';

import { TextField } from '@mui/material';

import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, Row, Col } from '@app/components';
import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoftlandCreateSchema } from '@domains/producto-softland/container/producto-softland-create/schemas';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';
import type { ProductoSoftlandCreateSchemaType } from '@domains/producto-softland/container/producto-softland-create/schemas';

import { DateLib } from '@libs';

const ProductoSoftlandCreate = () => {
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProductoSoftlandContext);

  const {
    register,
    handleSubmit,
    control,
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

  const onSubmit: SubmitHandler<ProductoSoftlandCreateSchemaType> = useCallback(
    async data => {
      const submitData = {
        ...data,
        fechaCambioEstado: DateLib.parseToDBString(data.fechaCambioEstado),
      };

      await ProductoSoftlandRepository.createProductoSoftland(submitData);

      mainDataGrid.reload();
      _navigate('/producto-softland');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/producto-softland');
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <TextField
              id='agrupacion'
              label='Agrupación'
              {...register('agrupacion')}
              error={!!formErrors.agrupacion}
              helperText={formErrors?.agrupacion?.message}
              disabled={isSubmitting}
              fullWidth
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
              fullWidth
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
              fullWidth
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormDesktopDatePicker
              control={control}
              disabled={isSubmitting}
              label='Fecha Estado'
              name='fechaCambioEstado'
            />
          </Col>
          <Col md={6}>
            <FormCheckbox control={control} name='activo' label='Activo' labelPlacement='end' disabled={isSubmitting} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ProductoSoftlandCreate;
