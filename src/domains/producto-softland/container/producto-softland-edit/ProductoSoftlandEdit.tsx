import { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useForm, SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { Modal, Row, Col } from '@app/components';
import Form from '@app/components/Form/Form';
import FormDesktopDatePicker from '@app/components/Form/FormInputs/FormDatePicker/FormDatePicker';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';

import { ProductoSoftlandRepository } from '@domains/producto-softland/repository';
import { ProductoSoftlandEditSchema } from '@domains/producto-softland/container/producto-softland-edit/schemas';
import { ProductoSoftlandContext } from '@domains/producto-softland/contexts';
import type { ProductoSoftlandEditSchemaType } from '@domains/producto-softland/container/producto-softland-edit/schemas';

import { DateLib } from '@libs';
import { useConfirmDialog } from '@app/hooks';

const ProductoSoftlandEdit = () => {
  const { id } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(ProductoSoftlandContext);
  const confirmDialog = useConfirmDialog();

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);

  const {
    handleSubmit,
    reset,
    control,
    formState: { isSubmitting },
    setError,
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

      await ProductoSoftlandRepository.updateProductoSoftland(submitData)
        .then(() => {
          mainDataGrid.reload();
          _navigate('/producto-softland');
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
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} name='agrupacion' label='Agrupación' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} name='codigo' label='Código' disabled={isSubmitting} />
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormTextField control={control} name='descripcion' label='Descripción' disabled={isSubmitting} />
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

export default ProductoSoftlandEdit;
