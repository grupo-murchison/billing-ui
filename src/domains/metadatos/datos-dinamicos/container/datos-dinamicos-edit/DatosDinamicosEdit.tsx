import { useCallback, useEffect, useState, useContext } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';

import { useNavigate, useParams } from 'react-router-dom';

import { Modal, Row, Col } from '@app/components';

import { zodResolver } from '@hookform/resolvers/zod';

import Form from '@app/components/Form/Form';
import FormTextField from '@app/components/Form/FormInputs/FormTextField';
import { DatosDinamicosContext } from '../../contexts';
import { DatosDinamicosEditSchema, DatosDinamicosEditSchemaType } from './schemas';
import DatosDinamicosRepository from '../../repository/datos-dinamicos.repository';
import { useConfirmDialog } from '@app/hooks';
import FormCheckbox from '@app/components/Form/FormInputs/FormCheckbox';
import { TablasDinamicasDropdown } from '@domains/metadatos/tablas-dinamicas/container/tablas-dinamicas-dropdown';

const DatosDinamicosEdit = () => {
  const { tablaId, datoId } = useParams();
  const _navigate = useNavigate();

  const { mainDataGrid } = useContext(DatosDinamicosContext);

  const [isDataFetched, setIsDataFetched] = useState<boolean>(false);
  const confirmDialog = useConfirmDialog();

  const {
    reset,
    formState: { isSubmitting },
    handleSubmit,
    control,
    getValues,
    setError,
  } = useForm<DatosDinamicosEditSchemaType>({
    defaultValues: {
      tablaId: tablaId ? +tablaId : '',
      campoCodigo: '',
      campoValor: '',
      activo: false,
    },
    resolver: zodResolver(DatosDinamicosEditSchema),
  });

  useEffect(() => {
    DatosDinamicosRepository.getDatosDinamicosById(datoId || '').then(({ data }) => {
      reset(data);
      setIsDataFetched(true);
    });
  }, [tablaId, datoId, reset]);

  const handleClose = useCallback(() => {
    _navigate(`/tablas-dinamicas/${tablaId}/edit`);
  }, [_navigate]);

  const onSubmit: SubmitHandler<DatosDinamicosEditSchemaType> = useCallback(
    async data => {
      await DatosDinamicosRepository.updateDatosDinamicos({ ...data, id: Number(datoId) })
        .then(() => {
          mainDataGrid.reload();
          _navigate(`/tablas-dinamicas/${tablaId}`);
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
    [_navigate, mainDataGrid, datoId],
  );

  if (!isDataFetched) {
    return <></>;
  }

  return (
    <Modal isOpen onClose={handleClose} title='Editar Dato Dinámico'>
      <Form onSubmit={handleSubmit(onSubmit)} handleClose={handleClose} isSubmitting={isSubmitting} label='update'>
        <Row>
          <Col md={6}>
            <TablasDinamicasDropdown control={control} disabled label='Tabla' name='tablaId' />
          </Col>
          <Col md={6}>
            <FormTextField control={control} disabled label='Código' name='campoCodigo' />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <FormTextField control={control} disabled={isSubmitting} label='Valor' name='campoValor' />
          </Col>
          <Col md={6}>
            <FormCheckbox
              control={control}
              name='activo'
              label='Activo'
              labelPlacement='end'
              disabled={isSubmitting}
              checked={getValues('activo')}
            />
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default DatosDinamicosEdit;
