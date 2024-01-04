import { useCallback, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DatosDinamicosCreateSchema, DatosDinamicosCreateSchemaType } from './schemas';
import { useConfirmDialog } from '@app/hooks';
import { DatosDinamicosContext } from '../../contexts';
import DatosDinamicosRepository from '../../repository/datos-dinamicos.repository';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import { TablasDinamicasDropdown } from '@domains/metadatos/tablas-dinamicas/container/tablas-dinamicas-dropdown';

const DatosDinamicosCreate = () => {
  const _navigate = useNavigate();
  const { tablaId } = useParams();

  const { mainDataGrid } = useContext(DatosDinamicosContext);
  const confirmDialog = useConfirmDialog();

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setError,
  } = useForm<DatosDinamicosCreateSchemaType>({
    defaultValues: {
      tablaId: tablaId ? +tablaId : '',
      campoCodigo: '',
      campoValor: '',
      activo: false,
    },
    resolver: zodResolver(DatosDinamicosCreateSchema),
  });

  const onSubmit: SubmitHandler<DatosDinamicosCreateSchemaType> = useCallback(
    async data => {
      await DatosDinamicosRepository.createDatosDinamicos(data)
        .then(() => {
          mainDataGrid.reload();
          _navigate(`/tablas-dinamicas/${tablaId}/edit`);
        })
        .catch(err => {
          const error = JSON.parse(err.message);
          if (error?.statusCode === 400) {
            setError('campoCodigo', { type: 'custom', message: error.message });
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
    _navigate(`/tablas-dinamicas/${tablaId}/edit`);
  }, [_navigate]);

  return (
    <Modal isOpen onClose={handleClose} title='Nuevo Dato Dinámico'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='create'>
        <Row>
          <Col md={6}>
            <TablasDinamicasDropdown control={control} disabled label='Tabla' name='tablaId' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Código' name='campoCodigo' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Valor' name='campoValor' />
          </Col>
          <Col md={6}>
            <FormCheckbox control={control} name='activo' label='Activo' labelPlacement='end' disabled={isSubmitting} />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DatosDinamicosCreate;
