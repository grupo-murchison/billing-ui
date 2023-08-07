import { useCallback, useContext, useEffect, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoftlandEditSchema } from '@domains/producto-softland/container/producto-softland-edit/schemas';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';
import type { ProductoSoftlandEditSchemaType } from '@domains/producto-softland/container/producto-softland-edit/schemas';

import { zodResolver } from '@hookform/resolvers/zod';

import { DateLib } from '@libs';

import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers';
import Form from '@app/components/Form/Form';

const ProductoSoftlandEdit = () => {
  const { id } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProductoSoftlandContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<ProductoSoftlandEditSchemaType>({
    defaultValues: {
      activo: false,
      agrupacion: '',
      codigo: '',
      descripcion: '',
      fechaCambioEstado: null,
    },
    resolver: zodResolver(ProductoSoftlandEditSchema),
  });

  const onSubmit: SubmitHandler<ProductoSoftlandEditSchemaType> = useCallback(
    async data => {
      const submitData = {
        ...data,
        fechaCambioEstado: DateLib.parseToDBString(data.fechaCambioEstado),
      };

      await ProductoSoftlandRepository.updateProductoSoftland(submitData);

      mainDataGrid.reload();
      _navigate('/producto-softland');
    },
    [_navigate, mainDataGrid],
  );

  const handleClose = useCallback(() => {
    _navigate('/producto-softland');
  }, [_navigate]);

  useEffect(() => {
    ProductoSoftlandRepository.getProductoSoftlandById(id || '').then(({ data }) => {
      reset({
        ...data,
        fechaCambioEstado: DateLib.parseFromDBString(data.fechaCambioEstado),
      });
      setIsDataFetched(true);
    });
  }, [id, reset]);

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Producto Softland'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} isUpdate>
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
            <DesktopDatePicker
              label='Fecha Estado'
              inputFormat='dd-MM-yyyy'
              value={watch('fechaCambioEstado')}
              onChange={newValue => setValue('fechaCambioEstado', newValue)}
              renderInput={params => <TextField {...params} fullWidth />}
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
      </Form>
    </Modal>
  );
};

export default ProductoSoftlandEdit;
